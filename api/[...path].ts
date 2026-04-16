// Read-only demo API for the Vercel deployment of The Brain.
// The real backend (Fastify + Postgres + Redis + Claude + ...) is not
// deployed here. This function serves just enough endpoints for:
//   - the demo login flow
//   - the Knowledge index to render with realistic entry counts
//   - the Escalation Rules page to render all 8 entries end-to-end,
//     exercising the UI redesign
// Writes (POST/PATCH/DELETE) accept the request and return a success
// shape but do not persist. The page reload after an edit will show the
// original fixture, not the edited value. This is documented limitation
// for a static-only demo host.

type Json = Record<string, unknown> | Array<unknown> | string | number | boolean | null;

type VercelReq = {
  url?: string;
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
};

type VercelRes = {
  status(code: number): VercelRes;
  setHeader(name: string, value: string): void;
  end(body?: string): void;
};

const TENANT = { id: "demo-tenant", slug: "future-kid", name: "Future Kid" };
const USER = { id: "demo-user", email: "sara@example.com", name: "Sara (Editor)", role: "CLIENT_EDITOR" };

const MODULES = [
  {
    id: "m-promotions",
    slug: "promotions",
    label: "Active Offers",
    icon: "tag",
    fieldDefinitions: [
      { key: "name", label: "Name", type: "text", localized: false },
      { key: "type", label: "Type", type: "select", options: ["Promo", "Seasonal", "Bank", "Update", "Ops"], localized: false },
      { key: "message", label: "Customer message", type: "textarea", localized: true },
      { key: "start_date", label: "Start", type: "date", localized: false },
      { key: "end_date", label: "End", type: "date", localized: false },
    ],
  },
  {
    id: "m-branches",
    slug: "branches",
    label: "Branches & Hours",
    icon: "map-pin",
    fieldDefinitions: [
      { key: "name", label: "Name", type: "text", localized: true },
      { key: "governorate", label: "Governorate", type: "select", options: ["Hawalli", "Jahra", "Ahmadi", "Farwaniya", "Al-Asimah"], localized: false },
      { key: "status", label: "Status", type: "select", options: ["Active", "CLOSED", "Temp Closed"], localized: false },
      { key: "google_maps_url", label: "Maps", type: "url", localized: false },
      { key: "hours_regular", label: "Hours", type: "textarea", localized: false },
    ],
  },
  {
    id: "m-escalation",
    slug: "escalation_rules",
    label: "Escalation Rules",
    icon: "alert-triangle",
    fieldDefinitions: [
      { key: "trigger", label: "Trigger", type: "textarea", localized: false },
      { key: "channel", label: "Channel", type: "select", options: ["human_chat", "phone", "email", "whatsapp"], localized: false },
      { key: "webhook_url", label: "Webhook", type: "url", localized: false },
    ],
  },
  {
    id: "m-faqs",
    slug: "faqs",
    label: "FAQs (EN + AR)",
    icon: "help-circle",
    fieldDefinitions: [
      { key: "question", label: "Question", type: "text", localized: true },
      { key: "answer", label: "Answer", type: "textarea", localized: true },
      { key: "category", label: "Category", type: "text", localized: false },
    ],
  },
  {
    id: "m-intents",
    slug: "intents",
    label: "Intent Library",
    icon: "target",
    fieldDefinitions: [
      { key: "intent", label: "Intent", type: "text", localized: false },
      { key: "examples", label: "Examples", type: "textarea", localized: true },
    ],
  },
  {
    id: "m-partners",
    slug: "partners",
    label: "Partners & Discounts",
    icon: "handshake",
    fieldDefinitions: [
      { key: "name", label: "Name", type: "text", localized: false },
      { key: "type", label: "Type", type: "select", options: ["Bank", "Loyalty", "Corporate", "Other"], localized: false },
      { key: "notes", label: "Notes", type: "textarea", localized: true },
    ],
  },
  {
    id: "m-policies",
    slug: "policy_matrix",
    label: "Policies & Rules",
    icon: "shield",
    fieldDefinitions: [
      { key: "scenario", label: "Scenario", type: "text", localized: true },
      { key: "policy", label: "Policy", type: "textarea", localized: true },
      { key: "exception", label: "Exception", type: "textarea", localized: true },
    ],
  },
];

const UPDATED_AT = "2026-04-16T00:00:00.000Z";

const ESCALATION_RULES: Array<{ id: string; data: Record<string, unknown>; status: string; updatedAt: string }> = [
  {
    id: "esc-complaint",
    status: "active",
    updatedAt: UPDATED_AT,
    data: {
      trigger: "Complaint - angry, upset, not working, broken. Escalate to Branch Manager. SLA: 2 hours. Auto: We're sorry for the inconvenience. Connecting you to a team member now.",
      channel: "human_chat",
      webhook_url: "",
    },
  },
  {
    id: "esc-refund",
    status: "active",
    updatedAt: UPDATED_AT,
    data: {
      trigger: "Refund Request - refund, money back, charge. Escalate to Finance/CRM. SLA: 4 hours. Auto: Let me connect you with our team to assist with your refund request.",
      channel: "human_chat",
      webhook_url: "",
    },
  },
  {
    id: "esc-safety",
    status: "active",
    updatedAt: UPDATED_AT,
    data: {
      trigger: "Safety / Injury - hurt, injured, accident, emergency. Escalate to Operations Manager. SLA: 30 min. Auto: Your safety is our priority. Connecting you immediately.",
      channel: "human_chat",
      webhook_url: "",
    },
  },
  {
    id: "esc-lost-child",
    status: "active",
    updatedAt: UPDATED_AT,
    data: {
      trigger: "Lost Child - lost, can't find, missing child. Escalate to Branch Manager. SLA: 15 min. Auto: Please stay calm. Connecting you to branch manager immediately.",
      channel: "human_chat",
      webhook_url: "",
    },
  },
  {
    id: "esc-technical",
    status: "active",
    updatedAt: UPDATED_AT,
    data: {
      trigger: "Technical Issue - website down, can't pay, error, app. Escalate to IT Support. SLA: 4 hours. Auto: We're aware of the issue and working on it. Apologies for the inconvenience.",
      channel: "human_chat",
      webhook_url: "",
    },
  },
  {
    id: "esc-general",
    status: "active",
    updatedAt: UPDATED_AT,
    data: {
      trigger: "General Inquiry - hours, location, prices, packages. Handled by PAIR AI. No escalation needed.",
      channel: "whatsapp",
      webhook_url: "",
    },
  },
  {
    id: "esc-group-booking",
    status: "active",
    updatedAt: UPDATED_AT,
    data: {
      trigger: "Group / School Booking - school trip, group, company event. Escalate to Sales Team. SLA: 24 hours. Auto: Connecting you to our group bookings team at Future Kid.",
      channel: "human_chat",
      webhook_url: "",
    },
  },
  {
    id: "esc-lost-item",
    status: "active",
    updatedAt: UPDATED_AT,
    data: {
      trigger: "Lost Item - lost item, forgot, left behind, my bag, my phone. Escalate to Branch Manager. SLA: 2 hours. Auto: We understand how stressful that is. Connecting you to the Branch Manager.",
      channel: "human_chat",
      webhook_url: "",
    },
  },
];

// Fake counts so the Knowledge index matches the feel of the real data.
// These modules are empty in the stub (just placeholders), so the list
// pages will render an empty state.
const STUB_COUNTS: Record<string, number> = {
  promotions: 0,
  branches: 0,
  faqs: 0,
  intents: 0,
  partners: 0,
  policy_matrix: 0,
};

function send(res: VercelRes, payload: Json, status = 200): void {
  res.status(status);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.end(JSON.stringify(payload));
}

function ok<T>(res: VercelRes, data: T): void {
  send(res, { success: true, data } as unknown as Json);
}

function notFound(res: VercelRes, message = "not found"): void {
  send(res, { success: false, error: { message } }, 404);
}

export default function handler(req: VercelReq, res: VercelRes): void {
  const rawUrl = req.url ?? "/";
  const url = new URL(rawUrl, "http://localhost");
  const path = url.pathname;
  const method = (req.method ?? "GET").toUpperCase();

  // POST /api/v1/auth/login → accept any credentials, return a demo session.
  if (method === "POST" && path === "/api/v1/auth/login") {
    return ok(res, {
      token: "demo-" + Math.random().toString(36).slice(2),
      user: USER,
      tenant: TENANT,
    });
  }

  // GET /api/v1/modules
  if (method === "GET" && path === "/api/v1/modules") {
    return ok(res, MODULES);
  }

  // GET /api/v1/entries/:slug
  const listMatch = path.match(/^\/api\/v1\/entries\/([^/]+)\/?$/);
  if (listMatch && method === "GET") {
    const slug = decodeURIComponent(listMatch[1]!);
    if (slug === "escalation_rules") return ok(res, ESCALATION_RULES);
    const count = STUB_COUNTS[slug] ?? 0;
    const stubs = Array.from({ length: count }, (_, i) => ({
      id: `${slug}-stub-${i}`,
      data: {},
      status: "active",
      updatedAt: UPDATED_AT,
    }));
    return ok(res, stubs);
  }

  // POST /api/v1/entries/:slug → pretend to create
  if (listMatch && method === "POST") {
    const body = (req.body as { data?: Record<string, unknown> } | undefined) ?? {};
    return ok(res, {
      id: "new-" + Math.random().toString(36).slice(2),
      data: body.data ?? {},
      status: "active",
      updatedAt: new Date().toISOString(),
    });
  }

  // PATCH or DELETE /api/v1/entries/:slug/:id
  const itemMatch = path.match(/^\/api\/v1\/entries\/([^/]+)\/([^/]+)\/?$/);
  if (itemMatch && method === "PATCH") {
    const body = (req.body as { data?: Record<string, unknown> } | undefined) ?? {};
    return ok(res, {
      id: itemMatch[2],
      data: body.data ?? {},
      status: "active",
      updatedAt: new Date().toISOString(),
    });
  }
  if (itemMatch && method === "DELETE") {
    return ok(res, { id: itemMatch[2] });
  }

  return notFound(res, `no stub for ${method} ${path}`);
}
