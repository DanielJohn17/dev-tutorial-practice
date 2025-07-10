import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { postUpvotesTable } from "./upvotes";
import { commentsTable } from "./comments";

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

export const postsRelations = relations(postsTable, ({ one, many }) => ({
  author: one(user, {
    fields: [postsTable.userId],
    references: [user.id],
    relationName: "author",
  }),
  postUpvotes: many(postUpvotesTable, { relationName: "postUpvotes" }),
  comments: many(commentsTable),
}));
