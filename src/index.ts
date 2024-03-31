import { Elysia } from "elysia";
import { index } from "./routes";
import { login } from "./routes/login";
import { submitLogin } from "./routes/submitLogin";
import { upload } from "./routes/upload";
import { submitUpload } from "./routes/submitUpload";
import { shareLinks } from "./routes/shareLink";

export interface AuthBody {
  auth: string;
}

export interface FileBody {
  file: Blob;
  name: string;
}

const app = new Elysia()
  .use(index)
  .use(login)
  .use(submitLogin)
  .use(upload)
  .use(submitUpload)
  .use(shareLinks)
  .listen({port: 8100});

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
