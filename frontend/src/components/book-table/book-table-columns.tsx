import DeleteBookPopover from "./delete-book-popover";
import type { ColumnsType } from "antd/es/table";
import type { Book } from "@/types/book";
import { BookOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, Space, Tag, Typography } from "antd";

interface BookTableColumnsProps {
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export function createBookTableColumns({
  onEdit,
  onDelete,
}: BookTableColumnsProps): ColumnsType<Book> {
  return [
    {
      title: "Book",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <Flex align="center" gap={12}>
          <Flex
            align="center"
            justify="center"
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: "rgba(99, 102, 241, 0.12)",
            }}
          >
            <BookOutlined
              style={{
                fontSize: 18,
                color: "#6366f1",
              }}
            />
          </Flex>

          <Typography.Text strong>{name}</Typography.Text>
        </Flex>
      ),
    },

    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (author: string) => (
        <Typography.Text type="secondary">{author}</Typography.Text>
      ),
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 160,
      render: (price: number) => (
        <Tag
          style={{
            margin: 0,
            padding: "5px 10px",
            borderRadius: 8,
            fontWeight: 600,
          }}
        >
          ${price.toFixed(2)}
        </Tag>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      width: 150,
      align: "right",
      render: (_, book) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEdit(book)}
          />

          <DeleteBookPopover book={book} onDelete={onDelete} />
        </Space>
      ),
    },
  ];
}
