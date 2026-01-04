import { insertBlogSchema } from "../server/src/db/schema/blog.ts";

export type ErrorResponse = {
  success: false;
  error: string;
};

export const createBlogSchema = insertBlogSchema.pick({
  title: true,
  content: true,
});
