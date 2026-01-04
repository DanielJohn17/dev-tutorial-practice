import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { createBlogSchema, SuccessResponse } from "@/shared/types";
import { Context } from "@/context";
import { HTTPException } from "hono/http-exception";
import { db } from "@/db";
import { blogTable } from "@/db/schema/blog";

export const blogRoute = new Hono<Context>().post(
  "/",
  zValidator("json", createBlogSchema),
  async (c) => {
    const user = c.get("user");
    const session = c.get("session");

    if (!user) throw new HTTPException(401, { message: "User not Found!" });

    const { title, content } = c.req.valid("json");

    const [blog] = await db
      .insert(blogTable)
      .values({ title, content, authorId: user.id })
      .returning({ id: blogTable.id });

    if (!blog) {
      throw new HTTPException(500, { message: "Failed to create blog" });
    }

    return c.json<SuccessResponse<{ blogId: number }>>({
      success: true,
      message: "Successfully created blog",
      data: { blogId: blog.id },
    });
  },
);
