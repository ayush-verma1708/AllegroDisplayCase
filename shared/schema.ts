import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Product schema for clothing catalogue
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: text("price").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // e.g. "men", "women", "accessories"
  images: jsonb("images").notNull().$type<string[]>(), // Array of image URLs
  details: jsonb("details").notNull().$type<string[]>(), // Array of product details
  sizes: jsonb("sizes").notNull().$type<string[]>(), // Available sizes
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
