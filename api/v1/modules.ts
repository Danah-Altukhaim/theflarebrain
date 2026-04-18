import type { VercelRequest, VercelResponse } from "@vercel/node";
import { authenticate } from "../_auth.js";
import { withTenant } from "../_db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET")
    return res.status(405).json({ success: false, error: { message: "Method not allowed" } });

  const auth = await authenticate(req.headers.authorization as string);
  if (!auth) return res.status(401).json({ success: false, error: { message: "Unauthorized" } });

  const modules = await withTenant(
    auth.tenantId,
    async (tx: any) => {
      return tx.module.findMany({
        where: { isActive: true },
        select: { id: true, slug: true, label: true, icon: true },
        orderBy: { createdAt: "asc" },
      });
    },
    auth.isAdmin,
  );

  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
  return res.json({ success: true, data: modules });
}
