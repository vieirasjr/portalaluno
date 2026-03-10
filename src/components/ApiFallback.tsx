import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Exibido quando o React Router recebe uma URL /api/* (ex: /api/linkedin-auth).
 * Isso ocorre em dev com `npm run dev` porque o Vite retorna index.html para todas as rotas.
 * Em produção na Vercel, /api/* é tratado pelas serverless functions antes do SPA.
 */
export const ApiFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
    <div className="max-w-md w-full text-center space-y-4">
      <h1 className="text-lg font-semibold text-slate-800">
        API não disponível em modo desenvolvimento
      </h1>
      <p className="text-sm text-slate-600">
        Para testar o login com LinkedIn localmente, execute <code className="bg-slate-200 px-1.5 py-0.5 rounded text-xs">vercel dev</code> em vez de <code className="bg-slate-200 px-1.5 py-0.5 rounded text-xs">npm run dev</code>.
      </p>
      <p className="text-sm text-slate-600">
        Em produção, o login com LinkedIn funciona normalmente.
      </p>
      <Link
        to="/auth"
        className="inline-block px-4 py-2 bg-senac-blue-500 text-white rounded-lg font-medium hover:bg-senac-blue-600 transition-colors"
      >
        Voltar ao login
      </Link>
    </div>
  </div>
);
