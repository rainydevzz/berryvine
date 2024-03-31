import { html } from "@elysiajs/html";
import { jwt } from "@elysiajs/jwt";
import Elysia from "elysia";
import { FileBody } from "..";
import { db } from "../migrate";
import { metadata } from "../schema";
import { staticPlugin } from "@elysiajs/static";
import { v4 as uuidv4 } from 'uuid';

export const submitUpload = new Elysia()
    .use(staticPlugin({assets: './files', alwaysStatic: false, indexHTML: true, prefix: '/files'}))
    .use(jwt({
      name: 'jwt',
      secret: 'sfhskdfjhsdkfjsdhfksdhfkjsd'
    }))
    .use(html())
    .post('/upload', async ({ body, set, jwt, cookie: { auth } }) => {
        const profile = await jwt.verify(auth.value);
        if (!profile) {
          set.status = 'Unauthorized';
          return 'Unauthorized';
        }
        let b = body as FileBody;
        if(b.file.type != "video/mp4") {
          set.status = 'Unsupported Media Type';
          return 'MP4s Only!';
        }
        let u = uuidv4();
        console.log(u);
        await Bun.write(`files/${u}.mp4`, b.file);
        let name = "" != b.name ? b.name : "My Clip";
        await db.insert(metadata).values([
            {
                id: u,
                name: name,
                path: `files/${u}.mp4`
            }
        ]);
        set.redirect = '/';
    });