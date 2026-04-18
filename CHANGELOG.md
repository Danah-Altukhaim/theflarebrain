# Changelog

All notable changes to The Brain are recorded here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow [SemVer](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Secret rotation schedule in `SECURITY.md`, covering JWT, API keys, LLM keys, R2, WhatsApp, SMTP, and DB credentials.
- Production-only env validation in `apps/api/src/lib/env.ts` that fails boot if `ANTHROPIC_API_KEY`, `SMTP_URL`, `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_ID`, or `R2_*` are missing when `NODE_ENV=production`. Dev and test keep the silent-stub path.
- Retry with exponential backoff and jitter for WhatsApp sends (5xx and 429 only, 3 attempts). Network errors and timeouts are not retried because sends are not idempotent.
- `whatsapp.test.ts` with coverage for retry-success, retry-rate-limit, fatal-client-error, persistent-failure, and stub paths.
- `entries.test.ts`: 8 integration tests covering CRUD, versioning, and rollback on the FAQ module.
- `kb.test.ts`: 12 integration tests covering API-key auth, scope gating, per-module reads, health, and analytics events.
- `admin.test.ts`: 7 integration tests covering PAIR_ADMIN gating, user create, API key mint (raw returned once, hash stored), marketplace listing, marketplace install, payload validation.
- `cron.test.ts`: 4 integration tests covering publish-cron promotion, `CRON_*_ENABLED=false` short-circuit, expiry flip with audit row, future-dated leave-alone.
- Frontend test runner wired: `escalationRule.test.ts` with 15 cases across importer and prose formats, SLA parsing, round-trip serialisation, and urgency classification. `pnpm --filter @brain/web test` now runs in CI.
- `.github/workflows/release.yml`: tag-triggered release with CHANGELOG-to-release-notes extraction and version-vs-tag consistency check.

### Changed

- `services/whatsapp.ts` reads token and phone id from validated `env` at call time instead of capturing `process.env` at module load. Improves testability and production safety.
- Coverage floor raised from 40 to 60 (lines, functions, statements) and 70 (branches) in `apps/api/vitest.config.ts`. Set just below current actuals so regressions fail CI; intent is to ratchet up each cycle.

### Notes

- Cron runner must be deployed with `DATABASE_URL` pointing to the BYPASSRLS migrate role (or a role that sets `app.is_admin='true'` on every connection). The current cron code queries `scheduled_jobs` and `entries` without first setting `app.tenant_id`, which RLS would block on a plain `app_runtime` connection. Documented in the cron test file header.
- CI `dependency-audit` job reports 2 critical (`fast-jwt` via `@fastify/jwt@8`) and 16 high advisories at release time. None are introduced by this release; all are transitive upstream issues pending ecosystem patches. Tracking for v0.1.1: bump `@fastify/jwt` to a release that pulls in a patched `fast-jwt`, swap `xlsx@0.18.5` for the maintained SheetJS CDN package or an alternative, upgrade `bcrypt` past the old `node-pre-gyp`/`tar` transitive path, bump `@vercel/node` for patched `undici`/`minimatch`, and bump `nodemailer` past the `addressparser` DoS.

### Fixed

- Prose escalation-rule parser (`apps/web/src/lib/escalationRule.ts`) no longer truncates dotted email domains (`finance@pairai.com` now survives round-trip). The regex captured up to the first `.`; the fix runs the match to end-of-cleaned-string with an optional trailing period.
- `POST /api/v1/analytics/event` used the top-level `prisma` client instead of `req.withTenant`, so every insert was blocked by the `content_analytics` RLS policy. Wrapped in `req.withTenant` so the tenant session variable is set before the insert.

## [0.1.0] - 2026-04-18

First tagged cut of The Brain. Code-complete against the 17-week plan documented in `FINALIZE.md`. Structurally production-ready, not yet exercised at customer load. Suitable for a controlled pilot.

### Added

- Multi-tenant Fastify API with Postgres RLS, per-request `app.tenant_id` context, and a CI-gated RLS leak test using two Prisma clients.
- Auth: JWT access and refresh, bcrypt hashing, constant-time dummy-hash compare on unknown users, per-route scope checks, login rate limit.
- Routes: `auth`, `admin`, `modules`, `entries`, `kb`, `chat`, `import`, `activity`, `analytics`, `voice`, `media`, `me`, `translate`.
- AI integration: Claude tiered (Opus / Sonnet / Haiku) via `packages/prompts`, tool-use parser, translator with brand glossary, `test-it`, duplication detection, gap-scan.
- Session memory: last 10 turns in Redis (24h TTL) plus durable summary in `chat_sessions`.
- Modules and marketplace: 9 seed modules, admin install endpoint.
- Scheduled publishing and auto-expiry crons, WhatsApp 3-day warning, daily gap-scan, weekly React-PDF report.
- Versioning: `entry_versions` with 50-retain and rollback endpoint.
- Media: R2 upload and presigned GET with 10MB cap, Whisper voice transcripts.
- Imports: CSV and Excel preview plus commit with `import_logs`.
- Analytics: health score, edit velocity, most-served, never-served, suggestions feed.
- Public REST API: `/knowledge-base` with versioned cache, fallback keyspace, API-key scopes.
- Activity feed with REST and SSE stream; 7-step walkthrough overlay persisted.
- Observability: Pino structured logs, Prometheus `/metrics`, Sentry with PII scrubbing, `/health`, `X-Request-Id` propagation.
- CI: typecheck, lint, audit, gitleaks, vitest with Postgres and Redis services, coverage artifacts, `.env.example` parity check.
- Deployment: multi-stage Dockerfile with non-root and tini, Vercel serverless config, docker-compose for local.
- Ops docs: 9 runbooks (auth-incident, rls-leak, db-failover, llm-outage, cron-failure, r2-outage, whatsapp-ratelimit, claude-outage), 5 ADRs, `SECURITY.md`, `CONTRIBUTING.md`, `FINALIZE.md`.

### Security

- Helmet with HSTS preload, frame-ancestors none, strict CSP.
- Gitleaks on every push.
- `pnpm audit --audit-level=high` blocks CI.
- Parameterised `set_config` for tenant context (no string interpolation).
