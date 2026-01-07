import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { Context } from "@/context";
import { db } from "@/db";
import { blogTable } from "@/db/schema/blog";
import {
  createBlogSchema,
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
