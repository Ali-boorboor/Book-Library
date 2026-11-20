import { Button } from "antd";
import { RobotOutlined } from "@ant-design/icons";

interface AiChatButtonProps {
  onClick: () => void;
}

export function AiChatButton({ onClick }: AiChatButtonProps) {
  return (
    <Button
      type="primary"
      shape="circle"
      size="large"
      icon={<RobotOutlined />}
      onClick={onClick}
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        width: 52,
        height: 52,
        zIndex: 999,
        boxShadow: "0 10px 24px rgba(91, 91, 214, 0.28)",
      }}
    />
  );
}
