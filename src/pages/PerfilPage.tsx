import React, { useState } from 'react';
import { Card, Badge, Button, Input, Alert } from '../components/BaseUI';

export const PerfilPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Meu Perfil</h1>
          <p className="text-slate-500 mt-1">Gerencie suas informações pessoais e configurações de conta.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant={isEditing ? 'secondary' : 'primary'} 
            className="text-xs"
            onClick={() => setIsEditing(!isEditing)}
          >
            <i className={`bi bi-${isEditing ? 'check-circle' : 'pencil-square'} mr-2`}></i>
            {isEditing ? 'Salvar Alterações' : 'Editar Perfil'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Summary */}
        <div className="space-y-8">
          <Card className="text-center p-8 border-slate-200">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full bg-senac-blue-100 border-4 border-white shadow-lg flex items-center justify-center text-senac-blue-500 text-4xl font-bold overflow-hidden">
                <img src="https://picsum.photos/seed/student1/200/200" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <button className="absolute bottom-1 right-1 w-10 h-10 bg-senac-orange-500 text-white rounded-full border-4 border-white flex items-center justify-center hover:bg-senac-orange-600 transition-all">
                <i className="bi bi-camera-fill"></i>
              </button>
            </div>
            <div className="mt-6 space-y-1">
              <h2 className="text-xl font-bold text-slate-800">João Silva</h2>
              <p className="text-sm text-slate-500 font-medium">Engenharia de Software</p>
              <Badge variant="success">Aluno Ativo</Badge>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Matrícula</p>
                <p className="font-bold text-slate-700">202100456</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Ingresso</p>
                <p className="font-bold text-slate-700">2021/1</p>
              </div>
            </div>
          </Card>

          <Card className="p-0 overflow-hidden border-slate-200">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <i className="bi bi-shield-lock-fill text-senac-blue-500"></i>
                Segurança
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <button 
                onClick={() => setShowPasswordModal(true)}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <i className="bi bi-key-fill text-slate-400 group-hover:text-senac-blue-500"></i>
                  <span className="text-sm font-bold text-slate-700">Alterar Senha</span>
                </div>
                <i className="bi bi-chevron-right text-slate-300"></i>
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all group">
                <div className="flex items-center gap-3">
                  <i className="bi bi-phone-fill text-slate-400 group-hover:text-senac-blue-500"></i>
                  <span className="text-sm font-bold text-slate-700">Autenticação em 2 Fatores</span>
                </div>
                <Badge variant="info">Ativar</Badge>
              </button>
            </div>
          </Card>
        </div>

        {/* Right Column - Forms */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <i className="bi bi-person-vcard-fill text-senac-blue-500"></i>
                Dados Pessoais
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Nome Completo" defaultValue="João Silva" disabled={!isEditing} />
              <Input label="CPF" defaultValue="123.456.789-00" disabled />
              <Input label="Data de Nascimento" defaultValue="15/05/1998" disabled />
              <Input label="RG" defaultValue="MG-12.345.678" disabled />
              <Input label="Email Pessoal" defaultValue="joao.silva@gmail.com" disabled={!isEditing} />
              <Input label="Telefone / WhatsApp" defaultValue="(31) 98888-7777" disabled={!isEditing} />
            </div>
          </Card>

          <Card className="border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <i className="bi bi-geo-alt-fill text-senac-blue-500"></i>
                Endereço Residencial
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Input label="Logradouro" defaultValue="Rua das Flores, 123" disabled={!isEditing} />
              </div>
              <Input label="Bairro" defaultValue="Centro" disabled={!isEditing} />
              <Input label="Cidade" defaultValue="Belo Horizonte" disabled={!isEditing} />
              <Input label="CEP" defaultValue="30123-456" disabled={!isEditing} />
              <Input label="Estado" defaultValue="Minas Gerais" disabled={!isEditing} />
            </div>
          </Card>
        </div>
      </div>

      {/* Password Modal Simulation */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-senac-blue-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <Card className="w-full max-w-md space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">Alterar Senha</h3>
              <button onClick={() => setShowPasswordModal(false)} className="text-slate-400 hover:text-slate-600">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="space-y-4">
              <Input label="Senha Atual" type="password" placeholder="••••••••" />
              <Input label="Nova Senha" type="password" placeholder="••••••••" />
              <Input label="Confirmar Nova Senha" type="password" placeholder="••••••••" />
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setShowPasswordModal(false)}>Cancelar</Button>
              <Button className="flex-1" onClick={() => {
                alert('Senha alterada com sucesso!');
                setShowPasswordModal(false);
              }}>Salvar Senha</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
