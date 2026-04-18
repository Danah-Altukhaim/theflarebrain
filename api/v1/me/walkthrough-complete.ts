import type { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "../../_db";
import { authenticate } from "../../_auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ success: false, error: { message: "Method not allowed" } });

  const auth = await authenticate(req.headers.authorization as string);
  if (!auth) return res.status(401).json({ success: false, error: { message: "Unauthorized" } });

  await prisma.user.update({
    where: { id: auth.userId },
    data: { walkthroughCompleted: true },
  });

  return res.json({ success: true, data: { walkthroughCompleted: true } });
}
