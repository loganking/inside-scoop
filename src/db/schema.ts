import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  createdAt: integer("created_at", { mode: "boolean" }).default(sql`now()`),
  updatedAt: integer("updated_at", { mode: "boolean" }).default(false),
});

export const storeTable = sqliteTable("store", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address"),
  createdAt: integer("created_at", { mode: "boolean" }).default(sql`now()`),
  updatedAt: integer("updated_at", { mode: "boolean" }).default(false),
});

export const reviewTable = sqliteTable("review", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  storeId: text("store_id").notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: integer("created_at", { mode: "boolean" }).default(sql`now()`),
  updatedAt: integer("updated_at", { mode: "boolean" }).default(false),
});