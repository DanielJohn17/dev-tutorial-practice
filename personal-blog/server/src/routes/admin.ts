import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { Context } from "@/context";
import { db } from "@/db";
import { blogTable } from "@/db/schema/blog";
import {
  createBlogSchema,
  createUpdateBlogSchema,
  paramSchema,
  SuccessResponse,
} from "@repo/shared";
import { eq } from "drizzle-orm";

export const adminRoute = new Hono<Context>()
  .post("/blog", zValidator("json", createBlogSchema), async (c) => {
    const user = c.get("user");

    if (!user) throw new HTTPException(401, { message: "User not Found!" });

    if (user.role !== "admin") {
      throw new HTTPException(401, { message: "User is not an admin" });
    }

    const { title, content } = c.req.valid("json");

    const [blog] = await db
      .insert(blogTable)
      .values({ title, content, authorId: user.id })
      .returning({ id: blogTable.id });

    if (!blog) {
      throw new HTTPException(500, { message: "Failed to create blog" });
    }

    return c.json<SuccessResponse<{ blogId: number }>>(
      {
        success: true,
        message: "Successfully created blog",
        data: { blogId: blog.id },
      },
      201,
    );
  })
  .patch(
    "/blog/:id",
    zValidator("param", paramSchema),
    zValidator("json", createUpdateBlogSchema),
    async (c) => {
      const user = c.get("user");

      if (!user) {
        throw new HTTPException(401, { message: "User not Found" });
      }

      if (user.role == "admin") {
        throw new HTTPException(401, { message: "User is not an admin" });
      }

      const { title, content } = c.req.valid("json");
      const { id } = c.req.valid("param");

      const [blog] = await db
        .update(blogTable)
        .set({ title, content })
        .where(eq(blogTable.id, id))
        .returning({ blogId: blogTable.id });

      if (!blog) {
        throw new HTTPException(500, { message: "Failed to update blog" });
      }

      return c.json<SuccessResponse<{ blogId: number }>>({
        success: true,
        message: "Successfully updated blog",
        data: { blogId: blog.blogId },
      });
    },
  )
  .delete("/blog/:id", zValidator("param", paramSchema), async (c) => {
    const user = c.get("user");

    if (!user) {
      throw new HTTPException(401, { message: "User not Found" });
    }

    if (user.role == "admin") {
      throw new HTTPException(401, { message: "User is not an admin" });
    }

    const { id } = c.req.valid("param");

    const [deletedBlog] = await db
      .delete(blogTable)
      .where(eq(blogTable.id, id))
      .returning({ blogId: blogTable.id });

    if (!deletedBlog) {
      throw new HTTPException(500, { message: "Failed to delete blog" });
    }

    return c.json<SuccessResponse<{ blogId: number }>>({
      success: true,
      message: "Successfully deleted table",
      data: { blogId: deletedBlog.blogId },
    });
  });
