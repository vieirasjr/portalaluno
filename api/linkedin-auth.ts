import type { VercelRequest, VercelResponse } from '@vercel/node';
import { randomUUID } from 'crypto';

const CLIENT_ID = process.env.Client_ID;
const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.APP_URL || 'http://localhost:3000';

const LINKEDIN_SCOPES = 'openid profile email';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  if (!CLIENT_ID) {
    return res.redirect(302, '/auth?error=server_config');
  }

  const state = randomUUID();
  const redirectUri = `${BASE_URL}/api/linkedin-callback`;

  res.setHeader(
    'Set-Cookie',
    `linkedin_oauth_state=${state}; path=/; max-age=600; SameSite=Lax${BASE_URL.startsWith('https') ? '; Secure' : ''}`
  );

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: redirectUri,
    scope: LINKEDIN_SCOPES,
    state,
  });

  res.redirect(302, `https://www.linkedin.com/oauth/v2/authorization?${params}`);
}
