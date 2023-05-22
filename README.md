# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app` but without tailwind. I`ve used mantine UI instead

## Recipe:

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Mantine](https://mantine.dev/) 
- [tRPC](https://trpc.io)
- [zod] (https://zod.dev)
- [react-markdown]
- [CodeMirror]


## Create database with Supabase based on AWS:

- connect your github profile with Supabase and create a database and set a name and password for it.
- then go to Settings => Database => Connection string => URl and copy that link add it to `DATABASE_URL` inside your environment variables or locally in .env
- add the postgresql in the provider of `datasource db` inside your prisma configuration file: `schema.prisma`
- got to table editor on the Supabase and check if you see the tables: account, example, session, user.... if so, then our database is succesfully working!

### Authentication with Github OAuth:

- instructions will folllow


## Deployment:

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel) [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
