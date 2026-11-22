import { useState } from "react";
import { Flex, message } from "antd";
import { AiChatInput } from "./ai-chat-input";
import { AiChatHeader } from "./ai-chat-header";
import { AiChatMessage } from "./ai-chat-message";
import { aiService } from "@/services/ai.service";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hi! I'm your book library assistant. I can help you search, manage, and learn more about your books.",
  },
];

interface AiChatProps {
  onClose: () => void;
}

export function AiChat({ onClose }: AiChatProps) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const value = input.trim();

    if (!value || loading) {
      return;
    }

    setInput("");

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        role: "user",
        content: value,
      },
    ]);

    try {
      setLoading(true);

      const response = await aiService.chat({
        message: value,
      });

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: response.message,
        },
      ]);
    } catch (error) {
      message.error(
        error instanceof Error
          ? error.message
          : "Failed to communicate with AI",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      vertical
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        width: 380,
        height: 560,
        zIndex: 1000,
        overflow: "hidden",
        border: "1px solid #E8EBF2",
        borderRadius: 20,
        background: "#FFFFFF",
        boxShadow: "0 24px 70px rgba(15, 23, 42, 0.16)",
      }}
    >
      <AiChatHeader onClose={onClose} />

      <Flex
        vertical
        gap={16}
        flex={1}
        style={{
          padding: 20,
          overflowY: "auto",
          background: "#F8F9FC",
        }}
      >
        {messages.map((message) => (
          <AiChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}
      </Flex>

      <AiChatInput value={input} onChange={setInput} onSend={handleSend} />
    </Flex>
  );
}
