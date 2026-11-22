import { aiController } from "@/controllers/ai.controller";
import { Router } from "express";

const router = Router();

router.post("/chat", aiController.chat);

export default router;
