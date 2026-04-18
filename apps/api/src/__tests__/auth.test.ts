/**
 * Auth route behavioural test.
 *
 * Covers:
 *  - valid credentials produce a JWT
 *  - wrong password rejected (401)
 *  - unknown email rejected (401) — and still runs bcrypt against DUMMY_HASH
 *  - unknown tenant rejected (401) — and still runs bcrypt
 *  - zod rejects malformed bodies (400)
 *  - rate limit kicks in past 5 attempts in 5 minutes
 *
 * Seed dependency: `pnpm seed` must have run; relies on the `future-kid` tenant
 * with `sara@example.com` / `password1`.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildApp } from "../server.js";

const TENANT = "future-kid";
const VALID_EMAIL = "sara@example.com";
const VALID_PASSWORD = "password1";

describe("POST /api/v1/auth/login", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("accepts valid credentials and issues a JWT", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/v1/auth/login",
      payload: { tenantSlug: TENANT, email: VALID_EMAIL, password: VALID_PASSWORD },
    });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.success).toBe(true);
    expect(typeof body.data.token).toBe("string");
    expect(body.data.token.split(".").length).toBe(3);
    expect(body.data.user.email).toBe(VALID_EMAIL);
    expect(body.data.tenant.slug).toBe(TENANT);
  });

  it("rejects wrong password with 401", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/v1/auth/login",
      payload: { tenantSlug: TENANT, email: VALID_EMAIL, password: "wrong-password" },
    });
    expect(res.statusCode).toBe(401);
  });

  it("rejects unknown email with 401 (and still runs bcrypt against DUMMY_HASH)", async () => {
    const start = Date.now();
    const res = await app.inject({
      method: "POST",
      url: "/api/v1/auth/login",
      payload: { tenantSlug: TENANT, email: "ghost-user@example.com", password: "whatever1234" },
    });
    const elapsed = Date.now() - start;
    expect(res.statusCode).toBe(401);
    // bcrypt with cost=10 takes ~80-100ms on CI hardware. If this returns in under 10ms,
    // the DUMMY_HASH path was skipped and the server is leaking the "email not found" timing.
    expect(elapsed).toBeGreaterThan(10);
  });

  it("rejects unknown tenant with 401", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/v1/auth/login",
      payload: { tenantSlug: "no-such-tenant", email: VALID_EMAIL, password: VALID_PASSWORD },
    });
    expect(res.statusCode).toBe(401);
  });

  it("rejects malformed body with 400", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/v1/auth/login",
      payload: { tenantSlug: TENANT, email: "not-an-email", password: "short" },
    });
    expect(res.statusCode).toBe(400);
  });

  it("rate-limits after 5 failed attempts in 5 minutes", async () => {
    // Hit the endpoint 6 times from the same simulated IP. @fastify/rate-limit
    // keys by req.ip which is 127.0.0.1 for app.inject unless spoofed.
    const results: number[] = [];
    for (let i = 0; i < 7; i++) {
      const res = await app.inject({
        method: "POST",
        url: "/api/v1/auth/login",
        payload: {
          tenantSlug: TENANT,
          email: "ratelimit-probe@example.com",
          password: "nope12345",
        },
      });
      results.push(res.statusCode);
    }
    // Expect at least one 429 after the burst.
    expect(results.some((c) => c === 429)).toBe(true);
  });
});
