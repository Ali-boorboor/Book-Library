import type { BookPostPutRequest } from "@/types/book";
import { Button, Flex, Form, Input, InputNumber } from "antd";
import { BookOutlined, DollarOutlined, UserOutlined } from "@ant-design/icons";

interface BookFormProps {
  initialValues?: BookPostPutRequest;
  loading?: boolean;
  submitText: string;
  onCancel: () => void;
  onSubmit: (values: BookPostPutRequest) => void;
}

export default function BookForm({
  initialValues,
  loading = false,
  submitText,
  onCancel,
  onSubmit,
}: BookFormProps) {
  const [form] = Form.useForm<BookPostPutRequest>();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmit}
      requiredMark={false}
    >
      <Flex
        vertical
        gap={2}
        style={{
          padding: "24px 28px 8px",
        }}
      >
        <Form.Item
          label="Book name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter the book name",
            },
            {
              min: 2,
              message: "Book name must be at least 2 characters",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<BookOutlined />}
            placeholder="e.g. Clean Code"
          />
        </Form.Item>

        <Form.Item
          label="Author"
          name="author"
          rules={[
            {
              required: true,
              message: "Please enter the author name",
            },
            {
              min: 2,
              message: "Author name must be at least 2 characters",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<UserOutlined />}
            placeholder="e.g. Robert C. Martin"
          />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please enter the book price",
            },
            {
              type: "number",
              min: 0,
              message: "Price cannot be negative",
            },
          ]}
        >
          <InputNumber
            size="large"
            min={0}
            precision={2}
            prefix={<DollarOutlined />}
            placeholder="0.00"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Flex>

      <Flex
        gap={10}
        style={{
          padding: "20px 28px 24px",
        }}
      >
        <Button size="large" block onClick={onCancel}>
          Cancel
        </Button>

        <Button
          type="primary"
          size="large"
          block
          htmlType="submit"
          loading={loading}
        >
          {submitText}
        </Button>
      </Flex>
    </Form>
  );
}
