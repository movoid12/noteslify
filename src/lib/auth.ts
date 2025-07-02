import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { env } from '~/env';
import { db } from '~/server/db';
// import * as schema from '../server/db/schema';

export const auth = betterAuth({
  // biome-ignore lint/style/useNamingConvention: <explanation>
  baseURL: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: 'pg',
    // schema: schema
  }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      // biome-ignore lint/style/useNamingConvention: <explanation>
      redirectURI: `${process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : env.BETTER_AUTH_URL}/api/auth/callback/google`,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  session: {
    updateAge: 24 * 60 * 60, // 24 hours
  },
});
