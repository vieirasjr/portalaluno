import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Alert } from '../components/BaseUI';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      </form>

      <div className="text-center space-y-2">
        <p className="text-xs text-slate-400">
          Problemas com o acesso? <button className="text-senac-blue-500 hover:underline font-semibold">Fale com o suporte</button>
        </p>
        
        <div className="flex items-center gap-3 py-1">
          <div className="h-px bg-slate-100 flex-1"></div>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Usuário de Teste</span>
          <div className="h-px bg-slate-100 flex-1"></div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
          <p className="text-xs text-slate-500">Para testar o portal, utilize:</p>
          <div className="flex items-center justify-center gap-4">
            <div className="text-xs font-bold text-slate-700">Usuário: <span className="text-senac-blue-500">aluno</span></div>
            <div className="text-xs font-bold text-slate-700">Senha: <span className="text-senac-blue-500">123</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
