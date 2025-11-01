import { createAuthClient } from 'better-auth/react';

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.BETTER_AUTH_URL;

// biome-ignore lint/style/useNamingConvention: defined by trpc
export const authClient = createAuthClient({ baseURL: baseUrl });

export const { signIn, signOut, useSession, getSession } = authClient;
