import BookForm from "@/components/book-form/book-form";
import type { Book, BookPostPutRequest } from "@/types/book";
import { Divider, Flex, Modal, Typography } from "antd";
import { BookOutlined } from "@ant-design/icons";

interface BookModalProps {
  open: boolean;
  loading?: boolean;
  book?: Book | null;
  onCancel: () => void;
  onSubmit: (values: BookPostPutRequest) => void;
}

export default function BookModal({
  open,
  loading = false,
  book,
  onCancel,
  onSubmit,
}: BookModalProps) {
  const isEdit = Boolean(book);

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      centered
      destroyOnHidden
      footer={null}
      styles={{
        container: {
          padding: 0,
          overflow: "hidden",
        },
        body: {
          padding: 0,
        },
      }}
    >
      <Flex
        vertical
        gap={6}
        style={{
          padding: "28px 28px 20px",
        }}
      >
        <Flex align="center" gap={12}>
          <Flex
            align="center"
            justify="center"
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            }}
          >
            <BookOutlined
              style={{
                color: "#fff",
                fontSize: 20,
              }}
            />
          </Flex>

          <Flex vertical gap={2}>
            <Typography.Title level={4} style={{ margin: 0 }}>
              {isEdit ? "Edit Book" : "Add Book"}
            </Typography.Title>

            <Typography.Text type="secondary">
              {isEdit
                ? "Update your book information"
                : "Add a new book to your library"}
            </Typography.Text>
          </Flex>
        </Flex>
      </Flex>

      <Divider style={{ margin: 0 }} />

      <BookForm
        key={book?.id ?? "create"}
        initialValues={
          book
            ? {
                name: book.name,
                author: book.author,
                price: book.price,
              }
            : undefined
        }
        loading={loading}
        submitText={isEdit ? "Save Changes" : "Add Book"}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </Modal>
  );
}
