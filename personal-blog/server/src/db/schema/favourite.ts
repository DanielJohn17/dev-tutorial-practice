import { date, integer, pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { user } from "@/db/schema/auth";
import { blogTable } from "@/db/schema/blog";
import { relations } from "drizzle-orm";

export const favouriteBlogsTable = pgTable(
  "favourite_blogs",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    blogId: integer("blog_id")
      .notNull()
      .references(() => blogTable.id),
    createdAt: date("created_at", { mode: "string" }).defaultNow(),
    updatedAt: date("updated_at", { mode: "string" }).defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.blogId] })],
);

export const favouriteBlogsRelations = relations(
  favouriteBlogsTable,
  ({ one }) => ({
    user: one(user, {
      fields: [favouriteBlogsTable.userId],
      references: [user.id],
    }),
    blog: one(blogTable, {
      fields: [favouriteBlogsTable.blogId],
      references: [blogTable.id],
    }),
  }),
);
