import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const metadata = sqliteTable("metadata", {
    id: text("id").primaryKey(),
    name: text("name")
});