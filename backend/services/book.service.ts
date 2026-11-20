import type { Book, BookPostPutRequest } from "@/types/book";
import { readFile, writeFile } from "node:fs/promises";
import { AppError } from "@/utils/app-error";
import { resolve } from "node:path";

const BOOK_FILE_PATH = resolve(import.meta.dir, "../data/books.json");

export class BookService {
  async getAll(): Promise<Book[]> {
    return this.readBooks();
  }

  async getById(id: number): Promise<Book> {
    const books = await this.readBooks();

    const book = books.find((book) => book.id === id);

    if (!book) {
      throw new AppError(404, `Book with id ${id} not found`);
    }

    return book;
  }

  async create(data: BookPostPutRequest): Promise<Book> {
    this.validateBook(data);

    const books = await this.readBooks();

    const book: Book = {
      id: this.getNextId(books),
      ...data,
    };

    books.push(book);

    await this.writeBooks(books);

    return book;
  }

  async update(id: number, data: BookPostPutRequest): Promise<Book> {
    this.validateBook(data);

    const books = await this.readBooks();

    const index = books.findIndex((book) => book.id === id);

    if (index === -1) {
      throw new AppError(404, `Book with id ${id} not found`);
    }

    const updatedBook: Book = {
      id,
      ...data,
    };

    books[index] = updatedBook;

    await this.writeBooks(books);

    return updatedBook;
  }

  async delete(id: number): Promise<void> {
    const books = await this.readBooks();

    const index = books.findIndex((book) => book.id === id);

    if (index === -1) {
      throw new AppError(404, `Book with id ${id} not found`);
    }

    books.splice(index, 1);

    await this.writeBooks(books);
  }

  private async readBooks(): Promise<Book[]> {
    const content = await readFile(BOOK_FILE_PATH, "utf-8");

    return JSON.parse(content) as Book[];
  }

  private async writeBooks(books: Book[]): Promise<void> {
    await writeFile(BOOK_FILE_PATH, JSON.stringify(books, null, 2), "utf-8");
  }

  private getNextId(books: Book[]): number {
    if (books.length === 0) {
      return 1;
    }

    return Math.max(...books.map((book) => book.id)) + 1;
  }

  private validateBook(data: BookPostPutRequest): void {
    if (!data.name?.trim()) {
      throw new AppError(400, "Book name is required");
    }

    if (!data.author?.trim()) {
      throw new AppError(400, "Author is required");
    }

    if (typeof data.price !== "number" || data.price < 0) {
      throw new AppError(400, "Price must be a non-negative number");
    }
  }
}

export const bookService = new BookService();
