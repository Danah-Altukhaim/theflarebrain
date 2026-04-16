import { ok, methodNotAllowed, type VercelReq, type VercelRes } from "../../../_shared";

export default function handler(req: VercelReq, res: VercelRes): void {
  const method = (req.method ?? "").toUpperCase();
  const id = String(req.query.id ?? "");

  if (method === "PATCH") {
    const body = (req.body ?? {}) as { data?: Record<string, unknown> };
    return ok(res, {
      id,
      data: body.data ?? {},
      status: "active",
      updatedAt: new Date().toISOString(),
    });
  }

  if (method === "DELETE") {
    return ok(res, { id });
  }

  return methodNotAllowed(res);
}
