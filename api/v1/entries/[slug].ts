import {
  ok,
  methodNotAllowed,
  ESCALATION_RULES,
  type VercelReq,
  type VercelRes,
} from "../../_shared";

// Fake counts so the Knowledge index reflects the feel of the real data
// even though only escalation_rules has actual entries in this stub.
const STUB_COUNTS: Record<string, number> = {
  promotions: 0,
  branches: 0,
  faqs: 0,
  intents: 0,
  partners: 0,
  policy_matrix: 0,
};

export default function handler(req: VercelReq, res: VercelRes): void {
  const method = (req.method ?? "").toUpperCase();
  const slug = String(req.query.slug ?? "");

  if (method === "GET") {
    if (slug === "escalation_rules") return ok(res, ESCALATION_RULES);
    const count = STUB_COUNTS[slug] ?? 0;
    const stubs = Array.from({ length: count }, (_, i) => ({
      id: `${slug}-stub-${i}`,
      data: {},
      status: "active",
      updatedAt: "2026-04-16T00:00:00.000Z",
    }));
    return ok(res, stubs);
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
