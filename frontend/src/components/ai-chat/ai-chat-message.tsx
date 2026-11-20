import { Avatar, Flex, Typography } from "antd";
import { RobotOutlined, UserOutlined } from "@ant-design/icons";

interface AiChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export function AiChatMessage({ role, content }: AiChatMessageProps) {
  const isUser = role === "user";

  return (
    <Flex
      gap={10}
      justify={isUser ? "flex-end" : "flex-start"}
      align="flex-start"
    >
      {!isUser && (
        <Avatar
          size={32}
          icon={<RobotOutlined />}
          style={{
            background: "#EEEEFF",
            color: "#5B5BD6",
          }}
        />
      )}

      <Typography.Paragraph
        style={{
          maxWidth: "78%",
          margin: 0,
          padding: "10px 14px",
          borderRadius: 14,
          background: isUser ? "#5B5BD6" : "#FFFFFF",
          color: isUser ? "#FFFFFF" : "#334155",
          boxShadow: isUser ? "none" : "0 2px 8px rgba(15, 23, 42, 0.05)",
        }}
      >
        {content}
      </Typography.Paragraph>

      {isUser && (
        <Avatar
          size={32}
          icon={<UserOutlined />}
          style={{
            background: "#E8EBF2",
            color: "#64748B",
          }}
        />
      )}
    </Flex>
  );
}
