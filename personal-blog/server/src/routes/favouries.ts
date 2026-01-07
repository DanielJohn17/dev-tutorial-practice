import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { eq } from "drizzle-orm";

import { Context } from "@/context";
import { blogTable } from "@/db/schema/blog";
import { favouriteBlogsTable } from "@/db/schema/favourite";
import { db } from "@/db";
import { FavouriteBlog, SuccessResponse } from "@repo/shared";

export const favouriteRoute = new Hono<Context>().get("/", async (c) => {
  const user = c.get("user");

  if (!user) {
    throw new HTTPException(401, { message: "User not found" });
  }

  const blogQuery = db
    .select({
      id: blogTable.id,
      title: blogTable.title,
      createdAt: blogTable.createdAt,
      authorId: blogTable.authorId,
    })
    .from(favouriteBlogsTable)
    .leftJoin(blogTable, eq(favouriteBlogsTable.blogId, blogTable.id))
    .where(eq(favouriteBlogsTable.userId, user.id));

  const blogs = await blogQuery;

  return c.json<SuccessResponse<FavouriteBlog[]>>(
    {
      success: true,
      message: "Successfully retrived blogs",
      data: blogs as FavouriteBlog[],
    },
    200,
  );
});
