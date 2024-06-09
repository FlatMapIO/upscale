import { DiscordSnowflake } from "@sapphire/snowflake";
import { sql } from "drizzle-orm";
import { int, text } from "drizzle-orm/sqlite-core";

export const pk = text("id")
  .notNull()
  .primaryKey()
  .$defaultFn(() => String(DiscordSnowflake.generate()));

export const createdAt = int("created_at", {
  mode: "timestamp",
})
  .default(sql`CURRENT_TIMESTAMP`)
  .notNull();

export const updatedAt = int("updated_at", {
  mode: "timestamp",
})
  .default(sql`CURRENT_TIMESTAMP`)
  .notNull()
  .$onUpdate(() => sql`CURRENT_TIMESTAMP`);

export const status = text("status").$type<
  "published" | "draft" | "archived"
>();
