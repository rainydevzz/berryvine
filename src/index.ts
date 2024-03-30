import { Elysia } from "elysia";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { index } from "./routes";
import { login } from "./routes/login";
import { submitLogin } from "./routes/submitLogin";
import { upload } from "./routes/upload";
import { submitUpload } from "./routes/submitUpload";

const sqlite = new Database("sqlite.db");
export const db = drizzle(sqlite);

export interface AuthBody {
  auth: string;
}

export interface FileBody {
  file: any;
  name: string;
}

const app = new Elysia()
  .use(index)
  .use(login)
  .use(submitLogin)
  .use(upload)
  .use(submitUpload)
  .listen(8080);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
