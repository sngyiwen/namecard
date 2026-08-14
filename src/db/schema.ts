import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const nameCard = sqliteTable("name_card", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().default(""),
  role: text("role").notNull().default(""),
  company: text("company").notNull().default(""),
  tagline: text("tagline").notNull().default(""),
  email: text("email").notNull().default(""),
  phone: text("phone").notNull().default(""),
  telegramHandle: text("telegram_handle").notNull().default(""),
  xHandle: text("x_handle").notNull().default(""),
});

export const encounters = sqliteTable("encounters", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  personName: text("person_name").notNull(),
  place: text("place").notNull(),
  timestamp: integer("timestamp", { mode: "timestamp" }).notNull(),
  consent: integer("consent", { mode: "boolean" }).notNull(),
  selfieUri: text("selfie_uri"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export type NameCard = typeof nameCard.$inferSelect;
export type NameCardInput = typeof nameCard.$inferInsert;
export type Encounter = typeof encounters.$inferSelect;
export type EncounterInput = typeof encounters.$inferInsert;
