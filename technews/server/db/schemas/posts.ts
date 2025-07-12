import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { postUpvotesTable } from "./upvotes";
import { commentsTable } from "./comments";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  url: text("url"),
  content: text("content"),
  points: integer("points").notNull().default(0),
  commentCount: integer("comment_count").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertPostSchema = createInsertSchema(postsTable, {
  title: z
    .string()
    .min(3, { error: "Title must be at least 3 characters long" }),
  url: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => {
        if (value === "" || value === undefined) return true; // Allow empty string or undefined
        return /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
          value,
        );
      },
      { error: "Invalid URL format" },
    ),
  content: z.string().optional(),
});

export const postsRelations = relations(postsTable, ({ one, many }) => ({
  author: one(user, {
    fields: [postsTable.userId],
    references: [user.id],
    relationName: "author",
  }),
  postUpvotes: many(postUpvotesTable, { relationName: "postUpvotes" }),
  comments: many(commentsTable),
}));
