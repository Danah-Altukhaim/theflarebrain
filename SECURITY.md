# Security policy

## Reporting a vulnerability

Please do **not** file a public GitHub issue for security reports.

Email the security contact at **security@pair.ai** with:

- a description of the issue,
- steps to reproduce (proof-of-concept if possible),
- the affected endpoint or component,
- the version or commit hash.

We aim to acknowledge reports within 2 business days and to ship a fix or a mitigation within 30 days for high-severity issues.

## Scope

In scope:

- the API under `apps/api`
- the web app under `apps/web`
- the Next.js dashboard under `../activity-briefing`
- the Docker image
- CI workflow and Dockerfile secrets handling

Out of scope:

- denial of service via traffic flooding
- vulnerabilities in upstream providers (Vercel, Neon, Cloudflare, Anthropic, OpenAI) — please report those directly to the provider.
- social engineering of our team.

## Practices we follow

- Row-level security for tenant isolation (see `docs/adr/0001-postgres-rls-for-tenancy.md`).
- A CI gate that proves cross-tenant reads return zero rows (`__tests__/rls-leak.test.ts`).
- Secret scanning on every push (gitleaks in `.github/workflows/ci.yml`).
- Dependency scanning (`pnpm audit --audit-level=high`) blocks CI on high-severity advisories.
- Security headers via `@fastify/helmet` and Next.js `headers()`.
- Login endpoint rate-limited; bcrypt hashing; constant-time compare against a dummy hash on unknown users.
- No secret ever logged or sent to Sentry (see the allowlist in `apps/api/src/lib/sentry.ts`).

## Handling disclosed issues

Once a report is verified, we:

1. Triage within 48 hours and assign a severity (CRITICAL / HIGH / MEDIUM / LOW).
2. Open a private branch and start the fix.
3. Coordinate disclosure: we do not publish details until a fix is deployed.
4. Credit the reporter in release notes unless they prefer anonymity.
