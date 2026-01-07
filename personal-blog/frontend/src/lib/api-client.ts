import type {
  Blog,
  FavouriteBlog,
  PaginatedSuccessResponse,
  SuccessResponse,
} from "@repo/shared";

const API_BASE = "http://localhost:3000/api";

export interface FetchOptions {
  headers?: Record<string, string>;
  body?: unknown;
}

async function fetchApi<T>(
  endpoint: string,
  method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
  options?: FetchOptions
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  const response = await fetch(url, {
    method,
    headers,
    body: options?.body ? JSON.stringify(options.body) : undefined,
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export const apiClient = {
  // Blog endpoints
  blogs: {
    list: (page = 1, limit = 10) =>
      fetchApi<PaginatedSuccessResponse<Blog[]>>(
        `/blog?page=${page}&limit=${limit}`
      ),

    get: (id: number) =>
      fetchApi<SuccessResponse<Blog>>(`/blog/${id}`),

    favorite: (id: number) =>
      fetchApi<SuccessResponse<{ userId: string; blogId: number }>>(
        `/blog/${id}/fav`,
        "POST"
      ),
  },

  // Favourite endpoints
  favourites: {
    list: () =>
      fetchApi<SuccessResponse<FavouriteBlog[]>>(`/fav`),
  },

  // Admin endpoints
  admin: {
    blog: {
      create: (title: string, content: string) =>
        fetchApi<SuccessResponse<{ blogId: number }>>(
          `/admin/blog`,
          "POST",
          { body: { title, content } }
        ),

      update: (id: number, title?: string, content?: string) =>
        fetchApi<SuccessResponse<{ blogId: number }>>(
          `/admin/blog/${id}`,
          "PATCH",
          { body: { ...(title && { title }), ...(content && { content }) } }
        ),

      delete: (id: number) =>
        fetchApi<SuccessResponse<{ blogId: number }>>(
          `/admin/blog/${id}`,
          "DELETE"
        ),
    },
  },
};
