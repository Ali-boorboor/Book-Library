import type { Book } from "@/types/book";
import { Button, Flex, Popover, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";

interface DeleteBookPopoverProps {
  book: Book;
  onDelete: (book: Book) => void;
}

export default function DeleteBookPopover({
  book,
  onDelete,
}: DeleteBookPopoverProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onDelete(book);
    setOpen(false);
  };

  return (
    <Popover
      trigger="click"
      placement="topRight"
      open={open}
      onOpenChange={setOpen}
      content={
        <Flex vertical gap={16} style={{ width: 260 }}>
          <Flex vertical gap={4}>
            <Typography.Text strong>Delete this book?</Typography.Text>

            <Typography.Text type="secondary">
              This action cannot be undone.
            </Typography.Text>
          </Flex>

          <Flex gap={8}>
            <Button block onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button block danger type="primary" onClick={handleDelete}>
              Delete
            </Button>
          </Flex>
        </Flex>
      }
    >
      <Button type="text" danger icon={<DeleteOutlined />} />
    </Popover>
  );
}
