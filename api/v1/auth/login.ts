import type { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "../../_db.js";
import { signJwt } from "../../_auth.js";
import bcrypt from "bcryptjs";

const DUMMY_HASH = "$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ012";

const DEMO = {
  tenantSlug: "flare-fitness",
  tenantName: "Flare Fitness",
  timezone: "Asia/Kuwait",
  email: "bayan@example.com",
  name: "Bayan (Editor)",
  role: "CLIENT_EDITOR" as const,
  password: "password1",
};

// Upsert the public demo tenant+user so the "Enter demo" button works on a
// prod DB that hasn't been seeded with bayan@example.com (or has drifted).
// Only runs when the caller provides the exact hardcoded demo credentials.
async function ensureDemoUser() {
  const passwordHash = await bcrypt.hash(DEMO.password, 10);
  await prisma.$transaction(async (tx: any) => {
    await tx.$executeRawUnsafe(`SET LOCAL app.is_admin = 'true'`);
    const tenant = await tx.tenant.upsert({
      where: { slug: DEMO.tenantSlug },
      create: { slug: DEMO.tenantSlug, name: DEMO.tenantName, timezone: DEMO.timezone },
      update: {},
    });
    await tx.user.upsert({
      where: { tenantId_email: { tenantId: tenant.id, email: DEMO.email } },
      create: {
        tenantId: tenant.id,
        email: DEMO.email,
        name: DEMO.name,
        role: DEMO.role,
        passwordHash,
        walkthroughCompleted: true,
      },
      update: { passwordHash, walkthroughCompleted: true },
    });
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ success: false, error: { message: "Method not allowed" } });

  const { tenantSlug, email, password } = req.body ?? {};
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, error: { message: "Email and password required" } });

  if (tenantSlug === DEMO.tenantSlug && email === DEMO.email && password === DEMO.password) {
    try {
      await ensureDemoUser();
    } catch (err) {
      console.error("demo self-heal failed", err);
    }
  }

  const auth = await prisma.$transaction(async (tx: any) => {
    await tx.$executeRawUnsafe(`SET LOCAL app.is_admin = 'true'`);
    const tenant = await tx.tenant.findUnique({ where: { slug: tenantSlug } });
    if (!tenant) return null;
    const user = await tx.user.findUnique({
      where: { tenantId_email: { tenantId: tenant.id, email } },
    });
    if (!user) return null;
    return { tenant, user };
  });

  const ok = await bcrypt.compare(password, auth?.user?.passwordHash ?? DUMMY_HASH);
  if (!auth || !ok)
    return res.status(401).json({ success: false, error: { message: "Invalid credentials" } });

  const { tenant, user } = auth;
  const token = signJwt({ sub: user.id, tenantId: tenant.id, role: user.role });

  const isDemoAccount = tenant.slug === "flare-fitness" && user.email === "bayan@example.com";
  const walkthroughCompleted = isDemoAccount ? true : user.walkthroughCompleted;

  await prisma.$transaction(async (tx: any) => {
    await tx.$executeRaw`SELECT set_config('app.tenant_id', ${tenant.id}, true)`;
    await tx.user.update({
      where: { id: user.id },
      data: isDemoAccount
        ? { lastLogin: new Date(), walkthroughCompleted: true }
        : { lastLogin: new Date() },
    });
  });

  return res.json({
    success: true,
    data: {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        walkthroughCompleted,
      },
      tenant: { id: tenant.id, slug: tenant.slug, name: tenant.name },
    },
  });
}
