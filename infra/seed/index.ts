/**
 * Seed dev fixtures: two tenants (Future Kid + test-co), canonical modules, sample entries,
 * an API key per tenant, and one crafted "bad KB" row for gap-scan tests.
 *
 * The `future-kid` tenant is seeded from the static snapshot at `api/_fixtures.ts`
 * so local Postgres ends up with the same content that the Vercel demo serves.
 * The `test-co` tenant stays intentionally minimal (a handful of hand-rolled rows)
 * so tenant-isolation checks and gap-scan tests have a small, predictable dataset.
 *
 * Run: `pnpm seed`
 */
import bcrypt from "bcrypt";
import { randomBytes, createHash } from "node:crypto";
import { PrismaClient } from "@prisma/client";
import type { FieldDefinition } from "@brain/shared";
import { MODULES, ENTRIES_BY_SLUG } from "../../api/_fixtures";

const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_MIGRATE_URL ?? process.env.DATABASE_URL! } },
});

type EntryStatus = "draft" | "scheduled" | "active" | "expired" | "archived";

async function upsertTenantUsers(tenantId: string) {
  const editor = await prisma.user.upsert({
    where: { tenantId_email: { tenantId, email: "sara@example.com" } },
    create: {
      tenantId,
      email: "sara@example.com",
      name: "Sara (Editor)",
      role: "CLIENT_EDITOR",
      passwordHash: await bcrypt.hash("password1", 10),
    },
    update: {},
  });
  const admin = await prisma.user.upsert({
    where: { tenantId_email: { tenantId, email: "admin@pairai.com" } },
    create: {
      tenantId,
      email: "admin@pairai.com",
      name: "PAIR Admin",
      role: "PAIR_ADMIN",
      passwordHash: await bcrypt.hash("password1", 10),
    },
    update: {},
  });
  return { editor, admin };
}

async function issueApiKey(tenantId: string, slug: string) {
  const raw = `tb_live_${randomBytes(24).toString("hex")}`;
  const hash = createHash("sha256").update(raw).digest("hex");
  await prisma.apiKey.upsert({
    where: { keyHash: hash },
    create: {
      tenantId,
      keyHash: hash,
      keyPrefix: raw.slice(0, 12),
      label: "Seed bot key",
      scopes: ["read:kb", "write:analytics"],
    },
    update: {},
  });
  console.log(`Seeded ${slug}: api_key = ${raw}`);
}

async function seedFutureKid() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: "future-kid" },
    create: { slug: "future-kid", name: "Future Kid", timezone: "Asia/Kuwait" },
    update: {},
  });
  const { editor } = await upsertTenantUsers(tenant.id);

  const moduleIdBySlug = new Map<string, string>();
  for (const mod of MODULES) {
    const row = await prisma.module.upsert({
      where: { tenantId_slug: { tenantId: tenant.id, slug: mod.slug } },
      create: {
        tenantId: tenant.id,
        slug: mod.slug,
        label: mod.label,
        icon: mod.icon ?? null,
        fieldDefinitions: mod.fieldDefinitions as unknown as object,
      },
      update: {
        label: mod.label,
        icon: mod.icon ?? null,
        fieldDefinitions: mod.fieldDefinitions as unknown as object,
      },
    });
    moduleIdBySlug.set(mod.slug, row.id);
  }

  let entryCount = 0;
  for (const [slug, entries] of Object.entries(ENTRIES_BY_SLUG)) {
    const moduleId = moduleIdBySlug.get(slug);
    if (!moduleId) {
      console.warn(`Skipping ${entries.length} entries: no module for slug "${slug}"`);
      continue;
    }
    for (const entry of entries) {
      await prisma.entry.upsert({
        where: {
          tenantId_moduleId_externalId: {
            tenantId: tenant.id,
            moduleId,
            externalId: entry.id,
          },
        },
        create: {
          tenantId: tenant.id,
          moduleId,
          externalId: entry.id,
          createdBy: editor.id,
          status: entry.status as EntryStatus,
          data: entry.data as object,
        },
        update: {
          data: entry.data as object,
          status: entry.status as EntryStatus,
        },
      });
      entryCount++;
    }
  }

  // Gap-scan sentinel: one FAQ with missing Arabic, kept intentionally incomplete
  // so translation_gap suggestions have something to flag regardless of fixtures.
  const faqsModuleId = moduleIdBySlug.get("faqs");
  if (faqsModuleId) {
    await prisma.entry.upsert({
      where: {
        tenantId_moduleId_externalId: {
          tenantId: tenant.id,
          moduleId: faqsModuleId,
          externalId: "refund-policy",
        },
      },
      create: {
        tenantId: tenant.id,
        moduleId: faqsModuleId,
        externalId: "refund-policy",
        createdBy: editor.id,
        status: "active",
        data: {
          question_en: "What's your refund policy?",
          answer_en: "Full refunds within 14 days with receipt.",
        },
      },
      update: {},
    });
  }

  await issueApiKey(tenant.id, "future-kid");
  console.log(`Seeded future-kid: ${MODULES.length} modules, ${entryCount} entries (+1 gap-scan sentinel)`);
}

async function seedTestCo() {
  const tenant = await prisma.tenant.upsert({
    where: { slug: "test-co" },
    create: { slug: "test-co", name: "Test Co", timezone: "Asia/Kuwait" },
    update: {},
  });
  const { editor } = await upsertTenantUsers(tenant.id);

  const branchFields: FieldDefinition[] = [
    { key: "name", label: "Name", type: "text", required: true, localized: true },
    { key: "governorate", label: "Governorate", type: "select", required: true, localized: false,
      options: ["Hawalli", "Jahra", "Ahmadi", "Farwaniya", "Al-Asimah"] },
    { key: "status", label: "Status", type: "select", required: true, localized: false,
      options: ["Active", "CLOSED", "Temp Closed"] },
    { key: "google_maps_url", label: "Maps", type: "url", required: false, localized: false },
    { key: "hours_regular", label: "Hours (regular)", type: "textarea", required: true, localized: false },
  ];
  const promoFields: FieldDefinition[] = [
    { key: "name", label: "Name", type: "text", required: true, localized: false },
    { key: "type", label: "Type", type: "select", required: true, localized: false,
      options: ["Promo", "Seasonal", "Bank", "Update", "Ops"] },
    { key: "message", label: "Customer message", type: "textarea", required: true, localized: true },
    { key: "start_date", label: "Start", type: "date", required: false, localized: false },
    { key: "end_date", label: "End", type: "date", required: false, localized: false },
  ];
  const faqFields: FieldDefinition[] = [
    { key: "question", label: "Question", type: "text", required: true, localized: true },
    { key: "answer", label: "Answer", type: "textarea", required: true, localized: true },
  ];

  const [branches, promos, faqs] = await Promise.all([
    prisma.module.upsert({
      where: { tenantId_slug: { tenantId: tenant.id, slug: "branches" } },
      create: { tenantId: tenant.id, slug: "branches", label: "Branches", icon: "map-pin", fieldDefinitions: branchFields as object },
      update: { fieldDefinitions: branchFields as object },
    }),
    prisma.module.upsert({
      where: { tenantId_slug: { tenantId: tenant.id, slug: "promotions" } },
      create: { tenantId: tenant.id, slug: "promotions", label: "Promotions", icon: "tag", fieldDefinitions: promoFields as object },
      update: { fieldDefinitions: promoFields as object },
    }),
    prisma.module.upsert({
      where: { tenantId_slug: { tenantId: tenant.id, slug: "faqs" } },
      create: { tenantId: tenant.id, slug: "faqs", label: "FAQs", icon: "help-circle", fieldDefinitions: faqFields as object },
      update: { fieldDefinitions: faqFields as object },
    }),
  ]);

  await prisma.entry.upsert({
    where: { tenantId_moduleId_externalId: { tenantId: tenant.id, moduleId: branches.id, externalId: "salmiya" } },
    create: {
      tenantId: tenant.id,
      moduleId: branches.id,
      externalId: "salmiya",
      createdBy: editor.id,
      status: "active",
      data: {
        name_en: "Souq Salmiya Mall",
        name_ar: "سوق السالمية",
        governorate: "Hawalli",
        status: "Active",
        google_maps_url: "https://maps.example/salmiya",
        hours_regular: "Sun-Thu 10:00-22:00; Fri-Sat 10:00-23:00",
      },
    },
    update: {},
  });

  await prisma.entry.upsert({
    where: { tenantId_moduleId_externalId: { tenantId: tenant.id, moduleId: promos.id, externalId: "nbk-summer" } },
    create: {
      tenantId: tenant.id,
      moduleId: promos.id,
      externalId: "nbk-summer",
      createdBy: editor.id,
      status: "active",
      data: {
        name: "NBK Summer Promo",
        type: "Bank",
        message_en: "30% off rides with NBK cards this July!",
        message_ar: "خصم 30% على الألعاب عند الدفع ببطاقة NBK خلال يوليو",
        start_date: "2026-07-01T00:00:00.000Z",
        end_date: "2026-07-31T23:59:59.000Z",
      },
    },
    update: {},
  });

  // Gap-scan sentinel for test-co as well: intentionally missing Arabic.
  await prisma.entry.upsert({
    where: { tenantId_moduleId_externalId: { tenantId: tenant.id, moduleId: faqs.id, externalId: "refund-policy" } },
    create: {
      tenantId: tenant.id,
      moduleId: faqs.id,
      externalId: "refund-policy",
      createdBy: editor.id,
      status: "active",
      data: {
        question_en: "What's your refund policy?",
        answer_en: "Full refunds within 14 days with receipt.",
      },
    },
    update: {},
  });

  await issueApiKey(tenant.id, "test-co");
}

async function main() {
  await seedFutureKid();
  await seedTestCo();
  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
