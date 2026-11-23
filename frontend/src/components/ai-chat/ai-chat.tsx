import { useState } from "react";
import { Flex, message } from "antd";

import { aiService } from "@/services/ai.service";

import { AiChatInput } from "./ai-chat-input";
import { AiChatHeader } from "./ai-chat-header";
import { AiChatMessage } from "./ai-chat-message";

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

    const userMessageId = Date.now();
    const thinkingMessageId = userMessageId + 1;

    setMessages((current) => [
      ...current,
      {
        id: userMessageId,
        role: "user",
        content: value,
      },
      {
        id: thinkingMessageId,
        role: "assistant",
        content: "Thinking...",
      },
    ]);

    try {
      setLoading(true);

      const response = await aiService.chat({
        message: value,
      });

      setMessages((current) => [
        ...current.filter((message) => message.id !== thinkingMessageId),
        {
          id: Date.now(),
          role: "assistant",
          content: response.message,
        },
      ]);
    } catch (error) {
      setMessages((current) =>
        current.filter((message) => message.id !== thinkingMessageId),
      );

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
    <>
      <style>
        {`
          @keyframes ai-thinking-fade {
            0%,
            100% {
              opacity: 0.35;
            }

            50% {
              opacity: 1;
            }
          }
        `}
      </style>

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
          {messages.map((chatMessage) => {
            const isThinking =
              chatMessage.id === messages[messages.length - 1]?.id &&
              chatMessage.content === "Thinking...";

            return (
              <div
                key={chatMessage.id}
                style={
                  isThinking
                    ? {
                        animation: "ai-thinking-fade 1.4s ease-in-out infinite",
                      }
                    : undefined
                }
              >
                <AiChatMessage
                  role={chatMessage.role}
                  content={chatMessage.content}
                />
              </div>
            );
          })}
        </Flex>

        <AiChatInput value={input} onChange={setInput} onSend={handleSend} />
      </Flex>
    </>
  );
}
