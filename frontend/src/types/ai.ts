export interface AiChatRequest {
  message: string;
}

export interface AiChatResponse {
  message: string;
}

export type AiMessageRole = "user" | "assistant";

export interface AiMessage {
  id: number;
  role: AiMessageRole;
  content: string;
}
