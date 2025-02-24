import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  timezone: text().notNull(),
  discord: text().unique().notNull(),
  twitter: text().unique(),
  bsky: text().unique(),
  github: text().unique(),
});
