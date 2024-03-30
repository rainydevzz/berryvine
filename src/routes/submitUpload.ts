import { html } from "@elysiajs/html";
import { jwt } from "@elysiajs/jwt";
import Elysia from "elysia";
import { FileBody, db } from "..";
import { metadata } from "../schema";
import { staticPlugin } from "@elysiajs/static";

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
        let h = await Bun.password.hash(b.file, {algorithm: 'bcrypt'});
        await Bun.write(`./files/${h}.mp4`, b.file);
        let name = "" != b.name ? b.name : "My Clip";
        await db.insert(metadata).values([
            {
                id: h,
                name: name
            }
        ]);
        set.redirect = '/';
    });