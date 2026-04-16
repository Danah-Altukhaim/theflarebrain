import { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom";
import { api } from "../lib/api.js";
import { useAutoTranslation } from "../lib/translate.js";
import { Icon } from "../components/Icon.js";
import { DatePicker } from "../components/DatePicker.js";
import {
  parseTrigger,
  serializeTrigger,
  hasEscalationTarget,
  slaUrgency,
} from "../lib/escalationRule.js";

type Entry = { id: string; data: Record<string, unknown>; status: string; updatedAt: string };
type FieldDef = { key: string; type: string; label: string; options?: string[]; localized?: boolean };
type ModuleInfo = { id: string; slug: string; label: string; fieldDefinitions?: FieldDef[] };

const STATUS_BADGE: Record<string, string> = {
  active: "badge-green",
  draft: "badge-gray",
  scheduled: "badge-blue",
  expired: "badge-gray",
  archived: "badge-gray",
  closed: "badge-gray",
  "in progress": "badge-purple",
  completed: "badge-green",
  cancelled: "badge-gray",
};

const ARABIC_RE = /[\u0600-\u06FF]/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
const QUESTION_RE = /^q(uestion)?(_|$)/i;
const ANSWER_RE = /^a(nswer)?(_|$)/i;
const EN_RE = /(^|_)(en|english)(_|$)/i;
const AR_RE = /(^|_)(ar|arabic)(_|$)/i;

function orderKeys(keys: string[]): string[] {
  const rank = (k: string) => {
    if (QUESTION_RE.test(k)) return 0;
    if (ANSWER_RE.test(k)) return 4;
    if (EN_RE.test(k)) return 1;
    if (AR_RE.test(k)) return 3;
    return 2;
  };
  return [...keys]
    .map((k, i) => ({ k, i, r: rank(k) }))
    .sort((a, b) => a.r - b.r || a.i - b.i)
    .map((x) => x.k);
}
// Strip emoji glyphs, ZWJ, variation selectors, the replacement char, and
// Unicode private-use codepoints. Also catch UTF-8/Latin-1 mojibake of 4-byte
// emojis: a leading `ð` (\u00F0) plus 1-3 continuation bytes (\u0080-\u00BF).
// Without the continuation match, fragments like `¼` and `¡` survive and
// look like garbage characters mid-text.
const ICON_STRIP_RE =
  /\u00F0[\u0080-\u00BF]{1,3}|[\p{Extended_Pictographic}\u200D\uFE0F\uFFFD\u00F0\uE000-\uF8FF]/gu;

const DATE_KEY_RE = /(date|deadline|expires?|published|start|end)/i;
const HOURS_KEY_RE = /(^|_)hours?($|_)/i;

// Normalize hours text onto one day-range per line. Handles run-together values
// like "Sun-Wed: 10AM-10PMThu-Sat: 10AM-11PM" and semicolon-separated forms.
function normalizeHours(raw: string): string {
  if (!raw) return raw;
  return raw
    .replace(/\s*;\s*/g, "\n")
    .replace(
      /([AP]M|\d{2})(?=\s*(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat|Daily|Weekends?|Weekdays?|Public|Holidays?)\b)/gi,
      "$1\n",
    )
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

function parseHoursLine(line: string): { days: string; hours: string } | null {
  const m = line.match(
    /^(.+?)[\s:]+((?:\d{1,2}(?::\d{2})?\s*(?:AM|PM)?)\s*[-–]\s*(?:\d{1,2}(?::\d{2})?\s*(?:AM|PM)?))\s*$/i,
  );
  if (!m) return null;
  return { days: m[1]!.trim().replace(/[:,]$/, ""), hours: m[2]!.trim() };
}

function HoursDisplay({ raw }: { raw: string }) {
  const lines = normalizeHours(raw).split("\n").filter(Boolean);
  if (lines.length === 0) {
    return <div className="text-[13px] text-apple-text">-</div>;
  }
  return (
    <ul className="rounded-apple border border-apple-separator-light bg-[#F9F9F9] overflow-hidden divide-y divide-apple-separator-light">
      {lines.map((line, i) => {
        const parsed = parseHoursLine(line);
        return (
          <li key={i} className="flex items-center justify-between gap-4 px-3 py-1.5">
            {parsed ? (
              <>
                <span className="text-[12px] font-medium text-apple-text">{parsed.days}</span>
                <span className="text-[12px] tabular-nums text-apple-secondary">{parsed.hours}</span>
              </>
            ) : (
              <span className="text-[12px] text-apple-text">{line}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function badgeFor(status?: string): string {
  if (!status) return "badge-gray";
  const k = status.toLowerCase();
  return STATUS_BADGE[k] ?? "badge-gray";
}

function humanizeKey(k: string): string {
  return k
    .replace(/_/g, " ")
    .replace(/\b([a-z])/g, (m) => m.toUpperCase())
    .replace(/^Ar$|^En$/i, (m) => (m.toUpperCase() === "AR" ? "(AR)" : "(EN)"));
}

// Special whitespace characters that survive `whitespace-pre-line` and produce
// the visible "gap" artifacts: NBSP, narrow NBSP, figure space, em/en spaces,
// thin space, hair space, ideographic space, zero-width space/joiner, BOM, tab.
const SPECIAL_SPACE_RE = /[\u00A0\u202F\u2007\u2003\u2002\u2009\u200A\u3000\u200B\u200C\u200D\uFEFF\t]/g;

function normalizeWhitespace(s: string): string {
  return s
    .replace(SPECIAL_SPACE_RE, " ")
    .split(/\r?\n/)
    .map((line) => line.replace(/[ ]{2,}/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function stripIcons(s: string): string {
  // Replace icons with newlines so emoji-prefixed bullet items end up on
  // their own lines instead of running together as one wrapped paragraph.
  return normalizeWhitespace(s.replace(ICON_STRIP_RE, "\n"));
}

function formatDate(raw: string): string {
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function displayValue(key: string, raw: string): string {
  if (ISO_DATE_RE.test(raw)) return formatDate(raw);
  return stripIcons(raw);
}

function toDateInput(raw: unknown): string {
  if (raw == null) return "";
  const s = String(raw);
  if (ISO_DATE_RE.test(s)) return s.slice(0, 10);
  const d = new Date(s);
  if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  return "";
}

const PROMOTIONS_SLUGS = new Set(["promotions", "active-promotions", "active_offers"]);

const TITLE_KEYS = ["name", "update_name", "title", "name_en", "update_name_en"];
const TYPE_KEYS = ["type", "category", "ai_category", "type_en"];
const START_KEYS = ["start_date", "starts_at", "publish_at", "start"];
const END_KEYS = ["end_date", "expires_at", "ends_at", "end"];
const MSG_EN_KEYS = ["message_en", "message_en_approved", "text_en", "body_en"];
const MSG_AR_KEYS = ["message_ar", "message_ar_approved", "text_ar", "body_ar"];

const LANG_SUFFIX_RE = /^(.+?)(?:_(en|english|ar|arabic))$/i;

function langOfKey(k: string): { base: string; lang: "en" | "ar" | null } {
  const m = k.match(LANG_SUFFIX_RE);
  if (!m) return { base: k, lang: null };
  const suffix = m[2]!.toLowerCase();
  return { base: m[1]!, lang: suffix.startsWith("a") ? "ar" : "en" };
}

type LangGroup =
  | { kind: "pair"; base: string; enKey: string | null; arKey: string | null }
  | { kind: "single"; key: string };

function groupLangKeys(keys: string[]): LangGroup[] {
  const baseIndex = new Map<string, { enKey?: string; arKey?: string; firstIdx: number }>();
  const singles: { key: string; idx: number }[] = [];
  keys.forEach((k, idx) => {
    const { base, lang } = langOfKey(k);
    if (!lang) {
      singles.push({ key: k, idx });
      return;
    }
    const entry = baseIndex.get(base) ?? { firstIdx: idx };
    if (lang === "en") entry.enKey = k;
    else entry.arKey = k;
    if (!baseIndex.has(base)) entry.firstIdx = idx;
    baseIndex.set(base, entry);
  });
  const groups: { idx: number; group: LangGroup }[] = [];
  for (const [base, info] of baseIndex.entries()) {
    groups.push({
      idx: info.firstIdx,
      group: { kind: "pair", base, enKey: info.enKey ?? null, arKey: info.arKey ?? null },
    });
  }
  for (const s of singles) {
    groups.push({ idx: s.idx, group: { kind: "single", key: s.key } });
  }
  return groups.sort((a, b) => a.idx - b.idx).map((g) => g.group);
}

function BilingualText({
  en,
  ar,
  className,
  enClassName,
  arClassName,
}: {
  en: string;
  ar: string;
  className?: string;
  enClassName?: string;
  arClassName?: string;
}) {
  const enClean = stripIcons(en);
  const arClean = stripIcons(ar);
  const needEn = !enClean && Boolean(arClean);
  const needAr = !arClean && Boolean(enClean);
  const [enRequested, setEnRequested] = useState(false);
  const [arRequested, setArRequested] = useState(false);
  const enAuto = useAutoTranslation(needEn && enRequested ? arClean : null, "en", needEn && enRequested);
  const arAuto = useAutoTranslation(needAr && arRequested ? enClean : null, "ar", needAr && arRequested);
  const englishText = enClean || enAuto.value;
  const arabicText = arClean || arAuto.value;
  const englishIsAuto = needEn && Boolean(enAuto.value);
  const arabicIsAuto = needAr && Boolean(arAuto.value);

  if (!enClean && !arClean) return null;

  return (
    <div className={`grid md:grid-cols-2 gap-4 ${className ?? ""}`}>
      <div>
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.08em] font-semibold text-apple-tertiary mb-1.5">
          <span>English</span>
          {englishIsAuto && (
            <span className="badge badge-gray !text-[9px] !px-1.5 !py-0">auto</span>
          )}
        </div>
        {needEn && !enRequested ? (
          <button
            type="button"
            onClick={() => setEnRequested(true)}
            className="text-[12px] text-pair hover:underline inline-flex items-center gap-1"
          >
            <Icon name="sparkles" size={11} />
            Translate to English
          </button>
        ) : needEn && enAuto.loading ? (
          <div className="text-[12px] text-apple-tertiary italic">Translating…</div>
        ) : needEn && enAuto.error ? (
          <button
            type="button"
            onClick={() => setEnRequested(false)}
            className="text-[12px] text-apple-red hover:underline"
          >
            Translation failed, retry
          </button>
        ) : (
          <div
            dir="ltr"
            style={{ textAlign: "left", textAlignLast: "left" }}
            className={`text-[13px] leading-relaxed text-apple-text whitespace-pre-line break-words text-left ${
              enClassName ?? ""
            }`}
          >
            {englishText || "-"}
          </div>
        )}
      </div>
      <div>
        <div className="w-full flex items-center justify-end gap-1.5 text-[10px] uppercase tracking-[0.08em] font-semibold text-apple-tertiary mb-1.5">
          {arabicIsAuto && (
            <span className="badge badge-gray !text-[9px] !px-1.5 !py-0">auto</span>
          )}
          <span>Arabic</span>
        </div>
        {needAr && !arRequested ? (
          <button
            type="button"
            onClick={() => setArRequested(true)}
            className="text-[12px] text-pair hover:underline inline-flex items-center gap-1"
          >
            <Icon name="sparkles" size={11} />
            Translate to Arabic
          </button>
        ) : needAr && arAuto.loading ? (
          <div className="text-[12px] text-apple-tertiary italic">Translating…</div>
        ) : needAr && arAuto.error ? (
          <button
            type="button"
            onClick={() => setArRequested(false)}
            className="text-[12px] text-apple-red hover:underline"
          >
            Translation failed, retry
          </button>
        ) : (
          <div
            dir="rtl"
            style={{ textAlign: "right", textAlignLast: "right" }}
            className={`text-[13px] leading-relaxed text-apple-text whitespace-pre-line break-words font-arabic text-right ${
              arClassName ?? ""
            }`}
          >
            {arabicText || "-"}
          </div>
        )}
      </div>
    </div>
  );
}

function CompactBilingual({ en, ar }: { en: string; ar: string }) {
  const enClean = stripIcons(en);
  const arClean = stripIcons(ar);
  if (!enClean && !arClean) return null;
  if (!arClean) {
    return <div dir="ltr" className="text-[13px] leading-relaxed text-apple-text whitespace-pre-line break-words line-clamp-3 text-left">{enClean}</div>;
  }
  if (!enClean) {
    return <div dir="rtl" className="text-[13px] leading-relaxed text-apple-text whitespace-pre-line break-words line-clamp-3 font-arabic text-right">{arClean}</div>;
  }
  return (
    <div>
      <div dir="ltr" className="text-[13px] leading-relaxed text-apple-text whitespace-pre-line break-words line-clamp-2 text-left">{enClean}</div>
      <div dir="rtl" className="text-[12px] leading-relaxed text-apple-secondary whitespace-pre-line break-words line-clamp-2 font-arabic text-right mt-1">{arClean}</div>
    </div>
  );
}

function pickField(data: Record<string, unknown>, candidates: readonly string[]): string {
  for (const k of candidates) {
    const v = data[k];
    if (typeof v === "string" && v.trim()) return v;
  }
  for (const k of Object.keys(data)) {
    const lower = k.toLowerCase();
    if (candidates.some((c) => lower === c || lower.startsWith(c + "_") || lower === c.replace(/_/g, ""))) {
      const v = data[k];
      if (typeof v === "string" && v.trim()) return v;
    }
  }
  return "";
}

export function ModulePage() {
  const { slug = "" } = useParams();
  const { title: pageTitle } = useOutletContext<{ title?: string }>() ?? {};
  const [entries, setEntries] = useState<Entry[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Entry | null>(null);
  const [isNewEntry, setIsNewEntry] = useState(false);
  const [selectOptions, setSelectOptions] = useState<Record<string, string[]>>({});
  const [fieldDefs, setFieldDefs] = useState<FieldDef[]>([]);

  useEffect(() => {
    api<ModuleInfo[]>("/api/v1/modules")
      .then((mods) => {
        const mod = mods.find((m) => m.slug === slug);
        if (mod?.fieldDefinitions) {
          setFieldDefs(mod.fieldDefinitions);
          const opts: Record<string, string[]> = {};
          for (const f of mod.fieldDefinitions) {
            if (f.type === "select" && f.options?.length) {
              opts[f.key] = f.options;
            }
          }
          setSelectOptions(opts);
        }
      })
      .catch(() => {});
  }, [slug]);

  function reload() {
    setLoading(true);
    api<Entry[]>(`/api/v1/entries/${slug}`)
      .then((rows) => {
        setEntries(rows);
        setLoading(false);
      })
      .catch(() => {
        setEntries([]);
        setLoading(false);
      });
  }

  async function deleteEntry(e: Entry) {
    const label =
      pickField(e.data as Record<string, unknown>, TITLE_KEYS) || "this entry";
    const ok = window.confirm(
      `Delete "${label}"? This action cannot be undone.`,
    );
    if (!ok) return;
    try {
      await api(`/api/v1/entries/${slug}/${e.id}`, { method: "DELETE" });
      setEntries((prev) => prev.filter((row) => row.id !== e.id));
    } catch (err) {
      window.alert(
        `Failed to delete: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  function createNewEntry() {
    const emptyData: Record<string, unknown> = {};
    const now = new Date().toISOString();
    if (entries[0]) {
      const ref = entries[0].data as Record<string, unknown>;
      for (const k of Object.keys(ref)) {
        const sample = ref[k];
        const sampleStr = typeof sample === "string" ? sample : "";
        if (DATE_KEY_RE.test(k) || ISO_DATE_RE.test(sampleStr)) {
          emptyData[k] = now;
        } else if (EN_RE.test(k) || AR_RE.test(k) || MSG_EN_KEYS.includes(k) || MSG_AR_KEYS.includes(k)) {
          emptyData[k] = "";
        } else if (TITLE_KEYS.includes(k)) {
          emptyData[k] = "";
        } else {
          emptyData[k] = sample ?? "";
        }
      }
    }
    const placeholder: Entry = {
      id: "",
      data: emptyData,
      status: "active",
      updatedAt: now,
    };
    setIsNewEntry(true);
    setEditing(placeholder);
  }

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const keys = useMemo(
    () => (entries[0] ? orderKeys(Object.keys(entries[0].data)) : []),
    [entries],
  );

  const langGroups = useMemo(() => groupLangKeys(keys), [keys]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((e) =>
      Object.values(e.data).some((v) => String(v ?? "").toLowerCase().includes(q)),
    );
  }, [entries, query]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-1 min-w-0">
          <h1 className="text-[22px] sm:text-[24px] font-semibold tracking-[-0.02em] text-apple-text">
            {pageTitle || slug.replace(/[-_]/g, " ")}
          </h1>
          <p className="text-[13px] text-apple-secondary mt-0.5">
            {loading
              ? "Loading..."
              : query.trim()
                ? `${filtered.length} matching of ${entries.length}`
                : `${entries.length} ${entries.length === 1 ? "entry" : "entries"}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-apple-tertiary">
              <Icon name="search" size={14} />
            </span>
            <input
              className="input-apple !py-2 !pl-9 !pr-3 w-full sm:w-64"
              placeholder="Filter entries..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="btn-primary shrink-0" onClick={createNewEntry}>
            <Icon name="plus" size={15} />
            <span className="hidden sm:inline">New entry</span>
          </button>
        </div>
      </div>

      {PROMOTIONS_SLUGS.has(slug) ? (
        <div className="space-y-3">
          {filtered.map((e) => (
            <PromotionCard
              key={e.id}
              entry={e}
              onEdit={() => setEditing(e)}
              onDelete={() => deleteEntry(e)}
            />
          ))}
          {!loading && filtered.length === 0 && (
            <div className="card p-10 text-center text-apple-tertiary text-[13px]">
              {entries.length === 0
                ? "No promotions yet. Add one via Brain Chat."
                : "No matches for your filter."}
            </div>
          )}
        </div>
      ) : slug === "escalation_rules" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {filtered.map((e) => (
            <EscalationRuleCard
              key={e.id}
              entry={e}
              onEdit={() => setEditing(e)}
              onDelete={() => deleteEntry(e)}
            />
          ))}
          {!loading && filtered.length === 0 && (
            <div className="card p-10 text-center text-apple-tertiary text-[13px] col-span-full">
              {entries.length === 0
                ? "No escalation rules yet. Add one via Brain Chat."
                : "No matches for your filter."}
            </div>
          )}
        </div>
      ) : (
        <EntryTable
          entries={filtered}
          totalCount={entries.length}
          loading={loading}
          langGroups={langGroups}
          onEdit={(e) => setEditing(e)}
          onDelete={(e) => deleteEntry(e)}
        />
      )}

      {editing &&
        (slug === "escalation_rules" ? (
          <EscalationRuleEditModal
            slug={slug}
            entry={editing}
            isNew={isNewEntry}
            channelOptions={
              selectOptions.channel ?? ["human_chat", "whatsapp"]
            }
            onClose={() => { setEditing(null); setIsNewEntry(false); }}
            onSaved={() => {
              setEditing(null);
              setIsNewEntry(false);
              reload();
            }}
            onDelete={() => deleteEntry(editing)}
          />
        ) : (
          <EditEntryModal
            slug={slug}
            entry={editing}
            isNew={isNewEntry}
            selectOptions={selectOptions}
            fieldDefinitions={fieldDefs}
            onClose={() => { setEditing(null); setIsNewEntry(false); }}
            onSaved={() => {
              setEditing(null);
              setIsNewEntry(false);
              reload();
            }}
            onDelete={() => deleteEntry(editing)}
          />
        ))}
    </div>
  );
}

function PromotionCard({
  entry,
  onEdit,
  onDelete,
}: {
  entry: Entry;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const d = entry.data as Record<string, unknown>;
  const title = pickField(d, TITLE_KEYS) || "(untitled offer)";
  const type = pickField(d, TYPE_KEYS);
  const startRaw = pickField(d, START_KEYS);
  const endRaw = pickField(d, END_KEYS);
  const messageEn = pickField(d, MSG_EN_KEYS);
  const messageAr = pickField(d, MSG_AR_KEYS);

  const now = Date.now();
  const endMs = endRaw ? new Date(endRaw).getTime() : NaN;
  const startMs = startRaw ? new Date(startRaw).getTime() : NaN;
  const arrowTone =
    !isNaN(endMs) && endMs < now
      ? "text-apple-red"
      : !isNaN(startMs) && startMs > now
        ? "text-pair"
        : "text-apple-secondary";

  return (
    <article className="card p-5 hover:shadow-apple transition-shadow">
      <header className="flex items-start gap-3 flex-wrap">
        <h2 className="text-[16px] font-semibold tracking-tight text-apple-text flex-1 min-w-0">
          {title}
        </h2>
        {type && <span className="badge badge-blue shrink-0">{type}</span>}
        <span className={`badge ${badgeFor(entry.status)} shrink-0`}>{entry.status}</span>
      </header>

      <div className="flex items-center justify-between mt-2.5 text-[12px]">
        <div className="inline-flex items-center gap-1.5 text-apple-secondary">
          <Icon name="calendar-check" size={12} />
          <span className="tabular-nums">{startRaw ? formatDate(startRaw) : "-"}</span>
          <span className={arrowTone}>→</span>
          <span className="tabular-nums">{endRaw ? formatDate(endRaw) : "-"}</span>
        </div>
        <div className="inline-flex items-center gap-1">
          <button
            onClick={onEdit}
            className="btn-ghost !px-2 !py-1 !text-[12px]"
            aria-label="Edit promotion"
            title="Edit"
          >
            <Icon name="pencil" size={12} />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="btn-ghost !px-2 !py-1 !text-[12px] text-apple-red hover:!bg-red-50"
            aria-label="Delete promotion"
            title="Delete"
          >
            <Icon name="trash" size={12} />
          </button>
        </div>
      </div>

      {(messageEn || messageAr) && (
        <BilingualText
          en={messageEn}
          ar={messageAr}
          className="mt-4 border-t border-apple-separator-light pt-4"
        />
      )}
    </article>
  );
}

function isBoolish(v: unknown): boolean {
  if (typeof v === "boolean") return true;
  if (typeof v !== "string") return false;
  const s = v.trim().toLowerCase();
  return s === "true" || s === "false" || s === "yes" || s === "no";
}

function boolValue(v: unknown): boolean {
  if (typeof v === "boolean") return v;
  const s = String(v).trim().toLowerCase();
  return s === "true" || s === "yes";
}

type Column = {
  key: string;
  label: string;
  shape: "id" | "bool" | "date" | "url" | "hours" | "bilingual" | "text";
  primary: boolean;
  enKey?: string | null;
  arKey?: string | null;
  dataKey?: string;
};

function findTitleKey(entries: Entry[]): string | null {
  for (const k of TITLE_KEYS) {
    if (
      entries.some((e) => {
        const v = (e.data as Record<string, unknown>)[k];
        return typeof v === "string" && v.trim().length > 0;
      })
    )
      return k;
  }
  // Fallback: same key that rowTitle would surface (first short-ish string).
  // Without this, FAQs (no name/title field) would render the same value as
  // both the row title and a redundant column.
  const first = entries[0];
  if (!first) return null;
  for (const [k, v] of Object.entries(first.data as Record<string, unknown>)) {
    if (typeof v === "string" && v.trim().length > 0 && v.length < 100) return k;
  }
  return null;
}

function rowTitle(d: Record<string, unknown>): string {
  const t = pickField(d, TITLE_KEYS);
  if (t) return stripIcons(t);
  const fallback = Object.values(d).find(
    (v) => typeof v === "string" && (v as string).trim().length > 0 && (v as string).length < 100,
  ) as string | undefined;
  return stripIcons(fallback ?? "(untitled)");
}

const HIDDEN_TABLE_KEYS = new Set(["hours_ramadan", "status"]);

function deriveColumns(
  entries: Entry[],
  langGroups: LangGroup[],
  titleKey: string | null,
): Column[] {
  const cols: Column[] = [];
  const consumed = new Set<string>();
  if (titleKey) consumed.add(titleKey);

  let primaryAssigned = false;

  for (const g of langGroups) {
    if (g.kind === "pair") {
      if (consumed.has(g.enKey ?? "") || consumed.has(g.arKey ?? "")) continue;
      if (HIDDEN_TABLE_KEYS.has(g.base)) continue;
      const isPrimary = !primaryAssigned;
      if (isPrimary) primaryAssigned = true;
      cols.push({
        key: `pair:${g.base}`,
        label: humanizeKey(g.base),
        shape: "bilingual",
        primary: isPrimary,
        enKey: g.enKey,
        arKey: g.arKey,
      });
    } else {
      if (consumed.has(g.key)) continue;
      if (HIDDEN_TABLE_KEYS.has(g.key)) continue;
      const samples = entries
        .map((e) => (e.data as Record<string, unknown>)[g.key])
        .filter((v) => v !== undefined && v !== null && v !== "");
      const sample = samples[0];
      let shape: Column["shape"] = "text";
      if (samples.length > 0 && samples.every(isBoolish)) shape = "bool";
      else if (
        DATE_KEY_RE.test(g.key) ||
        (typeof sample === "string" && ISO_DATE_RE.test(sample))
      )
        shape = "date";
      else if (HOURS_KEY_RE.test(g.key)) shape = "hours";
      else if (typeof sample === "string" && /^https?:\/\//.test(sample)) shape = "url";
      else if (
        samples.length > 0 &&
        samples.every(
          (v) =>
            typeof v === "string" &&
            (v as string).length <= 24 &&
            !(v as string).includes("\n"),
        )
      )
        shape = "id";

      const isPrimary = !primaryAssigned && shape === "text";
      if (isPrimary) primaryAssigned = true;

      cols.push({
        key: `single:${g.key}`,
        label: humanizeKey(g.key),
        shape,
        primary: isPrimary,
        dataKey: g.key,
      });
    }
  }

  return cols;
}

function BoolPill({ v }: { v: unknown }) {
  const t = boolValue(v);
  return (
    <span className={`badge ${t ? "badge-green" : "badge-gray"}`}>{t ? "Yes" : "No"}</span>
  );
}

function BilingualCell({ enRaw, arRaw }: { enRaw: string; arRaw: string }) {
  const enClean = stripIcons(enRaw);
  const arClean = stripIcons(arRaw);
  if (!enClean && !arClean) return <span className="text-apple-tertiary">-</span>;
  const showAr = !enClean;
  const primary = enClean || arClean;
  const tooltip = [enClean, arClean].filter(Boolean).join("\n\n");
  return (
    <div className="flex items-center gap-2 max-w-[340px]">
      <div
        dir={showAr ? "rtl" : "ltr"}
        title={tooltip}
        className={`text-[13px] text-apple-text truncate flex-1 ${
          showAr ? "font-arabic text-right" : "text-left"
        }`}
      >
        {primary}
      </div>
      {enClean && arClean && (
        <span
          className="badge badge-gray !text-[10px] !px-1.5 !py-0 shrink-0"
          title="Arabic translation available"
        >
          AR
        </span>
      )}
    </div>
  );
}

function ShapeCell({ col, d }: { col: Column; d: Record<string, unknown> }) {
  if (col.shape === "bilingual") {
    const en = col.enKey ? String(d[col.enKey] ?? "") : "";
    const ar = col.arKey ? String(d[col.arKey] ?? "") : "";
    return <BilingualCell enRaw={en} arRaw={ar} />;
  }
  const raw = col.dataKey ? d[col.dataKey] : undefined;
  if (raw === undefined || raw === null || raw === "") {
    return <span className="text-apple-tertiary">-</span>;
  }
  const s = String(raw);
  switch (col.shape) {
    case "bool":
      return <BoolPill v={raw} />;
    case "date":
      return (
        <span className="text-[13px] text-apple-text tabular-nums whitespace-nowrap">
          {formatDate(s)}
        </span>
      );
    case "url": {
      const short = s.replace(/^https?:\/\/(www\.)?/, "").split("/").slice(0, 2).join("/");
      return (
        <a
          href={s}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-[13px] text-pair hover:underline truncate inline-block max-w-[220px]"
          title={s}
        >
          {short}
        </a>
      );
    }
    case "hours": {
      const lines = normalizeHours(stripIcons(s)).split("\n").filter(Boolean);
      if (lines.length === 0) return <span className="text-apple-tertiary">-</span>;
      return (
        <div className="text-[13px] text-apple-text whitespace-nowrap" title={lines.join("\n")}>
          {lines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      );
    }
    case "id":
      return (
        <span className="text-[13px] text-apple-text tabular-nums whitespace-nowrap">
          {stripIcons(s)}
        </span>
      );
    default: {
      const v = displayValue(col.dataKey!, s);
      const isAr = ARABIC_RE.test(v);
      return (
        <div
          dir={isAr ? "rtl" : "ltr"}
          title={v}
          className={`text-[13px] text-apple-text truncate max-w-[340px] ${
            isAr ? "font-arabic text-right" : "text-left"
          }`}
        >
          {v}
        </div>
      );
    }
  }
}

function EntryTable({
  entries,
  totalCount,
  loading,
  langGroups,
  onEdit,
  onDelete,
}: {
  entries: Entry[];
  totalCount: number;
  loading: boolean;
  langGroups: LangGroup[];
  onEdit: (e: Entry) => void;
  onDelete: (e: Entry) => void;
}) {
  const titleKey = useMemo(() => findTitleKey(entries), [entries]);
  const cols = useMemo(
    () => deriveColumns(entries, langGroups, titleKey),
    [entries, langGroups, titleKey],
  );

  if (!loading && entries.length === 0) {
    return (
      <div className="card p-10 text-center text-apple-tertiary text-[13px]">
        {totalCount === 0
          ? "No entries yet. Add one via Brain Chat."
          : "No matches for your filter."}
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-apple-separator-light bg-[#FBFBFD]">
              <th
                scope="col"
                className="px-4 py-2.5 text-[11px] uppercase tracking-[0.06em] font-medium text-apple-tertiary"
              >
                Title
              </th>
              {cols.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={`px-3 py-2.5 text-[11px] uppercase tracking-[0.06em] font-medium text-apple-tertiary whitespace-nowrap ${
                    c.primary ? "" : "hidden lg:table-cell"
                  } ${c.shape === "bool" ? "text-center" : ""}`}
                >
                  {c.label}
                </th>
              ))}
              <th scope="col" className="px-3 py-2.5 w-[1%]">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => {
              const d = e.data as Record<string, unknown>;
              const title = rowTitle(d);
              return (
                <tr
                  key={e.id}
                  onClick={() => onEdit(e)}
                  className="border-b border-apple-separator-light last:border-0 hover:bg-[#F9F9F9] cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 align-middle">
                    <div className="text-[13.5px] font-medium text-apple-text line-clamp-2 max-w-[260px]">
                      {title}
                    </div>
                  </td>
                  {cols.map((c) => (
                    <td
                      key={c.key}
                      className={`px-3 py-3 align-middle ${c.primary ? "" : "hidden lg:table-cell"} ${
                        c.shape === "bool" ? "text-center" : ""
                      }`}
                    >
                      <ShapeCell col={c} d={d} />
                    </td>
                  ))}
                  <td
                    className="px-3 py-3 align-middle whitespace-nowrap"
                    onClick={(ev) => ev.stopPropagation()}
                  >
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => onEdit(e)}
                        className="btn-ghost !px-2 !py-1 !text-[12px]"
                        aria-label="Edit entry"
                        title="Edit"
                      >
                        <Icon name="pencil" size={12} />
                        <span className="hidden md:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => onDelete(e)}
                        className="btn-ghost !px-2 !py-1 !text-[12px] text-apple-red hover:!bg-red-50"
                        aria-label="Delete entry"
                        title="Delete"
                      >
                        <Icon name="trash" size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CollapsibleTextarea({
  value,
  onChange,
  isAr,
  label,
}: {
  value: string;
  onChange: (val: string) => void;
  isAr: boolean;
  label: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const autoSize = useCallback((node: HTMLTextAreaElement | null) => {
    if (!node) return;
    node.style.height = "auto";
    node.style.height = node.scrollHeight + 2 + "px";
  }, []);
  const textareaRef = useCallback((node: HTMLTextAreaElement | null) => {
    if (node && expanded) {
      autoSize(node);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }, [expanded, autoSize]);

  const preview = value.length > 120 ? value.slice(0, 120) + "..." : value;
  const lines = value.split("\n");
  const isCollapsible = value.length > 120 || lines.length > 3;

  if (!isCollapsible) {
    return (
      <textarea
        rows={3}
        dir={isAr ? "rtl" : "ltr"}
        className={`input-apple resize-y min-h-[72px] leading-relaxed ${isAr ? "font-arabic text-right" : "text-left"}`}
        value={value}
        onChange={(ev) => onChange(ev.target.value)}
      />
    );
  }

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        dir={isAr ? "rtl" : "ltr"}
        className={`input-apple text-left cursor-pointer hover:border-[#D0D0D0] group w-full ${isAr ? "font-arabic !text-right" : ""}`}
      >
        <div className={`text-[13px] leading-relaxed text-apple-text line-clamp-2 whitespace-pre-line ${isAr ? "text-right" : "text-left"}`}>
          {preview}
        </div>
        <div className="text-[11px] font-medium text-pair mt-1.5 group-hover:underline">
          Show full {label.toLowerCase()}
        </div>
      </button>
    );
  }

  return (
    <div className="space-y-1.5">
      <textarea
        ref={textareaRef}
        dir={isAr ? "rtl" : "ltr"}
        className={`input-apple resize-none leading-relaxed overflow-hidden ${isAr ? "font-arabic text-right" : "text-left"}`}
        value={value}
        onChange={(ev) => {
          onChange(ev.target.value);
          autoSize(ev.target);
        }}
      />
      <button
        type="button"
        onClick={() => setExpanded(false)}
        className="text-[11px] font-medium text-apple-secondary hover:text-pair transition-colors"
      >
        Collapse
      </button>
    </div>
  );
}

function EditEntryModal({
  slug,
  entry,
  isNew,
  selectOptions,
  fieldDefinitions,
  onClose,
  onSaved,
  onDelete,
}: {
  slug: string;
  entry: Entry;
  isNew?: boolean;
  selectOptions?: Record<string, string[]>;
  fieldDefinitions?: FieldDef[];
  onClose: () => void;
  onSaved: () => void;
  onDelete: () => void;
}) {
  const initialKeys = useMemo(() => orderKeys(Object.keys(entry.data)), [entry]);

  const getLabel = useMemo(() => {
    const map: Record<string, string> = {};
    if (fieldDefinitions) {
      for (const f of fieldDefinitions) {
        if (f.localized) {
          map[`${f.key}_en`] = `${f.label} (English)`;
          map[`${f.key}_ar`] = `${f.label} (Arabic)`;
        } else {
          map[f.key] = f.label;
        }
      }
    }
    return (k: string) => map[k] ?? humanizeKey(k);
  }, [fieldDefinitions]);
  const [draft, setDraft] = useState<Record<string, string>>(() =>
    Object.fromEntries(initialKeys.map((k) => {
      const raw = String(entry.data[k] ?? "");
      if (DATE_KEY_RE.test(k) || ISO_DATE_RE.test(raw)) return [k, raw];
      const cleaned = stripIcons(raw);
      return [k, HOURS_KEY_RE.test(k) ? normalizeHours(cleaned) : cleaned];
    })),
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setBusy(true);
    setError(null);
    const data: Record<string, unknown> = {};
    for (const k of initialKeys) {
      const v = draft[k] ?? "";
      if (DATE_KEY_RE.test(k) && /^\d{4}-\d{2}-\d{2}$/.test(v)) {
        data[k] = `${v}T00:00:00.000Z`;
      } else {
        data[k] = v;
      }
    }
    try {
      if (isNew) {
        await api(`/api/v1/entries/${slug}`, {
          method: "POST",
          body: JSON.stringify({ data }),
        });
      } else {
        await api(`/api/v1/entries/${slug}/${entry.id}`, {
          method: "PATCH",
          body: JSON.stringify({ data, changeSummary: "manual edit" }),
        });
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
      setBusy(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Edit entry"
      className="fixed inset-0 z-50 grid place-items-center bg-black/30 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card w-full max-w-2xl max-h-[88vh] flex flex-col animate-scale-in"
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-apple-separator-light">
          <div className="min-w-0 flex-1 mr-3">
            <div className="text-[15px] font-semibold text-apple-text">{isNew ? "New entry" : "Edit entry"}</div>
            {!isNew && (
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(entry.id)}
                className="text-[11px] text-apple-tertiary mt-0.5 font-mono truncate block max-w-full hover:text-apple-secondary transition-colors"
                title="Click to copy ID"
              >
                {entry.id.slice(0, 8)}...
              </button>
            )}
          </div>
          <button onClick={onClose} className="btn-ghost !px-2 !py-1.5 shrink-0" aria-label="Close">
            <Icon name="close" size={15} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {(() => {
            const elements: React.ReactNode[] = [];
            let i = 0;

            const isShortField = (key: string) => {
              return !!selectOptions?.[key];
            };

            const renderField = (key: string) => {
              const val = draft[key] ?? "";
              const opts = selectOptions?.[key];
              const isHours = HOURS_KEY_RE.test(key);
              const isLong = !opts && (isHours || val.length > 80 || val.includes("\n"));
              const isAr = ARABIC_RE.test(val);

              return (
                <div key={key}>
                  <label className="label">{getLabel(key)}</label>
                  {opts ? (
                    <select
                      className="input-apple cursor-pointer"
                      value={val}
                      onChange={(ev) => setDraft({ ...draft, [key]: ev.target.value })}
                    >
                      {!opts.includes(val) && <option value={val}>{val || "Select..."}</option>}
                      {opts.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  ) : isLong ? (
                    <CollapsibleTextarea
                      value={val}
                      onChange={(v) => setDraft({ ...draft, [key]: v })}
                      isAr={isAr}
                      label={getLabel(key)}
                    />
                  ) : (
                    <input
                      type="text"
                      dir={isAr ? "rtl" : "ltr"}
                      className={`input-apple ${isAr ? "font-arabic text-right" : "text-left"}`}
                      value={val}
                      onChange={(ev) => setDraft({ ...draft, [key]: ev.target.value })}
                    />
                  )}
                </div>
              );
            };

            let prevFieldType: string | null = null;

            while (i < initialKeys.length) {
              const k = initialKeys[i]!;
              const v = draft[k] ?? "";
              const isDate = DATE_KEY_RE.test(k) || ISO_DATE_RE.test(v);
              const isShort = !isDate && isShortField(k);
              const curFieldType = isDate ? "date" : (isShort ? "short" : "long");

              if (prevFieldType && prevFieldType !== curFieldType) {
                elements.push(
                  <div key={`sep-${i}`} className="border-t border-apple-separator-light" />,
                );
              }

              if (isDate) {
                const dateGroup: string[] = [k];
                while (i + 1 < initialKeys.length) {
                  const nk = initialKeys[i + 1]!;
                  const nv = draft[nk] ?? "";
                  if (DATE_KEY_RE.test(nk) || ISO_DATE_RE.test(nv)) {
                    dateGroup.push(nk);
                    i++;
                  } else break;
                }
                elements.push(
                  <div key={`dates-${dateGroup.join("-")}`} className="grid grid-cols-2 gap-3">
                    {dateGroup.map((dk) => (
                      <div key={dk}>
                        <label className="label">{getLabel(dk)}</label>
                        <DatePicker
                          value={toDateInput(draft[dk] ?? "")}
                          onChange={(val) => setDraft({ ...draft, [dk]: val })}
                        />
                      </div>
                    ))}
                  </div>,
                );
              } else if (isShort) {
                const shortGroup: string[] = [k];
                while (i + 1 < initialKeys.length) {
                  const nk = initialKeys[i + 1]!;
                  if (isShortField(nk)) {
                    shortGroup.push(nk);
                    i++;
                  } else break;
                }
                if (shortGroup.length >= 2) {
                  for (let j = 0; j < shortGroup.length; j += 2) {
                    if (j + 1 < shortGroup.length) {
                      elements.push(
                        <div key={`pair-${shortGroup[j]}-${shortGroup[j + 1]}`} className="grid grid-cols-2 gap-3">
                          {renderField(shortGroup[j]!)}
                          {renderField(shortGroup[j + 1]!)}
                        </div>,
                      );
                    } else {
                      elements.push(renderField(shortGroup[j]!));
                    }
                  }
                } else {
                  elements.push(renderField(k));
                }
              } else {
                elements.push(renderField(k));
              }

              prevFieldType = curFieldType;
              i++;
            }
            return elements;
          })()}
        </div>

        <div className="flex items-center justify-between px-5 py-3.5 border-t border-apple-separator-light">
          <div className="flex items-center gap-3">
            {!isNew && (
              <button
                onClick={() => { onDelete(); onClose(); }}
                className="btn-ghost !px-3 !py-2 !text-[13px] text-apple-red hover:!bg-red-50"
                disabled={busy}
                title="Delete entry"
              >
                <Icon name="trash" size={14} />
                Delete
              </button>
            )}
            {error && <div className="text-[12px] text-apple-red">{error}</div>}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="btn-secondary" disabled={busy}>
              Cancel
            </button>
            <button onClick={save} className="btn-primary" disabled={busy}>
              {busy ? (
                <Icon name="refresh" size={15} className="animate-spin" />
              ) : (
                <Icon name="check" size={15} />
              )}
              {busy ? "Saving…" : isNew ? "Create entry" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlaBadge({ hours }: { hours: number | null }) {
  if (hours == null) return null;
  const urgency = slaUrgency(hours);
  const label =
    hours < 1
      ? `SLA ${Math.round(hours * 60)} min`
      : `SLA ${Number.isInteger(hours) ? hours : hours.toFixed(1)}h`;
  const cls = {
    urgent: "badge-red",
    high: "bg-amber-50 text-amber-700 border border-amber-200",
    normal: "badge-blue",
    low: "badge-gray",
    none: "badge-gray",
  }[urgency];
  return <span className={`badge ${cls}`}>{label}</span>;
}

function EscalationRuleCard({
  entry,
  onEdit,
  onDelete,
}: {
  entry: Entry;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const d = entry.data as Record<string, unknown>;
  const parsed = parseTrigger(String(d.trigger ?? ""));
  const channel = String(d.channel ?? "");
  const muted = !hasEscalationTarget(parsed);

  return (
    <article
      className={`card p-5 hover:shadow-apple transition-shadow ${muted ? "opacity-75" : ""}`}
    >
      <header className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <h2 className="text-[15px] font-semibold tracking-tight text-apple-text line-clamp-2">
            {parsed.category || "(untitled rule)"}
          </h2>
          <div className="mt-1 flex items-center gap-1.5 flex-wrap">
            {channel && (
              <span className="badge badge-gray capitalize">
                {channel.replace(/_/g, " ")}
              </span>
            )}
            <span className={`badge ${badgeFor(entry.status)}`}>{entry.status}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onEdit}
            className="btn-ghost !px-2 !py-1 !text-[12px]"
            aria-label="Edit rule"
            title="Edit"
          >
            <Icon name="pencil" size={12} /> Edit
          </button>
          <button
            onClick={onDelete}
            className="btn-ghost !px-2 !py-1 !text-[12px] text-apple-red hover:!bg-red-50"
            aria-label="Delete rule"
            title="Delete"
          >
            <Icon name="trash" size={12} />
          </button>
        </div>
      </header>

      {(parsed.keywords || parsed.escalationTarget || parsed.autoResponse) && (
        <div className="mt-3.5 grid gap-x-6 gap-y-2.5 grid-cols-1 sm:grid-cols-2">
          {parsed.keywords && (
            <div className="sm:col-span-2">
              <div className="text-[11px] uppercase tracking-[0.06em] font-medium text-apple-tertiary mb-1">
                Keywords
              </div>
              <div className="flex flex-wrap gap-1">
                {parsed.keywords
                  .split(/,\s*/)
                  .filter(Boolean)
                  .map((k) => (
                    <span
                      key={k}
                      className="px-2 py-0.5 rounded-full bg-apple-separator-light text-[11px] text-apple-secondary"
                    >
                      {k}
                    </span>
                  ))}
              </div>
            </div>
          )}
          {parsed.autoResponse && (
            <div className="sm:col-span-2">
              <div className="text-[11px] uppercase tracking-[0.06em] font-medium text-apple-tertiary mb-0.5">
                AI agent behavior
              </div>
              <div className="text-[13px] text-apple-text italic line-clamp-3 whitespace-pre-line">
                {parsed.autoResponse}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function EscalationRuleEditModal({
  slug,
  entry,
  isNew,
  channelOptions,
  onClose,
  onSaved,
  onDelete,
}: {
  slug: string;
  entry: Entry;
  isNew?: boolean;
  channelOptions: string[];
  onClose: () => void;
  onSaved: () => void;
  onDelete: () => void;
}) {
  const [form, setForm] = useState(() => {
    const d = entry.data as Record<string, unknown>;
    const initial = parseTrigger(String(d.trigger ?? ""));
    return {
      category: initial.category,
      keywords: initial.keywords,
      escalationTarget: initial.escalationTarget,
      slaHours: initial.slaHours == null ? "" : String(initial.slaHours),
      autoResponse: initial.autoResponse,
      channel: String(d.channel ?? "human_chat"),
      webhook_url: String(d.webhook_url ?? ""),
    };
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setBusy(true);
    setError(null);
    const slaNum = form.slaHours.trim() === "" ? null : Number(form.slaHours);
    const trigger = serializeTrigger({
      category: form.category,
      keywords: form.keywords,
      escalationTarget: form.escalationTarget,
      slaHours: Number.isFinite(slaNum) ? (slaNum as number) : null,
      autoResponse: form.autoResponse,
    });
    const data = {
      trigger,
      channel: form.channel,
      webhook_url: form.webhook_url,
    };
    try {
      if (isNew) {
        await api(`/api/v1/entries/${slug}`, {
          method: "POST",
          body: JSON.stringify({ data }),
        });
      } else {
        await api(`/api/v1/entries/${slug}/${entry.id}`, {
          method: "PATCH",
          body: JSON.stringify({ data, changeSummary: "manual edit" }),
        });
      }
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
      setBusy(false);
    }
  }

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  const canSave = form.category.trim().length > 0 && !busy;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Edit escalation rule"
      className="fixed inset-0 z-50 grid place-items-center bg-black/30 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card w-full max-w-2xl max-h-[88vh] flex flex-col animate-scale-in"
      >
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-apple-separator-light">
          <div className="min-w-0 flex-1 mr-3">
            <div className="text-[15px] font-semibold text-apple-text">
              {isNew ? "New escalation rule" : "Edit escalation rule"}
            </div>
            {!isNew && entry.id && (
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(entry.id)}
                className="text-[11px] text-apple-tertiary mt-0.5 font-mono truncate block max-w-full hover:text-apple-secondary transition-colors"
                title="Click to copy ID"
              >
                {entry.id.slice(0, 8)}...
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="btn-ghost !px-2 !py-1.5 shrink-0"
            aria-label="Close"
          >
            <Icon name="close" size={15} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <div>
            <label className="label">Category</label>
            <input
              type="text"
              className="input-apple"
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              placeholder="e.g. Complaint, Lost Child, Refund Request"
            />
          </div>
          <div>
            <label className="label">Keywords</label>
            <input
              type="text"
              className="input-apple"
              value={form.keywords}
              onChange={(e) => set("keywords", e.target.value)}
              placeholder="comma separated"
            />
          </div>
          <div className="text-[13px] text-apple-secondary">
            All rules escalate to <span className="font-medium text-apple-text">CS Team</span>
          </div>
          <div>
            <label className="label">AI agent behavior</label>
            <CollapsibleTextarea
              value={form.autoResponse}
              onChange={(v) => set("autoResponse", v)}
              isAr={false}
              label="auto response"
            />
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-3.5 border-t border-apple-separator-light">
          <div className="flex items-center gap-3">
            {!isNew && (
              <button
                onClick={() => {
                  onDelete();
                  onClose();
                }}
                className="btn-ghost !px-3 !py-2 !text-[13px] text-apple-red hover:!bg-red-50"
                disabled={busy}
                title="Delete rule"
              >
                <Icon name="trash" size={14} />
                Delete
              </button>
            )}
            {error && <div className="text-[12px] text-apple-red">{error}</div>}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="btn-secondary" disabled={busy}>
              Cancel
            </button>
            <button onClick={save} className="btn-primary" disabled={!canSave}>
              {busy ? (
                <Icon name="refresh" size={15} className="animate-spin" />
              ) : (
                <Icon name="check" size={15} />
              )}
              {busy ? "Saving…" : isNew ? "Create rule" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
