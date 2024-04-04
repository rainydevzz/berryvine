import { html } from '@elysiajs/html';
import { Elysia } from 'elysia';
import hbs from 'handlebars';
import { glob } from 'glob';
import { db } from '../migrate';
import { metadata } from '../schema';
import { staticPlugin } from '@elysiajs/static';

export const index = new Elysia()
    .use(html())
    .use(staticPlugin({assets: './files', alwaysStatic: false, indexHTML: true, prefix: '/files'}))
    .get('/', async () => {
        let contents = await Bun.file('./static/index.hbs').text();
        let render = hbs.compile(contents);
        let data = db.select().from(metadata).all();
        return render({files: data})
    })