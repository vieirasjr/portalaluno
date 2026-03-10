import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Badge, Button, Input, Select, Counter } from '../components/BaseUI';
import { motion } from 'motion/react';

export const AcademicoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('disciplinas');
  const navigate = useNavigate();

  const tabs = [
    { id: 'disciplinas', label: 'Minhas Disciplinas', icon: 'book' },
    { id: 'notas', label: 'Notas e Faltas', icon: 'journal-check' },
    { id: 'historico', label: 'Histórico Acadêmico', icon: 'clock-history' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Acadêmico</h1>
          <p className="text-slate-500 mt-1">Gerencie suas disciplinas, notas e frequência.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="text-xs">
            <i className="bi bi-file-earmark-pdf mr-2"></i>
            Baixar Histórico
          </Button>
          <Button className="text-xs">
            <i className="bi bi-calendar-check mr-2"></i>
            Calendário
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto no-scrollbar" role="tablist" aria-label="Navegação acadêmica">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${
              activeTab === tab.id 
                ? 'border-senac-orange-500 text-senac-orange-500 bg-senac-orange-50/50' 
                : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <i className={`bi bi-${tab.icon}`} aria-hidden="true"></i>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        <div 
          role="tabpanel" 
          id={`panel-${activeTab}`} 
          aria-labelledby={`tab-${activeTab}`}
        >
          {activeTab === 'disciplinas' && <DisciplinasTab />}
          {activeTab === 'notas' && <NotasTab />}
          {activeTab === 'historico' && <HistoricoTab />}
        </div>
      </div>
    </div>
  );
};

const DisciplinasTab = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Lista de disciplinas">
    {[
      { name: 'Estrutura de Dados', teacher: 'Dr. Ricardo Oliveira', progress: 75, room: 'Lab 04', schedule: 'Seg 08:00' },
      { name: 'Cálculo II', teacher: 'Dra. Maria Helena', progress: 60, room: 'Sala 202', schedule: 'Ter 10:00' },
      { name: 'Banco de Dados', teacher: 'Prof. Carlos Alberto', progress: 90, room: 'Lab 02', schedule: 'Qua 08:00' },
      { name: 'Sistemas Operacionais', teacher: 'Prof. André Santos', progress: 45, room: 'Sala 105', schedule: 'Qui 14:00' },
      { name: 'Engenharia de Requisitos', teacher: 'Dra. Paula Costa', progress: 85, room: 'Sala 301', schedule: 'Sex 08:00' },
      { name: 'Programação Web I', teacher: 'Prof. Felipe Melo', progress: 50, room: 'Lab 01', schedule: 'Sáb 09:00' },
    ].map((item, idx) => (
      <Link 
        key={idx} 
        to={`/dashboard/academico/curso/${idx}`}
        className="block group"
        role="listitem"
        aria-label={`Disciplina: ${item.name}, Professor: ${item.teacher}`}
      >
        <Card className="h-full border-none cursor-pointer">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl bg-senac-blue-500/10 flex items-center justify-center text-senac-blue-500" aria-hidden="true">
                <i className="bi bi-book-fill text-xl"></i>
              </div>
              <Badge variant="info">Em Curso</Badge>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-senac-blue-500 transition-all">{item.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{item.teacher}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <span>Progresso</span>
                <span><Counter value={item.progress} suffix="%" /></span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden" role="progressbar" aria-valuenow={item.progress} aria-valuemin={0} aria-valuemax={100}>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="bg-senac-blue-500 h-full"
                ></motion.div>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1"><i className="bi bi-geo-alt" aria-hidden="true"></i> {item.room}</span>
                <span className="flex items-center gap-1"><i className="bi bi-clock" aria-hidden="true"></i> {item.schedule}</span>
              </div>
              <div className="text-senac-orange-500 group-hover:text-senac-orange-600 transition-colors">
                <i className="bi bi-arrow-right-circle-fill text-xl" aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    ))}
  </div>
);

const NotasTab = () => (
  <Card className="p-0 overflow-hidden">
    <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
      <div className="flex items-center gap-4">
        <Select className="w-48 py-2 text-xs">
          <option>2026/1</option>
          <option>2025/2</option>
          <option>2025/1</option>
        </Select>
        <Input placeholder="Filtrar disciplina..." className="w-64 py-2 text-xs" icon="search" />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-senac-success"></div>
          <span className="text-[10px] font-bold text-slate-500 uppercase">Aprovado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-senac-warning"></div>
          <span className="text-[10px] font-bold text-slate-500 uppercase">Em Curso</span>
        </div>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
          <tr>
            <th className="px-6 py-4">Disciplina</th>
            <th className="px-6 py-4">Faltas</th>
            <th className="px-6 py-4">Frequência</th>
            <th className="px-6 py-4">N1</th>
            <th className="px-6 py-4">N2</th>
            <th className="px-6 py-4">Média</th>
            <th className="px-6 py-4">Situação</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {[
            { name: 'Estrutura de Dados', absences: 2, freq: '96%', n1: 8.5, n2: 9.0, avg: 8.75, status: 'Aprovado' },
            { name: 'Cálculo II', absences: 4, freq: '92%', n1: 7.0, n2: 7.5, avg: 7.25, status: 'Aprovado' },
            { name: 'Banco de Dados', absences: 0, freq: '100%', n1: 9.5, n2: 8.5, avg: 9.0, status: 'Aprovado' },
            { name: 'Sistemas Operacionais', absences: 6, freq: '88%', n1: 6.5, n2: '-', avg: '-', status: 'Em Curso' },
            { name: 'Engenharia de Requisitos', absences: 2, freq: '96%', n1: 8.0, n2: '-', avg: '-', status: 'Em Curso' },
          ].map((row, idx) => (
            <tr key={idx} className="hover:bg-slate-50/50 transition-all">
              <td className="px-6 py-4 text-sm font-bold text-slate-700">{row.name}</td>
              <td className="px-6 py-4 text-sm text-slate-500">{row.absences}</td>
              <td className="px-6 py-4 text-sm font-bold text-slate-600">{row.freq}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{row.n1}</td>
              <td className="px-6 py-4 text-sm text-slate-600">{row.n2}</td>
              <td className="px-6 py-4 text-sm font-bold text-senac-blue-500">{row.avg}</td>
              <td className="px-6 py-4">
                <Badge variant={row.status === 'Aprovado' ? 'success' : 'warning'}>{row.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);

const HistoricoTab = () => (
  <div className="space-y-6">
    {[
      { semester: '2025/2', gpa: 8.9, subjects: 6, status: 'Concluído' },
      { semester: '2025/1', gpa: 8.5, subjects: 6, status: 'Concluído' },
      { semester: '2024/2', gpa: 8.2, subjects: 5, status: 'Concluído' },
    ].map((sem, idx) => (
      <Card key={idx} className="flex items-center justify-between p-6 border-none cursor-pointer">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-senac-blue-500 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-senac-blue-500/30">
            {sem.semester.split('/')[1]}º
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Semestre {sem.semester}</h3>
            <p className="text-sm text-slate-500">{sem.subjects} disciplinas cursadas</p>
          </div>
        </div>
        <div className="flex items-center gap-12">
          <div className="text-center">
            <p className="text-xs text-slate-400 font-bold uppercase">Média Semestral</p>
            <p className="text-xl font-bold text-senac-blue-500">
              <Counter value={sem.gpa} decimals={1} />
            </p>
          </div>
          <div className="text-right">
            <Badge variant="success">{sem.status}</Badge>
            <p className="text-[10px] text-slate-400 mt-1">Ver detalhes <i className="bi bi-chevron-right"></i></p>
          </div>
        </div>
      </Card>
    ))}
  </div>
);
