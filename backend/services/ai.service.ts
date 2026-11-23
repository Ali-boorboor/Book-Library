import { OpenRouter } from "@openrouter/sdk";

import type { AiChatRequest, AiChatResponse } from "@/types/ai";

import { AppError } from "@/utils/app-error";

// const MODEL = "google/gemma-4-31b-it:free";
const MODEL = "openrouter/free";

const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export class AiService {
  async chat(data: AiChatRequest): Promise<AiChatResponse> {
    if (!data.message?.trim()) {
      throw new AppError(400, "Message is required");
    }

    if (!process.env.OPENROUTER_API_KEY) {
      throw new AppError(500, "OPENROUTER_API_KEY is not configured");
    }

    try {
      const response = await openRouter.chat.send({
        chatRequest: {
          model: MODEL,

          messages: [
            {
              role: "system",
              content:
                "You are a helpful AI assistant for a book library application. Help users search and manage books and answer their questions clearly.",
            },
            {
              role: "user",
              content: data.message,
            },
          ],

          reasoning: {
            enabled: true,
          },

          stream: false,
        },
      });

      if (response instanceof ReadableStream) {
        throw new AppError(502, "Unexpected streaming response");
      }

      const content = response.choices[0]?.message?.content;

      if (!content) {
        throw new AppError(502, "AI returned an empty response");
      }

      const message =
        typeof content === "string"
          ? content
          : content.map((item) => ("text" in item ? item.text : "")).join("");

      if (!message) {
        throw new AppError(502, "AI returned an empty response");
      }

      return {
        message,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      console.error("OpenRouter error:", error);

      throw new AppError(502, "AI service is currently unavailable");
    }
  }
}

export const aiService = new AiService();
