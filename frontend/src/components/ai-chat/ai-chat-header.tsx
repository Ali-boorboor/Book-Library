import { Button, Flex, Typography } from "antd";
import { RobotOutlined } from "@ant-design/icons";
import { CloseOutlined } from "@ant-design/icons";

interface AiChatHeaderProps {
  onClose: () => void;
}

export function AiChatHeader({ onClose }: AiChatHeaderProps) {
  return (
    <Flex
      align="center"
      justify="space-between"
      style={{
        padding: "16px 18px",
        borderBottom: "1px solid #E8EBF2",
        background: "#FFFFFF",
      }}
    >
      <Flex align="center" gap={12}>
        <Flex
          align="center"
          justify="center"
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            background: "#EEEEFF",
            color: "#5B5BD6",
          }}
        >
          <RobotOutlined />
        </Flex>

        <Flex vertical gap={2}>
          <Typography.Text strong>Library Assistant</Typography.Text>

          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            AI assistant
          </Typography.Text>
        </Flex>
      </Flex>

      <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
    </Flex>
  );
}
