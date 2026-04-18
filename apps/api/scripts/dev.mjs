// Boots an embedded Postgres, applies migrations, seeds the demo tenant,
// then runs `tsx watch` so the API restarts on source changes. Single command,
// no Docker/Homebrew/sudo required.

import EmbeddedPostgres from "embedded-postgres";
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const apiDir = join(here, "..");

// Load apps/api/.env into process.env so child processes inherit it.
const envFile = join(apiDir, ".env");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const PORT = 55433;
const PG_USER = "postgres";
const PG_PASS = "password";
const DB_NAME = "brain";
const dataDir = join(apiDir, ".embedded-pg");

const pg = new EmbeddedPostgres({
  databaseDir: dataDir,
  user: PG_USER,
  password: PG_PASS,
  port: PORT,
  persistent: true,
});

let serverProc = null;
let stopping = false;

async function shutdown(code = 0) {
  if (stopping) return;
  stopping = true;
  if (serverProc && !serverProc.killed) {
    serverProc.kill("SIGTERM");
    await new Promise((r) => serverProc.once("exit", r));
  }
  try {
    await pg.stop();
  } catch {}
  process.exit(code);
}
process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

async function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: "inherit", cwd: apiDir, ...opts });
    p.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`))));
    p.on("error", reject);
  });
}

const firstBoot = !existsSync(dataDir);

console.log(`[dev-db] ${firstBoot ? "initialising" : "starting"} Postgres at :${PORT}`);
if (firstBoot) await pg.initialise();
await pg.start();

try {
  await pg.createDatabase(DB_NAME);
} catch (e) {
  if (!String(e?.message ?? "").includes("already exists")) throw e;
}

console.log("[dev-db] applying Prisma migrations");
await run("npx", ["prisma", "migrate", "deploy"]);

console.log("[dev-db] seeding demo tenant");
await run("npx", ["tsx", "../../infra/seed/index.ts"]);

console.log("[dev-db] starting API (tsx watch)");
serverProc = spawn("npx", ["tsx", "watch", "src/server.ts"], {
  stdio: "inherit",
  cwd: apiDir,
  env: process.env,
});
serverProc.on("exit", (code) => shutdown(code ?? 0));
