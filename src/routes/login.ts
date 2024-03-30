import { html } from "@elysiajs/html";
import Elysia from "elysia";

export const login = new Elysia()
    .use(html())
    .get('/login', async () => {
        return await Bun.file('./static/login.html').text();
    })