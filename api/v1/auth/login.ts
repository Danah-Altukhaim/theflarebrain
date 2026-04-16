import { ok, fail, TENANT, USER, methodNotAllowed, type VercelReq, type VercelRes } from "../../_shared";

export default function handler(req: VercelReq, res: VercelRes): void {
  if ((req.method ?? "").toUpperCase() !== "POST") return methodNotAllowed(res);
  // Accept any credentials for the demo stub. The real API validates
  // tenantSlug, email, password against the database; here we just
  // return a static Sara session so the UI can move on.
  const body = (req.body ?? {}) as { tenantSlug?: string; email?: string; password?: string };
  if (!body.email) return fail(res, "missing email", 400);
  return ok(res, {
    token: "demo-" + Math.random().toString(36).slice(2),
    user: USER,
    tenant: TENANT,
  });
}
