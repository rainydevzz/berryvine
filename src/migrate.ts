import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

export const sqlite = new Database("./db/sqlite.db");
export const db = drizzle(sqlite);
migrate(db, { migrationsFolder: "./drizzle" });
