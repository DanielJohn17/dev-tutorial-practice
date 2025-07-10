import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { postsTable } from "./posts";
import { commentUpvotesTable } from "./upvotes";

export const commentsTable = pgTable("comments", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").notNull(),
  postId: integer("post_id").notNull(),
  parentCommentId: serial("parent_comment_id"),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  depth: integer("depth").notNull().default(0),
  commentCount: integer("comment_count").notNull().default(0),
  points: integer("points").notNull().default(0),
});

export const commentsRelations = relations(commentsTable, ({ one, many }) => ({
  author: one(user, {
    fields: [commentsTable.userId],
    references: [user.id],
    relationName: "author",
  }),
  parentComment: one(commentsTable, {
    fields: [commentsTable.parentCommentId],
    references: [commentsTable.id],
    relationName: "childComments",
  }),
  childComments: many(commentsTable, {
    relationName: "childComments",
  }),
  post: one(postsTable, {
    fields: [commentsTable.postId],
    references: [postsTable.id],
  }),
  commentUpvotes: many(commentUpvotesTable, { relationName: "commentUpvotes" }),
}));
