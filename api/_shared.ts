// Fixtures and helpers shared by the demo API stub under /api/v1/*.
// Writes do not persist; this is a read-only demo backend.

export type VercelReq = {
  url?: string;
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  query: Record<string, string | string[] | undefined>;
};

export type VercelRes = {
  status(code: number): VercelRes;
  setHeader(name: string, value: string): void;
  end(body?: string): void;
};

export const TENANT = { id: "demo-tenant", slug: "future-kid", name: "Future Kid" };
export const USER = {
  id: "demo-user",
  email: "sara@example.com",
  name: "Sara (Editor)",
  role: "CLIENT_EDITOR",
};

export const MODULES = [
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

export const ESCALATION_RULES = [
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

export function ok<T>(res: VercelRes, data: T): void {
  res.status(200);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.end(JSON.stringify({ success: true, data }));
}

export function fail(res: VercelRes, message: string, status = 400): void {
  res.status(status);
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.setHeader("cache-control", "no-store");
  res.end(JSON.stringify({ success: false, error: { message } }));
}

export function methodNotAllowed(res: VercelRes): void {
  fail(res, "method not allowed", 405);
}
