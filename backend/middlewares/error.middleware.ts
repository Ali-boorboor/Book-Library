import type { ErrorRequestHandler } from "express";
import { AppError } from "@/utils/app-error";
import { logger } from "@/utils/logger";

export const errorMiddleware: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next,
) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
    });

    return;
  }

  logger(error, "Error");

  res.status(500).json({
    message: "Internal server error",
  });
};
