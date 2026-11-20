import type { Book, BookPostPutRequest } from "@/types/book";
import { bookService } from "@/services/book.service";
import { useEffect, useState } from "react";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBooks = async () => {
    try {
      setLoading(true);

      const data = await bookService.getAll();

      setBooks(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const createBook = async (data: BookPostPutRequest): Promise<Book> => {
    const book = await bookService.create(data);

    setBooks((current) => [...current, book]);

    return book;
  };

  const updateBook = async (
    id: number,
    data: BookPostPutRequest,
  ): Promise<Book> => {
    const book = await bookService.update(id, data);

    setBooks((current) =>
      current.map((item) => (item.id === book.id ? book : item)),
    );

    return book;
  };

  const deleteBook = async (id: number): Promise<void> => {
    await bookService.remove(id);

    setBooks((current) => current.filter((book) => book.id !== id));
  };

  return {
    books,
    loading,
    createBook,
    updateBook,
    deleteBook,
  };
}
