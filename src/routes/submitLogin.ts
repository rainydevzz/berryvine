import { html } from "@elysiajs/html";
import { jwt } from "@elysiajs/jwt";
import Elysia from "elysia";
import { AuthBody } from "..";

export const submitLogin = new Elysia()
    .use(jwt({
      name: 'jwt',
      secret: 'sfhskdfjhsdkfjsdhfksdhfkjsd'
    }))
    .use(html())
    .post('/login', async ({ jwt, cookie: { auth }, params, body, set }) => {
        let b = body as AuthBody;
        if(b.auth != process.env.SECRET) {
          set.status = 'Unauthorized'
          return 'Unauthorized';
        } else {
          auth.set({
            value: await jwt.sign(params),
            maxAge: 7 * 86400,
            path: '/upload'
          })
          set.redirect = '/';
        }
      });