import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { ZodError } from "zod";
import { AppError } from "../lib/errors.js";
import { captureError } from "../lib/sentry.js";

const plugin: FastifyPluginAsync = async (app) => {
  app.setErrorHandler((err, req, reply) => {
    if (err instanceof AppError) {
      return reply.status(err.status).send({
        success: false,
        error: { code: err.code, message: err.message, status: err.status },
      });
    }
    if (err instanceof ZodError) {
      return reply.status(400).send({
        success: false,
        error: { code: "VALIDATION", message: err.message, status: 400 },
      });
    }
    req.log.error({ err }, "unhandled error");
    captureError(err, {
      requestId: req.id,
      route: req.routeOptions?.url,
      method: req.method,
      tenantId: req.tenantId,
    });
    return reply.status(500).send({
      success: false,
      error: { code: "INTERNAL", message: "Internal server error", status: 500 },
    });
  });
};

export default fp(plugin, { name: "error-handler" });
