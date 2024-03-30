import { html } from "@elysiajs/html";
import { jwt } from "@elysiajs/jwt";
import Elysia from "elysia";

export const upload = new Elysia()
    .use(jwt({
      name: 'jwt',
      secret: 'sfhskdfjhsdkfjsdhfksdhfkjsd'
    }))
    .use(html())
    .get('/upload', async ({jwt, set, cookie: { auth } }) => {
        const profile = await jwt.verify(auth.value);
        if (!profile) {
          set.status = 'Unauthorized';
          return 'Unauthorized';
        } else {
          return await Bun.file('./static/upload.html').text()
        }
      })