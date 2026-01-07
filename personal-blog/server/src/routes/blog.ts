import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { and, countDistinct, eq, sql } from "drizzle-orm";
import {
  Blog,
  PaginatedSuccessResponse,
  paginationSchema,
  paramSchema,
  SuccessResponse,
} from "@repo/shared";

import { db } from "@/db";
import { blogTable } from "@/db/schema/blog";
import { user as userTable } from "@/db/schema/auth";
import { favouriteBlogsTable } from "@/db/schema/favourite";
import { Context } from "@/context";

export const blogRoute = new Hono<Context>()
  .get("/", zValidator("query", paginationSchema), async (c) => {
    const user = c.get("user");
    const { page, limit } = c.req.valid("query");

    const offset = (page - 1) * limit;

    const [count] = await db
      .select({ count: countDistinct(blogTable.id) })
      .from(blogTable);

    if (count.count === 0) {
      throw new HTTPException(404, { message: "No blog Found." });
    }

    const blogQuery = db
      .select({
        id: blogTable.id,
        title: blogTable.title,
        content: blogTable.content,
        createdAt: blogTable.createdAt,
        updatedAt: blogTable.updatedAt,
        user: {
          id: userTable.id,
          username: userTable.name,
        },
        isFavourite: user
          ? sql<boolean>`CASE WHEN ${favouriteBlogsTable.userId} IS NOT NULL THEN true ELSE false END`
          : sql<boolean>`false`,
      })
      .from(blogTable)
      .leftJoin(userTable, eq(blogTable.authorId, userTable.id))
      .offset(offset)
      .limit(limit);

    if (user) {
      blogQuery.leftJoin(
        favouriteBlogsTable,
        and(
          eq(favouriteBlogsTable.blogId, blogTable.id),
          eq(favouriteBlogsTable.userId, user.id),
        ),
      );
    }

    const blogs = await blogQuery;
    if (blogs.length === 0) {
      throw new HTTPException(404, { message: "No blogs found" });
    }

    return c.json<PaginatedSuccessResponse<Blog[]>>(
      {
        success: true,
        message: "Successfully retrived blogs",
        pagination: {
          page,
          totalPages: Math.ceil(count.count / limit),
        },
        data: blogs as Blog[],
      },
      200,
    );
  })
  .get("/:id", zValidator("param", paramSchema), async (c) => {
    const user = c.get("user");
    const { id } = c.req.valid("param");

    const [count] = await db
      .select({ count: countDistinct(blogTable.id) })
      .from(blogTable)
      .where(eq(blogTable.id, id));

    if (count.count === 0) {
      throw new HTTPException(404, { message: "Blog not found" });
    }

    const blogQuery = db
      .select({
        id: blogTable.id,
        title: blogTable.title,
        content: blogTable.content,
        createdAt: blogTable.createdAt,
        updatedAt: blogTable.updatedAt,
        user: {
          id: userTable.id,
          username: userTable.name,
        },
        isFavourite: user
          ? sql<boolean>`CASE WHEN ${favouriteBlogsTable.userId} IS NOT NULL THEN true ELSE false END`
          : sql<boolean>`false`,
      })
      .from(blogTable)
      .leftJoin(userTable, eq(blogTable.authorId, userTable.id))
      .where(eq(blogTable.id, id))
      .limit(1);

    if (user) {
      blogQuery.leftJoin(
        favouriteBlogsTable,
        and(
          eq(favouriteBlogsTable.userId, user.id),
          eq(favouriteBlogsTable.blogId, blogTable.id),
        ),
      );
    }

    const [blog] = await blogQuery;

    if (!blog) {
      throw new HTTPException(404, { message: "Blog not found" });
    }

    return c.json<SuccessResponse<Blog>>(
      {
        success: true,
        message: "Successfully retrived blog",
        data: blog as Blog,
      },
      200,
    );
  })
  .post("/:id/fav", zValidator("param", paramSchema), async (c) => {
    const user = c.get("user");

    if (!user) {
      throw new HTTPException(401, { message: "User not found" });
    }

    const { id } = c.req.valid("param");

    const [blog] = await db
      .select({ count: countDistinct(blogTable.id) })
      .from(blogTable)
      .where(eq(blogTable.id, id))
      .limit(1);

    if (blog.count === 0) {
      throw new HTTPException(404, { message: "Blog not found" });
    }

    const favourited = await db.transaction(async (tx) => {
      const [isFavourited] = await tx
        .select()
        .from(favouriteBlogsTable)
        .where(
          and(
            eq(favouriteBlogsTable.blogId, id),
            eq(favouriteBlogsTable.userId, user.id),
          ),
        )
        .limit(1);

      if (isFavourited) {
        const [unFavourite] = await tx
          .delete(favouriteBlogsTable)
          .where(
            and(
              eq(favouriteBlogsTable.blogId, id),
              eq(favouriteBlogsTable.userId, user.id),
            ),
          )
          .returning({
            userId: favouriteBlogsTable.userId,
            blogId: favouriteBlogsTable.blogId,
          });

        return {
          message: "Successfully removed blog from favourite list",
          data: unFavourite,
        };
      }

      const [fave] = await tx
        .insert(favouriteBlogsTable)
        .values({ userId: user.id, blogId: id })
        .returning({
          userId: favouriteBlogsTable.userId,
          blogId: favouriteBlogsTable.blogId,
        });

      if (!fave) {
        throw new HTTPException(500, { message: "Failed to favourite post" });
      }

      return {
        message: "Successfully added blog to favourite list",
        data: fave,
      };
    });

    return c.json<SuccessResponse<{ userId: string; blogId: number }>>(
      {
        success: true,
        message: favourited.message,
        data: favourited.data,
      },
      201,
    );
  });
