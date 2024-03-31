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
        let files = (await glob("**", {ignore: "node_modules/**"})).filter(f => f.startsWith("files") && f.includes("/"));
        let fixedFiles = [];
        for(const f of files) {
          fixedFiles.push('./' + f);
        }
        let fileArr = [];
        let names = db.select().from(metadata).all();
        if(names.length > 0) {
          for(const i in fixedFiles) {
            fileArr.push({file: fixedFiles[i], name: names[i].name, id: names[i].id});
          }
        }
        return render({files: fileArr})
    })