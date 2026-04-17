import {
  ok,
  methodNotAllowed,
  ENTRIES_BY_SLUG,
  type VercelReq,
  type VercelRes,
} from "../../_shared";

export default function handler(req: VercelReq, res: VercelRes): void {
  const method = (req.method ?? "").toUpperCase();
  const slug = String(req.query.slug ?? "");

  if (method === "GET") {
    return ok(res, ENTRIES_BY_SLUG[slug] ?? []);
  }

  if (method === "POST") {
    const body = (req.body ?? {}) as { data?: Record<string, unknown> };
    return ok(res, {
      id: "new-" + Math.random().toString(36).slice(2),
      data: body.data ?? {},
      status: "active",
      updatedAt: new Date().toISOString(),
    });
  }

  return methodNotAllowed(res);
}
