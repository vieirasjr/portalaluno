import React from 'react';
import { motion } from 'motion/react';
import { Card, Badge, Button, Counter } from '../components/BaseUI';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Olá, João!</h1>
          <p className="text-slate-500 mt-1">Bem-vindo ao seu portal acadêmico. Confira o resumo do seu semestre.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Matrícula</p>
            <p className="font-bold text-senac-blue-500">202100456</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Semestre</p>
            <p className="font-bold text-senac-blue-500">5º Período</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="region" aria-label="Estatísticas gerais">
        <Card className="flex flex-col gap-2" role="status" aria-labelledby="stat-freq">
          <div className="flex items-center justify-between">
            <span id="stat-freq" className="text-xs font-bold text-slate-400 uppercase">Frequência Geral</span>
            <i className="bi bi-person-check text-senac-blue-500" aria-hidden="true"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            <Counter value={92} suffix="%" />
          </p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden" role="progressbar" aria-valuenow={92} aria-valuemin={0} aria-valuemax={100}>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "92%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="bg-senac-blue-500 h-full"
            ></motion.div>
          </div>
        </Card>

        <Card className="flex flex-col gap-2" role="status" aria-labelledby="stat-media">
          <div className="flex items-center justify-between">
            <span id="stat-media" className="text-xs font-bold text-slate-400 uppercase">Média Global</span>
            <i className="bi bi-star-fill text-senac-orange-500" aria-hidden="true"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            <Counter value={8.7} decimals={1} />
          </p>
          <p className="text-[10px] text-senac-success font-bold">+0,3 em relação ao semestre anterior</p>
        </Card>

        <Card className="flex flex-col gap-2" role="status" aria-labelledby="stat-finance">
          <div className="flex items-center justify-between">
            <span id="stat-finance" className="text-xs font-bold text-slate-400 uppercase">Financeiro</span>
            <i className="bi bi-check-circle-fill text-senac-success" aria-hidden="true"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">Regular</p>
          <p className="text-[10px] text-slate-400 font-bold">Próximo vencimento: 05/04</p>
        </Card>

        <Card className="flex flex-col gap-2" role="status" aria-labelledby="stat-disciplinas">
          <div className="flex items-center justify-between">
            <span id="stat-disciplinas" className="text-xs font-bold text-slate-400 uppercase">Disciplinas</span>
            <i className="bi bi-book-fill text-senac-blue-300" aria-hidden="true"></i>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            <Counter value={6} />
          </p>
          <p className="text-[10px] text-slate-400 font-bold">Todas em andamento</p>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Course Progress */}
          <Card className="p-0 overflow-hidden" role="region" aria-labelledby="course-progress-title">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 id="course-progress-title" className="font-bold text-slate-800 flex items-center gap-2">
                <i className="bi bi-mortarboard-fill text-senac-blue-500" aria-hidden="true"></i>
                Curso em Andamento
              </h3>
              <Badge variant="success">Ativo</Badge>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-slate-800">Engenharia de Software</p>
                  <p className="text-sm text-slate-500">Bacharelado | Turno Noturno</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-senac-blue-500">
                    <Counter value={65} suffix="%" />
                  </p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Concluído</p>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden" role="progressbar" aria-valuenow={65} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso do curso">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "65%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="bg-senac-blue-500 h-full shadow-inner"
                ></motion.div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div className="text-center p-3 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-400 font-bold uppercase">Créditos</p>
                  <p className="font-bold text-slate-700">120/180</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-400 font-bold uppercase">Horas AC</p>
                  <p className="font-bold text-slate-700">45/100</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-400 font-bold uppercase">Previsão</p>
                  <p className="font-bold text-slate-700">Dez/2027</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Grades */}
          <Card className="p-0 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <i className="bi bi-journal-check text-senac-blue-500"></i>
                Últimas Notas Lançadas
              </h3>
              <Button variant="link" className="text-xs font-bold">Ver Histórico</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Disciplina</th>
                    <th className="px-6 py-4">Avaliação</th>
                    <th className="px-6 py-4">Nota</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { subject: 'Estrutura de Dados', exam: 'Prova 01', score: 8.5, status: 'Aprovado' },
                    { subject: 'Cálculo II', exam: 'Trabalho Semestral', score: 7.2, status: 'Aprovado' },
                    { subject: 'Banco de Dados', exam: 'Prova 02', score: 9.0, status: 'Aprovado' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-all">
                      <td className="px-6 py-4 text-sm font-bold text-slate-700">{row.subject}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{row.exam}</td>
                      <td className="px-6 py-4 text-sm font-bold text-senac-blue-500">{row.score.toFixed(1)}</td>
                      <td className="px-6 py-4">
                        <Badge variant="success">{row.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Announcements */}
          <Card className="p-0 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <i className="bi bi-megaphone-fill text-senac-orange-500"></i>
                Avisos e Comunicados
              </h3>
            </div>
            <div className="p-6 space-y-6">
              {[
                { title: 'Inscrições para Monitoria', date: '09/03/2026', category: 'Acadêmico', icon: 'person-plus' },
                { title: 'Boleto de Março Disponível', date: '05/03/2026', category: 'Financeiro', icon: 'cash' },
                { title: 'Palestra: IA no Mercado', date: '01/03/2026', category: 'Eventos', icon: 'calendar-event' },
              ].map((ann, idx) => (
                <div key={idx} className="flex gap-4 group cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-senac-blue-500 group-hover:text-white transition-all">
                    <i className={`bi bi-${ann.icon}`}></i>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{ann.category}</span>
                      <span className="text-[10px] text-slate-400">{ann.date}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-700 leading-tight group-hover:text-senac-blue-500 transition-all">{ann.title}</p>
                  </div>
                </div>
              ))}
              <Button variant="secondary" className="w-full text-xs py-2">Ver todos os avisos</Button>
            </div>
          </Card>

          {/* Quick Shortcuts */}
          <Card className="bg-senac-blue-500 text-white p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <i className="bi bi-lightning-charge-fill text-senac-orange-500"></i>
              Atalhos Rápidos
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Boletos', icon: 'file-earmark-pdf' },
                { label: 'Horários', icon: 'clock' },
                { label: 'Biblioteca', icon: 'book' },
                { label: 'Suporte', icon: 'headset' },
              ].map((item, idx) => (
                <button key={idx} className="flex flex-col items-center justify-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/5">
                  <i className={`bi bi-${item.icon} text-xl`}></i>
                  <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
