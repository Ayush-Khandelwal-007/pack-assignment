# Pack Resource Upload Platform

## Features
- Upload resources (PDF, video, slides, etc.) with metadata
- View uploaded resources in a table
- Click to view/download files
- SvelteKit + TypeScript + PostgreSQL (Supabase) + Cloudflare R2 + Docker

## Quick Start (Recommended: Docker)

1. **Clone the repository:**
   ```sh
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>
   ```

2. **Set up your `.env` file:**
   - Copy `.env.example` to `.env` and fill in your secrets:
     ```env
     DATABASE_URL=postgres://postgres:<your-password>@db.<hash>.supabase.co:5432/postgres
     R2_ACCESS_KEY_ID=your-access-key-id
     R2_SECRET_ACCESS_KEY=your-secret-access-key
     R2_ACCOUNT_ID=your-account-id
     R2_BUCKET=pack
     R2_REGION=auto
     R2_PUBLIC_URL=https://pub-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.r2.dev/pack
     ```

3. **Start the app (Docker Compose):**
   ```sh
   docker compose up --build app
   ```

4. **Run database migrations:**
   ```sh
   docker compose exec app npx prisma migrate deploy
   # or for development
   docker compose exec app npx prisma migrate dev
   ```

5. **Visit:**
   [http://localhost:5173](http://localhost:5173)

## Supabase Setup
- Go to [supabase.com](https://supabase.com/) and create a project.
- Get your Postgres connection string from **Settings → Database**.
- Use this as your `DATABASE_URL` in `.env`.
- You can reset your password in the same section if needed.

## Cloudflare R2 Setup
- Go to [Cloudflare R2](https://dash.cloudflare.com/) and create a bucket (e.g., `pack`).
- Enable the **Public Development URL** for your bucket.
- Get your Access Key, Secret, Account ID, and set the public URL as `R2_PUBLIC_URL` in `.env`.
- Your public URL should look like: `https://pub-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.r2.dev/pack`

## Environment Variables
- **DATABASE_URL**: Supabase Postgres connection string
- **R2_ACCESS_KEY_ID**: Cloudflare R2 Access Key
- **R2_SECRET_ACCESS_KEY**: Cloudflare R2 Secret Key
- **R2_ACCOUNT_ID**: Cloudflare Account ID
- **R2_BUCKET**: R2 bucket name (e.g., `pack`)
- **R2_REGION**: `auto` (for R2)
- **R2_PUBLIC_URL**: Your public R2 .r2.dev URL

## .gitignore Example
```
node_modules/
.env
*.sqlite
dist/
build/
uploads/
```

## Security Notes
- **Never commit your `.env` file** or any secrets to version control.
- The public R2 URL makes all uploaded files public. For private files, use signed URLs or a proxy.

## Development
- Main page: `src/routes/+page.svelte`
- API: `src/routes/api/resources/+server.ts`
- DB schema: `prisma/schema.prisma`
- Components: `src/lib/components/`

## Troubleshooting
- Ensure Node.js >= 20.19.0 or >= 22.12.0
- If you change Node versions, delete `node_modules` and reinstall
- If you get DB connection errors, check your `.env` and Supabase project status
- For Prisma binary errors in Docker, see the Dockerfile and schema notes

## Deployment
- You can deploy this app to any platform that supports Docker (e.g., Render, Railway, Fly.io, AWS, etc.)
- Make sure to set all required environment variables in your deployment platform.

---

**For questions or issues, open an issue on GitHub!**


# sv-depreczated section

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