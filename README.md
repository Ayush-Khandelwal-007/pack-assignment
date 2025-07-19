# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

# Pack Resource Upload Platform

## Features
- Upload resources (PDF, video, slides, etc.) with metadata
- View uploaded resources in a table
- Click to view/download files
- SvelteKit + TypeScript + PostgreSQL + Docker

## Quick Start (Recommended: Docker)

1. **Start PostgreSQL (Docker Compose):**
   ```sh
   docker compose up -d db
   ```

2. **Run database migrations:**
   ```sh
   npx prisma migrate dev --name init
   ```

3. **Start the SvelteKit app:**
   ```sh
   npm run dev -- --host
   ```

4. **Visit:**
   [http://localhost:5173](http://localhost:5173)

## Manual Local Setup (without Docker)
- Install PostgreSQL locally and set `DATABASE_URL` in `.env`
- Run migrations and start the app as above

## File Storage
- Files are stored in `static/uploads/` by default
- To use cloud storage (e.g., S3), update the upload logic in `src/routes/api/resources/+server.ts`

## Development
- Main page: `src/routes/+page.svelte`
- API: `src/routes/api/resources/+server.ts`
- DB schema: `prisma/schema.prisma`
- Components: `src/lib/components/`

## Tech Stack
- SvelteKit, TypeScript, TailwindCSS
- PostgreSQL (via Prisma ORM)
- Docker for easy setup

## Troubleshooting
- Ensure Node.js >= 20.19.0 or >= 22.12.0
- If you change Node versions, delete `node_modules` and reinstall
- If you get DB connection errors, check Docker is running and `.env` is correct
