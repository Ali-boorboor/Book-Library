import type { Request, Response } from "express";
import { aiService } from "@/services/ai.service";

export class AiController {
  chat = async (req: Request, res: Response): Promise<void> => {
    const result = await aiService.chat(req.body);

    res.json(result);
  };
}

export const aiController = new AiController();
