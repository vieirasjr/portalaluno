import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Endpoint de diagnóstico - mostra o redirect_uri que será usado.
 * Use para verificar se está igual ao configurado no LinkedIn.
 * REMOVER ou desativar após configurar.
 */
export default function handler(_req: VercelRequest, res: VercelResponse) {
  const BASE_URL = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.APP_URL || 'http://localhost:3000';

  const redirectUri = `${BASE_URL}/api/linkedin-callback`;

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    redirect_uri: redirectUri,
    base_url: BASE_URL,
    vercel_url: process.env.VERCEL_URL || '(não definido)',
    instrucao: 'Adicione este redirect_uri EXATAMENTE nas Authorized redirect URLs do LinkedIn',
  });
}
