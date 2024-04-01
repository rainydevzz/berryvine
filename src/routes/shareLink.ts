import { html } from "@elysiajs/html";
import Elysia from "elysia";
import { db } from "../migrate";
import { metadata } from "../schema";
import { eq } from "drizzle-orm";
import hbs from 'handlebars';
import staticPlugin from "@elysiajs/static";

export const shareLinks = new Elysia()
    .use(html())
    .use(staticPlugin({assets: './files', alwaysStatic: false, indexHTML: true, prefix: '/files'}))
    .get('/share-link/:id', async ({ params: { id }, request }) => {
        let urlVar = 'https://' + new URL(request.url).host + `/files/${id}.mp4`;
        console.log(urlVar);
        let clips = await db.select().from(metadata).where(eq(metadata.id, id));
        let toShare = clips[0];
        let render = hbs.compile(await Bun.file('./static/link.hbs').text());
        return render({
            name: `${toShare.name}`,
            src: toShare.path,
            urlvar: urlVar
        })
    });