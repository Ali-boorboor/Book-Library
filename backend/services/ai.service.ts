import type { AiChatRequest, AiChatResponse } from "@/types/ai";
import { AppError } from "@/utils/app-error";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const MODEL = "google/gemma-4-31b-it:free";

export class AiService {
  async chat(data: AiChatRequest): Promise<AiChatResponse> {
    if (!data.message?.trim()) {
      throw new AppError(400, "Message is required");
    }

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
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
      }),
    });

    if (!response.ok) {
      const error = await response.text();

      console.error("OpenRouter error:", error);

      throw new AppError(502, "AI service is currently unavailable");
    }

    const result = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const message = result.choices?.[0]?.message?.content;

    if (!message) {
      throw new AppError(502, "AI returned an empty response");
    }

    return {
      message,
    };
  }
}

export const aiService = new AiService();
