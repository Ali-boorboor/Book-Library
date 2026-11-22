import type { AiChatRequest, AiChatResponse } from "@/types/ai";

const API_URL = "http://localhost:8080/api/ai";

export const aiService = {
  async chat(data: AiChatRequest): Promise<AiChatResponse> {
    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);

      throw new Error(error?.message ?? "Failed to communicate with AI");
    }

    return response.json() as Promise<AiChatResponse>;
  },
};
