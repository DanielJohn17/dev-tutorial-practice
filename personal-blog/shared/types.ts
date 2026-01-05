import { insertBlogSchema } from "../server/src/db/schema/blog";
import { z } from "zod";

export type SuccessResponse<T = void> = {
  success: true;
  message: string;
} & (T extends void ? {} : { data: T });

export type ErrorResponse = {
  success: false;
  error: string;
};

export const paginationSchema = z.object({
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
});

export const createBlogSchema = insertBlogSchema.pick({
  title: true,
  content: true,
});

export type Blog = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    username: string;
  };
  isFavourite: boolean;
};

export type PaginatedSuccessResponse<T> = {
  pagination: {
    page: number;
    totalPages: number;
  };
  data: T;
} & Omit<SuccessResponse, "data">;
