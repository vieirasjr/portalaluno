import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Input, Alert } from '../components/BaseUI';

const LINKEDIN_CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID || '86g440h70x7s0h';
const LINKEDIN_SCOPES = 'openid profile email';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('aluno');
  const [password, setPassword] = useState('123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const err = searchParams.get('error');
    if (err) {
      const messages: Record<string, string> = {
        missing_code: 'Autorização incompleta. Tente novamente.',
        token_exchange: 'Erro ao conectar com LinkedIn. Tente novamente.',
        userinfo: 'Não foi possível obter seus dados do LinkedIn.',
        server_config: 'Login com LinkedIn temporariamente indisponível.',
        server_error: 'Erro no servidor. Tente mais tarde.',
        invalid_state: 'Sessão inválida. Tente novamente.',
      };
      setError(messages[err] || 'Erro ao entrar com LinkedIn.');
    }
  }, [searchParams]);

  const handleLinkedInLogin = () => {
    const redirectUri = `${window.location.origin}/api/linkedin-callback`;
    const state = crypto.randomUUID();
    document.cookie = `linkedin_oauth_state=${state}; path=/; max-age=600; SameSite=Lax`;
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: LINKEDIN_CLIENT_ID,
      redirect_uri: redirectUri,
      scope: LINKEDIN_SCOPES,
      state,
    });
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login delay
    setTimeout(() => {
      if (username === 'aluno' && password === '123') {
        navigate('/dashboard');
      } else {
        setError('Usuário ou senha incorretos. Tente novamente.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h1 className="text-xl font-bold text-senac-blue-500">Acesse seu Portal</h1>
        <p className="text-sm text-slate-500">Insira suas credenciais para continuar</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-3">
        <Input
          label="Usuário"
          placeholder="Digite seu usuário"
          icon="person-fill"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          icon="lock-fill"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">
            <input type="checkbox" className="rounded border-slate-300 text-senac-blue-500 focus:ring-senac-blue-500" />
            Lembrar-me
          </label>
          <button type="button" className="text-xs text-senac-blue-500 hover:underline font-semibold">
            Esqueci minha senha
          </button>
        </div>

        {error && <Alert variant="error">{error}</Alert>}

        <Button 
          type="submit" 
          className="w-full" 
          isLoading={isLoading}
        >
          Entrar no Portal
        </Button>

        <div className="flex items-center gap-3 py-1">
          <div className="h-px bg-slate-200 flex-1"></div>
          <span className="text-xs text-slate-400 font-medium">ou</span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        <button
          type="button"
          onClick={handleLinkedInLogin}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border-2 border-[#0A66C2] bg-[#0A66C2] text-white hover:bg-[#004182] hover:border-[#004182] transition-all font-semibold text-sm"
        >
          <i className="bi bi-linkedin text-xl"></i>
          Entrar com LinkedIn
        </button>
      </form>

      <div className="text-center">
        <p className="text-xs text-slate-400">
          Problemas com o acesso? <button className="text-senac-blue-500 hover:underline font-semibold">Fale com o suporte</button>
        </p>
      </div>
    </div>
  );
};
