import { ok, methodNotAllowed, MODULES, ENTRIES_BY_SLUG, USER, type VercelReq, type VercelRes } from "../_shared";

type ActivityEvent = {
  id: string;
  action: "create" | "update" | "delete";
  timestamp: string;
  user: { id: string; name: string } | null;
  module: { slug: string; label: string } | null;
  entry: { id: string; title: string } | null;
  detail: string | null;
};

const TITLE_KEYS = ["name_en", "name", "title", "q_en", "question_en", "flow_id"] as const;

function pickTitle(data: Record<string, unknown>): string {
  for (const k of TITLE_KEYS) {
    const v = data[k];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  for (const v of Object.values(data)) {
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return "(untitled)";
}

let cachedEvents: ActivityEvent[] | null = null;

function buildEvents(): ActivityEvent[] {
  if (cachedEvents) return cachedEvents;
  const events: ActivityEvent[] = [];
  const moduleBySlug = new Map(MODULES.map((m) => [m.slug, m]));
  let counter = 0;

  for (const [slug, entries] of Object.entries(ENTRIES_BY_SLUG)) {
    const mod = moduleBySlug.get(slug);
    if (!mod) continue;
    for (const entry of entries) {
      events.push({
        id: `ver-${counter++}`,
        action: "create",
        timestamp: entry.updatedAt,
        user: { id: USER.id, name: USER.name },
        module: { slug: mod.slug, label: mod.label },
        entry: { id: entry.id, title: pickTitle(entry.data) },
        detail: null,
      });
    }
  }

  events.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
  cachedEvents = events;
  return events;
}

export default function handler(req: VercelReq, res: VercelRes): void {
  if ((req.method ?? "").toUpperCase() !== "GET") return methodNotAllowed(res);

  const moduleSlug = (req.query.moduleSlug as string) || "";
  const action = (req.query.action as string) || "";
  const limit = Math.min(Number(req.query.limit) || 50, 200);

  let events = buildEvents();
  if (moduleSlug) events = events.filter((e) => e.module?.slug === moduleSlug);
  if (action) events = events.filter((e) => e.action === action);

  return ok(res, events.slice(0, limit));
}
