import { createAuthClient } from 'better-auth/react';
import { env } from '~/env';

/* const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : env.BETTER_AUTH_URL; */

// biome-ignore lint/style/useNamingConvention: <explanation>
export const authClient = createAuthClient({ baseURL: env.BETTER_AUTH_URL });

export const { signIn, signOut, useSession, getSession } = authClient;
