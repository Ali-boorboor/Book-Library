import BookModal from "@/components/book-modal/book-modal";
import BookTable from "@/components/book-table/book-table";
import PageHeader from "@/components/page-header/page-header";
import type { Book, BookPostPutRequest } from "@/types/book";
import { AiChatButton } from "@/components/ai-chat/ai-chat-button";
import { AiChat } from "@/components/ai-chat/ai-chat";
import { App as AntApp, Card, Flex } from "antd";
import { useBooks } from "@/hooks/use-books";
import { useState } from "react";

export default function BookLibrary() {
  const { message } = AntApp.useApp();

  const { books, loading, createBook, updateBook, deleteBook } = useBooks();

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [chatOpen, setChatOpen] = useState(false);

  const handleAdd = () => {
    setSelectedBook(null);
    setModalOpen(true);
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setSelectedBook(null);
  };

  const handleSubmit = async (values: BookPostPutRequest) => {
    try {
      if (selectedBook) {
        await updateBook(selectedBook.id, values);

        message.success("Book updated successfully");
      } else {
        await createBook(values);

        message.success("Book added successfully");
      }

      handleCancel();
    } catch {
      message.error(
        selectedBook ? "Failed to update book" : "Failed to add book",
      );
    }
  };

  const handleDelete = async (book: Book) => {
    try {
      await deleteBook(book.id);

      message.success("Book deleted successfully");
    } catch {
      message.error("Failed to delete book");
    }
  };

  return (
    <Flex
      vertical
      style={{
        minHeight: "100vh",
        padding: "48px 24px",
      }}
    >
      <Flex
        vertical
        gap={32}
        style={{
          width: "100%",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <PageHeader onAdd={handleAdd} />

        <Card
          styles={{
            body: {
              padding: 0,
            },
          }}
          style={{
            overflow: "hidden",
            borderRadius: 20,
          }}
        >
          <BookTable
            books={books}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAdd}
          />
        </Card>
      </Flex>

      <BookModal
        open={modalOpen}
        loading={loading}
        book={selectedBook}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />

      {chatOpen ? (
        <AiChat onClose={() => setChatOpen(false)} />
      ) : (
        <AiChatButton onClick={() => setChatOpen(true)} />
      )}
    </Flex>
  );
}
