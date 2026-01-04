import { insertBlogSchema } from "../server/src/db/schema/blog";

export type SuccessResponse<T = void> = {
  success: true;
  message: string;
} & (T extends void ? {} : { data: T });

export type ErrorResponse = {
  success: false;
  error: string;
};

export const createBlogSchema = insertBlogSchema.pick({
  title: true,
  content: true,
});
