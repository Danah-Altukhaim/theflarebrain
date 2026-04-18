import { PrismaClient } from "@prisma/client";

// Singleton Prisma client for Vercel serverless functions.
// Reused across warm invocations.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function withTenant<T>(
  tenantId: string,
  fn: (tx: Parameters<Parameters<PrismaClient["$transaction"]>[0]>[0]) => Promise<T>,
  isAdmin = false,
): Promise<T> {
  return prisma.$transaction(async (tx: any) => {
    if (isAdmin) {
      await tx.$executeRawUnsafe(`SET LOCAL app.is_admin = 'true'`);
    }
    if (tenantId) {
      await tx.$executeRaw`SELECT set_config('app.tenant_id', ${tenantId}, true)`;
    }
    return fn(tx);
  });
}
