import { date, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

import { user } from "@/db/schema/auth";
import { favouriteBlogsTable } from "./favourite";

export const blogTable = pgTable("blogs", {
  id: integer("id").primaryKey(),
  title: varchar("title", { length: 256 }),
  content: text("content"),
  createdAt: date("created_at", { mode: "string" }).defaultNow(),
  updatedAt: date("updated_at", { mode: "string" }).defaultNow(),
  authorId: text("author_id"),
});

export const userRelations = relations(user, ({ many }) => ({
  blogs: many(blogTable),
  favourites: many(favouriteBlogsTable),
}));

export const blogRelations = relations(blogTable, ({ one, many }) => ({
  author: one(user, {
    fields: [blogTable.authorId],
    references: [user.id],
  }),
  favourites: many(favouriteBlogsTable),
}));

export const insertBlogSchema = createInsertSchema(blogTable, {
  title: z
    .string()
    .min(3, { error: "Title must be at least 3  characters long" }),
  content: z.string(),
});
