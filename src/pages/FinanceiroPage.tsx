import React, { useState } from 'react';
import { Card, Badge, Button, Alert, Counter } from '../components/BaseUI';

export const FinanceiroPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('boletos');

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Financeiro</h1>
          <p className="text-slate-500 mt-1">Gerencie suas mensalidades e pagamentos.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="text-xs">
            <i className="bi bi-file-earmark-text mr-2"></i>
            Declaração de Quitação
          </Button>
          <Button className="text-xs">
            <i className="bi bi-credit-card mr-2"></i>
            Cartão de Crédito
          </Button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-senac-blue-500 text-white border-none shadow-lg shadow-senac-blue-500/20">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Saldo Devedor</span>
              <i className="bi bi-wallet2 text-senac-orange-500"></i>
            </div>
            <p className="text-3xl font-bold">R$ <Counter value={0} /></p>
            <div className="flex items-center gap-2 text-xs font-bold text-senac-success">
              <i className="bi bi-check-circle-fill"></i>
              <span>Tudo em dia!</span>
            </div>
          </div>
        </Card>

        <Card className="border-none">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Próxima Mensalidade</span>
              <i className="bi bi-calendar-event text-senac-blue-500"></i>
            </div>
            <p className="text-3xl font-bold text-slate-800">R$ <Counter value={850} decimals={2} /></p>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <i className="bi bi-clock"></i>
              <span>Vencimento: 05/04/2026</span>
            </div>
          </div>
        </Card>

        <Card className="border-none">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Bolsa / Desconto</span>
              <i className="bi bi-percent text-senac-orange-500"></i>
            </div>
            <p className="text-3xl font-bold text-slate-800"><Counter value={15} suffix="%" /></p>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <i className="bi bi-tag-fill"></i>
              <span>Bolsa Mérito Acadêmico</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto no-scrollbar">
        {[
          { id: 'boletos', label: 'Boletos em Aberto', icon: 'file-earmark-pdf' },
          { id: 'historico', label: 'Histórico de Pagamentos', icon: 'clock-history' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all whitespace-nowrap border-b-2 ${
              activeTab === tab.id 
                ? 'border-senac-orange-500 text-senac-orange-500 bg-senac-orange-50/50' 
                : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <i className={`bi bi-${tab.icon}`}></i>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === 'boletos' && (
          <div className="space-y-6">
            <Alert variant="info">
              O boleto de abril já está disponível para pagamento antecipado com 5% de desconto adicional.
            </Alert>
            
            <Card className="p-0 overflow-hidden border-none">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Mês de Referência</th>
                      <th className="px-6 py-4">Vencimento</th>
                      <th className="px-6 py-4">Valor</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { month: 'Abril / 2026', due: '05/04/2026', value: 850.00, status: 'Aberto' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-all">
                        <td className="px-6 py-4 text-sm font-bold text-slate-700">{row.month}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{row.due}</td>
                        <td className="px-6 py-4 text-sm font-bold text-senac-blue-500">R$ {row.value.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <Badge variant="warning">{row.status}</Badge>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <Button variant="icon" className="text-senac-blue-500" title="Ver Boleto">
                            <i className="bi bi-file-earmark-pdf"></i>
                          </Button>
                          <Button variant="icon" className="text-senac-orange-500" title="Copiar Código">
                            <i className="bi bi-clipboard"></i>
                          </Button>
                          <Button variant="icon" className="text-senac-success" title="Pagar com Cartão">
                            <i className="bi bi-credit-card"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'historico' && (
          <Card className="p-0 overflow-hidden border-none">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Mês de Referência</th>
                    <th className="px-6 py-4">Data de Pagamento</th>
                    <th className="px-6 py-4">Valor Pago</th>
                    <th className="px-6 py-4">Forma de Pagamento</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Comprovante</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { month: 'Março / 2026', date: '04/03/2026', value: 850.00, method: 'Boleto Bancário', status: 'Pago' },
                    { month: 'Fevereiro / 2026', date: '05/02/2026', value: 850.00, method: 'Cartão de Crédito', status: 'Pago' },
                    { month: 'Janeiro / 2026', date: '05/01/2026', value: 850.00, method: 'Boleto Bancário', status: 'Pago' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-all">
                      <td className="px-6 py-4 text-sm font-bold text-slate-700">{row.month}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{row.date}</td>
                      <td className="px-6 py-4 text-sm font-bold text-senac-blue-500">R$ {row.value.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{row.method}</td>
                      <td className="px-6 py-4">
                        <Badge variant="success">{row.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="icon" className="text-slate-400 hover:text-senac-blue-500">
                          <i className="bi bi-download"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
