import type { Request, Response } from "express";
import { BookService } from "@/services/book.service";

export class BookController {
  private bookService = new BookService();

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const books = await this.bookService.getAll();

    res.json(books);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    const book = await this.bookService.getById(id);

    res.json(book);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const book = await this.bookService.create(req.body);

    res.status(201).json(book);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    const book = await this.bookService.update(id, req.body);

    res.json(book);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);

    await this.bookService.delete(id);

    res.status(204).send();
  };
}

export const bookController = new BookController();
