import cors from "cors";
import express from "express";
import bookRouter from "@/routes/book.route";
import { errorMiddleware } from "@/middlewares/error.middleware";
import { notFoundMiddleware } from "@/middlewares/not-found.middleware";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

app.use("/api/books", bookRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
