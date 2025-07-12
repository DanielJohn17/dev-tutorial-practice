import { insertPostSchema } from "@/db/schemas/posts";
import { z } from "zod/v4";

export type SuccessResponse<T = void> = {
  success: true;
  message: string;
} & (T extends void ? {} : { data: T });

export type ErrorResponse = {
  success: false;
  error: string;
  isFormError?: boolean;
};

export const createPostSchema = insertPostSchema
  .pick({
    title: true,
    url: true,
    content: true,
  })
  .refine((data) => data.url || data.content, {
    error: "Either URL or content must be provided.",
    path: ["url", "content"],
  });

export const sortBySchema = z.enum(["points", "recent"]);
export const orderSchema = z.enum(["asc", "desc"]);

export const paginationSchema = z.object({
  limit: z.coerce.number().optional().default(10),
  page: z.coerce.number().optional().default(1),
  sortBy: sortBySchema.optional().default("points"),
  order: orderSchema.optional().default("desc"),
  author: z.string().optional(),
  site: z.string().optional(),
});

export type Post = {
  id: number;
  title: string;
  url: string | null;
  content: string | null;
  points: number;
  createdAt: string; // ISO format date string
  commentCount: number;
  author: {
    id: string;
    username: string;
  };
  isUpvoted: boolean;
};

export type PaginatedSuccessResponse<T> = {
  pagination: {
    page: number;
    totalPages: number;
  };
  data: T;
} & Omit<SuccessResponse, "data">;
