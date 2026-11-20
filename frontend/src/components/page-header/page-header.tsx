import { Button, Flex, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface PageHeaderProps {
  onAdd: () => void;
}

export default function PageHeader({ onAdd }: PageHeaderProps) {
  return (
    <Flex justify="space-between" align="center" gap={16} wrap>
      <Flex vertical gap={4}>
        <Typography.Title
          level={2}
          style={{
            margin: 0,
            letterSpacing: "-0.5px",
          }}
        >
          My Book Library
        </Typography.Title>

        <Typography.Text type="secondary">
          Manage your personal book collection
        </Typography.Text>
      </Flex>

      <Button
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        onClick={onAdd}
      >
        Add Book
      </Button>
    </Flex>
  );
}
