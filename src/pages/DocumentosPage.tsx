import React from 'react';
import { Card, Badge, Button, Input } from '../components/BaseUI';

export const DocumentosPage: React.FC = () => {
  const documents = [
    { name: 'Histórico Escolar Parcial', type: 'PDF', date: '09/03/2026', status: 'Disponível', icon: 'file-earmark-text' },
    { name: 'Atestado de Matrícula', type: 'PDF', date: '09/03/2026', status: 'Disponível', icon: 'file-earmark-check' },
    { name: 'Plano de Ensino - Cálculo II', type: 'PDF', date: '15/02/2026', status: 'Disponível', icon: 'file-earmark-pdf' },
    { name: 'Certificado de Monitoria', type: 'PDF', date: '10/12/2025', status: 'Disponível', icon: 'patch-check' },
    { name: 'Boletim Semestral 2025/2', type: 'PDF', date: '20/12/2025', status: 'Disponível', icon: 'file-earmark-ruled' },
    { name: 'Contrato de Prestação de Serviços', type: 'PDF', date: '05/01/2026', status: 'Disponível', icon: 'file-earmark-lock' },
  ];

  const handleDownload = (name: string) => {
    alert(`Iniciando download de: ${name}`);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Documentos</h1>
          <p className="text-slate-500 mt-1">Acesse e baixe seus documentos acadêmicos.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="text-xs">
            <i className="bi bi-plus-circle mr-2"></i>
            Solicitar Novo
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-slate-200">
        <div className="relative flex-1">
          <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text" 
            placeholder="Pesquisar documentos..." 
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-senac-blue-500 transition-all outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-lg transition-all">Todos</button>
          <button className="px-4 py-2 text-xs font-bold text-senac-blue-500 bg-senac-blue-50 rounded-lg transition-all">Acadêmicos</button>
          <button className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-lg transition-all">Financeiros</button>
        </div>
      </Card>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc, idx) => (
          <Card key={idx} className="group hover:shadow-md transition-all border-slate-200 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-senac-blue-500/10 flex items-center justify-center text-senac-blue-500 group-hover:bg-senac-blue-500 group-hover:text-white transition-all">
                  <i className={`bi bi-${doc.icon} text-xl`}></i>
                </div>
                <Badge variant="success">{doc.status}</Badge>
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-senac-blue-500 transition-all">{doc.name}</h3>
                <p className="text-xs text-slate-400 mt-1">Atualizado em {doc.date}</p>
              </div>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{doc.type}</span>
              <Button 
                variant="link" 
                className="text-senac-orange-500 font-bold text-xs"
                onClick={() => handleDownload(doc.name)}
              >
                <i className="bi bi-download mr-2"></i>
                Download
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Request Section */}
      <Card className="bg-senac-blue-500 text-white p-8 border-none overflow-hidden relative">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-bold">Precisa de um documento específico?</h2>
            <p className="text-senac-blue-100 max-w-md">Solicite diplomas, certificados de conclusão ou outros documentos oficiais diretamente por aqui.</p>
          </div>
          <Button className="bg-white text-senac-blue-500 hover:bg-senac-blue-50 px-8">
            Abrir Solicitação
          </Button>
        </div>
      </Card>
    </div>
  );
};
