import React, { useState } from 'react';
import { Card, Badge, Button, Input } from '../components/BaseUI';

export const IntegracoesPage: React.FC = () => {
  const [linkedInConnected, setLinkedInConnected] = useState(false);

  const systems = [
    { name: 'AVA (Ambiente Virtual)', desc: 'Acesse suas aulas online e materiais.', icon: 'laptop', color: 'bg-blue-500' },
    { name: 'Biblioteca Digital', desc: 'Milhares de livros e periódicos online.', icon: 'book', color: 'bg-emerald-500' },
    { name: 'Office 365', desc: 'Word, Excel, PowerPoint e Teams.', icon: 'microsoft', color: 'bg-indigo-500' },
    { name: 'Email Acadêmico', desc: 'Seu canal oficial de comunicação.', icon: 'envelope-at', color: 'bg-senac-orange-500' },
    { name: 'LinkedIn', desc: 'Conecte seu perfil profissional e acesse vagas.', icon: 'linkedin', color: 'bg-[#0A66C2]' },
    { name: 'Portal de Estágios', desc: 'Vagas e oportunidades de carreira.', icon: 'briefcase', color: 'bg-purple-500' },
    { name: 'Carteirinha Digital', desc: 'Sua identificação estudantil no celular.', icon: 'person-badge', color: 'bg-senac-blue-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Integrações</h1>
          <p className="text-slate-500 mt-1">Acesse todos os sistemas e serviços da universidade.</p>
        </div>
      </div>

      {/* Email Banner */}
      <Card className="bg-gradient-to-r from-senac-blue-500 to-senac-blue-700 text-white p-8 border-none overflow-hidden relative shadow-xl shadow-senac-blue-500/20">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/10">
            <i className="bi bi-envelope-check-fill text-4xl text-senac-orange-500"></i>
          </div>
          <div className="space-y-2 text-center md:text-left flex-1">
            <h2 className="text-2xl font-bold">Seu Email Acadêmico está pronto!</h2>
            <p className="text-senac-blue-100 max-w-lg">Acesse agora seu email <strong>joao.silva@aluno.senac.br</strong> e não perca nenhum comunicado importante.</p>
          </div>
          <Button className="bg-senac-orange-500 hover:bg-senac-orange-600 px-8 shadow-lg shadow-senac-orange-500/30">
            Acessar Outlook
          </Button>
        </div>
      </Card>

      {/* LinkedIn Integration */}
      <Card className="bg-gradient-to-r from-[#0A66C2] to-[#004182] text-white p-8 border-none overflow-hidden relative shadow-xl shadow-[#0A66C2]/20">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/10">
            <i className="bi bi-linkedin text-4xl text-white"></i>
          </div>
          <div className="space-y-2 text-center md:text-left flex-1">
            <h2 className="text-2xl font-bold">
              {linkedInConnected ? 'Sua conta LinkedIn está conectada!' : 'Conecte sua conta LinkedIn'}
            </h2>
            <p className="text-white/90 max-w-lg">
              {linkedInConnected
                ? 'Seu perfil está vinculado ao Portal do Aluno. Atualize suas informações profissionais e expanda sua rede.'
                : 'Vincule seu perfil profissional ao Portal do Aluno para acessar vagas de estágio, networking e oportunidades de carreira.'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {linkedInConnected ? (
              <>
                <Button
                  onClick={() => setLinkedInConnected(false)}
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6"
                >
                  Desconectar
                </Button>
                <Button className="bg-white text-[#0A66C2] hover:bg-white/90 px-6">
                  Ir para LinkedIn
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => setLinkedInConnected(true)}
                  className="bg-white text-[#0A66C2] hover:bg-white/90 px-6 shadow-lg"
                >
                  Conectar conta
                </Button>
                <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6">
                  Criar conta nova
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Systems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systems.map((sys, idx) => (
          <Card key={idx} className="group hover:shadow-lg transition-all border-slate-200 cursor-pointer">
            <div className="flex items-center gap-6">
              <div className={`w-14 h-14 rounded-2xl ${sys.color} text-white flex items-center justify-center shrink-0 shadow-lg shadow-slate-200 group-hover:scale-110 transition-all`}>
                <i className={`bi bi-${sys.icon} text-2xl`}></i>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-lg group-hover:text-senac-blue-500 transition-all">{sys.name}</h3>
                <p className="text-xs text-slate-500 leading-tight">{sys.desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <i className="bi bi-question-circle-fill text-senac-orange-500"></i>
            Dúvidas Frequentes
          </h2>
          <div className="space-y-4">
            {[
              'Como renovar minha matrícula?',
              'Onde encontro meu boleto?',
              'Como solicitar aproveitamento de disciplinas?',
              'Esqueci minha senha do email acadêmico.',
            ].map((q, idx) => (
              <Card key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-all cursor-pointer border-slate-200">
                <span className="text-sm font-bold text-slate-700">{q}</span>
                <i className="bi bi-chevron-right text-slate-300"></i>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <i className="bi bi-megaphone-fill text-senac-orange-500"></i>
            Canais de Atendimento
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-6 text-center space-y-3 border-slate-200 hover:border-senac-blue-500 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-senac-blue-500">
                <i className="bi bi-whatsapp text-2xl"></i>
              </div>
              <h4 className="font-bold text-slate-800">WhatsApp</h4>
              <p className="text-xs text-slate-500">Atendimento rápido e prático.</p>
            </Card>
            <Card className="p-6 text-center space-y-3 border-slate-200 hover:border-senac-blue-500 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-senac-blue-500">
                <i className="bi bi-headset text-2xl"></i>
              </div>
              <h4 className="font-bold text-slate-800">Central 0800</h4>
              <p className="text-xs text-slate-500">Suporte por voz 24h.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
