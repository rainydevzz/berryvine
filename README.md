# Berryvine

Simple Media/Clip Sharing powered by Bun and Elysia.

Built with the BHEST Stack(tm) (Bun, Handlebars, Elysia, SQLite, Typescript)

### Features

- Password-Protected Uploads
- Simple User Interface
- Simple Hosting With Docker
- Easily Send Clip Links To Friends With Rich Embeds (WIP)

### Getting Started

Docker will handle everything for you. You can get a development server up and running with simply `docker-compose up` in the directory. Default port is 8100.

It is also possible to get a development server without Docker by running `bun run src/index.ts`.

If you want to clear the project data (files/database), run `sudo rm -rf files db && docker-compose down -v`.

### Known Issues

Videos aren't showing up in Embed, and won't seem to play inside of Discord.

However visiting the home page or the file url directly works completely fine.