import type { FastifyPluginAsync } from "fastify";

const routes: FastifyPluginAsync = async (app) => {
  app.addHook("onRequest", app.authenticate);

  app.get("/", async (req) => {
    const mods = await req.withTenant((tx) =>
      tx.module.findMany({ where: { isActive: true }, orderBy: { label: "asc" } }),
    );
    return { success: true, data: mods };
  });

  app.get("/with-counts", async (req) => {
    const mods = await req.withTenant((tx) =>
      tx.module.findMany({
        where: { isActive: true },
        select: {
          id: true,
          slug: true,
          label: true,
          icon: true,
          _count: { select: { entries: true } },
        },
        orderBy: { createdAt: "asc" },
      }),
    );
    return {
      success: true,
      data: mods.map((m) => ({
        id: m.id,
        slug: m.slug,
        label: m.label,
        icon: m.icon,
        entryCount: m._count.entries,
      })),
    };
  });
};

export default routes;
