import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { existsSync } from "fs";
import { mkdir } from "fs/promises";

let exists = false;

if(!existsSync("./db")) {
    await mkdir("./db");
}

if(!await Bun.file("sqlite.db").exists()) {
    Bun.write("/usr/app/db/sqlite.db", "");
} else {
    exists = true;
}

export const sqlite = new Database("./db/sqlite.db");
export const db = drizzle(sqlite);
if(!exists) {
    await migrate(db, { migrationsFolder: "./drizzle" });
}