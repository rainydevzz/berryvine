import { html } from '@elysiajs/html';
import { Elysia } from 'elysia';
import hbs from 'handlebars';
import { globSync } from 'glob';
import { db } from '..';
import { metadata } from '../schema';
import { staticPlugin } from '@elysiajs/static';

export const index = new Elysia()
    .use(html())
    .use(staticPlugin({assets: './files', alwaysStatic: false, indexHTML: true, prefix: '/files'}))
    .get('/', async () => {
        let contents = await Bun.file('./static/index.hbs').text();
        let render = hbs.compile(contents);
        let files = globSync("**", {ignore: "node_modules/**"}).filter(f => f.startsWith("files") && f.includes("/"));
        let fileArr = [];
        let names = await db.select().from(metadata).all();
        console.log(names);
        for(const i in files) {
          fileArr.push({file: files[i], name: names[i].name});
        }
        return render({files: fileArr})
    })