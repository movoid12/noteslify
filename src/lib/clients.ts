import { createAuthClient } from 'better-auth/react';

import { getBaseUrl } from '~/utils/api';

const baseUrl = getBaseUrl();

// biome-ignore lint/style/useNamingConvention: <explanation>
export const authClient = createAuthClient({ baseURL: baseUrl });

export const { signIn, signOut, useSession, getSession } = authClient;
