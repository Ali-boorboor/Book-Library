export interface Book {
  id: number;
  name: string;
  author: string;
  price: number;
}

export type BookPostPutRequest = Omit<Book, "id">;
