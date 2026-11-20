import { Button, Flex, Input } from "antd";
import { SendOutlined } from "@ant-design/icons";

interface AiChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export function AiChatInput({ value, onChange, onSend }: AiChatInputProps) {
  return (
    <Flex
      gap={8}
      align="flex-end"
      style={{
        padding: 14,
        borderTop: "1px solid #E8EBF2",
        background: "#FFFFFF",
      }}
    >
      <Input.TextArea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onPressEnter={(event) => {
          if (!event.shiftKey) {
            event.preventDefault();
            onSend();
          }
        }}
        placeholder="Ask about your books..."
        autoSize={{ minRows: 1, maxRows: 4 }}
      />

      <Button
        type="primary"
        icon={<SendOutlined />}
        onClick={onSend}
        disabled={!value.trim()}
      />
    </Flex>
  );
}
