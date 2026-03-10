import type { VercelRequest, VercelResponse } from '@vercel/node';

const CLIENT_ID = process.env.Client_ID;
const CLIENT_SECRET = process.env.Primary_Client_Secret;
// APP_URL fixa a URL para OAuth (evita preview URLs que mudam a cada deploy)
const BASE_URL = process.env.APP_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
  || 'http://localhost:3000';

const CLEAR_STATE_COOKIE = 'linkedin_oauth_state=; path=/; max-age=0';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, state, error } = req.query;

  const cookieState = req.headers.cookie
    ?.split(';')
    .find((c) => c.trim().startsWith('linkedin_oauth_state='))
    ?.split('=')[1]
    ?.trim();
  if (state && cookieState && state !== cookieState) {
    res.setHeader('Set-Cookie', CLEAR_STATE_COOKIE);
    return res.redirect(302, '/auth?error=invalid_state');
  }

  if (error) {
    const errorDesc = typeof error === 'string' ? error : 'unknown';
    res.setHeader('Set-Cookie', CLEAR_STATE_COOKIE);
    return res.redirect(302, `/auth?error=${encodeURIComponent(errorDesc)}`);
  }

  if (!code || typeof code !== 'string') {
    res.setHeader('Set-Cookie', CLEAR_STATE_COOKIE);
    return res.redirect(302, '/auth?error=missing_code');
  }

  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error('Client_ID ou Primary_Client_Secret não configurados');
    res.setHeader('Set-Cookie', CLEAR_STATE_COOKIE);
    return res.redirect(302, '/auth?error=server_config');
  }

  const redirectUri = `${BASE_URL}/api/linkedin-callback`;

  try {
    const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error('LinkedIn token error:', errText);
      res.setHeader('Set-Cookie', CLEAR_STATE_COOKIE);
      return res.redirect(302, '/auth?error=token_exchange');
    }

    const tokens = await tokenRes.json();
    const accessToken = tokens.access_token;

    const userRes = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userRes.ok) {
      console.error('LinkedIn userinfo error:', await userRes.text());
      res.setHeader('Set-Cookie', CLEAR_STATE_COOKIE);
      return res.redirect(302, '/auth?error=userinfo');
    }

    const user = await userRes.json();
    const sessionPayload = JSON.stringify({
      id: user.sub,
      name: user.name,
      email: user.email,
      picture: user.picture,
      provider: 'linkedin',
    });

    res.setHeader(
      'Set-Cookie',
      `linkedin_session=${encodeURIComponent(sessionPayload)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400${BASE_URL.startsWith('https') ? '; Secure' : ''}`
    );
    return res.redirect(302, '/dashboard');
  } catch (err) {
    console.error('LinkedIn OAuth error:', err);
    res.setHeader('Set-Cookie', CLEAR_STATE_COOKIE);
    return res.redirect(302, '/auth?error=server_error');
  }
}
