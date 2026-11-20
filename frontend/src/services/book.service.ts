import type { Book, BookPostPutRequest } from "@/types/book";

const API_URL = "http://localhost:8080/api/books";

const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(error?.message ?? "Something went wrong");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
};

export const bookService = {
  getAll(): Promise<Book[]> {
    return request<Book[]>(API_URL);
  },

  getById(id: number): Promise<Book> {
    return request<Book>(`${API_URL}/${id}`);
  },

  create(data: BookPostPutRequest): Promise<Book> {
    return request<Book>(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  update(id: number, data: BookPostPutRequest): Promise<Book> {
    return request<Book>(`${API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  remove(id: number): Promise<void> {
    return request<void>(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  },
};
