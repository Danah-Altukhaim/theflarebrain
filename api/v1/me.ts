import type { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "../_db";
import { authenticate } from "../_auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return res.status(405).json({ success: false, error: { message: "Method not allowed" } });

  const auth = await authenticate(req.headers.authorization as string);
  if (!auth) return res.status(401).json({ success: false, error: { message: "Unauthorized" } });

  const user = await prisma.user.findUnique({
    where: { id: auth.userId },
    select: { id: true, email: true, name: true, role: true, walkthroughCompleted: true },
  });

  return res.json({ success: true, data: user });
}
