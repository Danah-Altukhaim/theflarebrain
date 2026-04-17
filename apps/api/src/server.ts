import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import { nanoid } from "nanoid";
import { env } from "./lib/env.js";
import { prisma } from "./lib/prisma.js";
import { redis } from "./lib/redis.js";
import tenantContext from "./plugins/tenant-context.js";
import auth from "./plugins/auth.js";
import apiKey from "./plugins/api-key.js";
import errorHandler from "./plugins/error-handler.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import moduleRoutes from "./routes/modules.js";
import entryRoutes from "./routes/entries.js";
import kbRoutes from "./routes/kb.js";
import chatRoutes from "./routes/chat.js";
import importRoutes from "./routes/import.js";
import activityRoutes from "./routes/activity.js";
import voiceRoutes from "./routes/voice.js";
import mediaRoutes from "./routes/media.js";
import meRoutes from "./routes/me.js";
import translateRoutes from "./routes/translate.js";

export async function buildApp() {
  const app = Fastify({
    logger: { level: env.LOG_LEVEL },
    genReqId: () => nanoid(12),
    disableRequestLogging: false,
    bodyLimit: 1_048_576,
  });

  app.addHook("onRequest", async (req, reply) => {
    reply.header("x-request-id", req.id);
  });

  const allowedOrigins = env.CORS_ORIGIN.split(",").map((o) => o.trim());
  await app.register(cors, { origin: allowedOrigins, credentials: true });
  await app.register(rateLimit, {
    max: 200,
    timeWindow: "1 minute",
    keyGenerator: (req) => (req.tenantId ?? req.ip) + ":" + (req.routeOptions?.url ?? ""),
  });
  await app.register(errorHandler);
  await app.register(tenantContext);
  await app.register(auth);
  await app.register(apiKey);

  app.get("/health", async () => {
    let db = false;
    let redisOk = false;
    try {
      await prisma.$queryRaw`SELECT 1`;
      db = true;
    } catch { /* db unreachable */ }
    try {
      redisOk = (await redis.ping()) === "PONG";
    } catch { /* redis unreachable */ }
    return {
      success: true,
      data: { status: db && redisOk ? "ok" : "degraded", db, redis: redisOk, timestamp: new Date().toISOString() },
    };
  });

  app.get("/", async () => ({
    success: true,
    data: { message: "The Brain API. See /health for status." },
  }));

  await app.register(authRoutes, { prefix: "/api/v1/auth" });
  await app.register(adminRoutes, { prefix: "/api/v1/admin" });
  await app.register(moduleRoutes, { prefix: "/api/v1/modules" });
  await app.register(entryRoutes, { prefix: "/api/v1/entries" });
  await app.register(kbRoutes, { prefix: "/api/v1" });
  await app.register(chatRoutes, { prefix: "/api/v1/chat" });
  await app.register(importRoutes, { prefix: "/api/v1/import" });
  await app.register(activityRoutes, { prefix: "/api/v1/activity" });
  await app.register(voiceRoutes, { prefix: "/api/v1/voice" });
  await app.register(mediaRoutes, { prefix: "/api/v1/media" });
  await app.register(meRoutes, { prefix: "/api/v1/me" });
  await app.register(translateRoutes, { prefix: "/api/v1/translate" });

  return app;
}

async function main() {
  const app = await buildApp();
  await app.listen({ host: "0.0.0.0", port: env.PORT });

  async function shutdown(signal: string) {
    app.log.info(`${signal} received, shutting down`);
    await app.close();
    await prisma.$disconnect();
    await redis.quit();
    process.exit(0);
  }

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
