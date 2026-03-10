import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../components/BaseUI';
import { AccessibilityBar } from '../components/AccessibilityBar';

interface LayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-senac-blue-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-senac-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-senac-blue-900/40 rounded-full blur-3xl"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-5">
            <div className="flex justify-center mb-4">
              <img 
                src="/assets/senacmg.png" 
                alt="Logo Senac Minas - Portal do Aluno" 
                className="h-12 w-auto object-contain"
              />
            </div>
            {children}
          </div>
          <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              &copy; 2026 Senac Minas - Portal do Aluno. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
      <AccessibilityBar />
    </div>
  );
};

export const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: 'grid-fill', label: 'Dashboard' },
    { path: '/dashboard/academico', icon: 'book-half', label: 'Acadêmico' },
    { path: '/dashboard/financeiro', icon: 'cash-stack', label: 'Financeiro' },
    { path: '/dashboard/documentos', icon: 'file-earmark-text-fill', label: 'Documentos' },
    { path: '/dashboard/integracoes', icon: 'cpu-fill', label: 'Integrações' },
    { path: '/dashboard/perfil', icon: 'person-fill', label: 'Meu Perfil' },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Desktop */}
      <aside 
        className={cn(
          "bg-senac-blue-500 text-white transition-all duration-300 hidden lg:flex flex-col fixed inset-y-0 left-0 z-50",
          isSidebarOpen ? "w-64" : "w-20"
        )}
        aria-label="Navegação lateral principal"
      >
        <div className="p-6 flex items-center justify-center">
          <img 
            src="/assets/senacmg.png" 
            alt="Logo Senac" 
            className={cn("h-10 w-auto object-contain brightness-0 invert", !isSidebarOpen && "mx-auto")}
          />
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-4 p-3 rounded-xl transition-all group",
                location.pathname === item.path 
                  ? "bg-senac-orange-500 text-white shadow-lg shadow-senac-orange-500/20" 
                  : "text-senac-blue-100 hover:bg-white/10 hover:text-white"
              )}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              <i className={`bi bi-${item.icon} text-lg`} aria-hidden="true"></i>
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
              {!isSidebarOpen && <span className="sr-only">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link 
            to="/auth" 
            className="flex items-center gap-4 p-3 text-senac-blue-100 hover:bg-white/10 hover:text-white rounded-xl transition-all"
            aria-label="Sair do sistema"
          >
            <i className="bi bi-box-arrow-left text-lg" aria-hidden="true"></i>
            {isSidebarOpen && <span className="font-medium">Sair</span>}
          </Link>
        </div>
      </aside>

      {/* Sidebar - Mobile Drawer */}
      <div className={cn(
        "fixed inset-0 bg-senac-blue-900/60 backdrop-blur-sm z-[60] lg:hidden transition-all duration-300",
        isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )} onClick={closeMobileMenu} aria-hidden={!isMobileMenuOpen}>
        <aside 
          className={cn(
            "bg-senac-blue-500 text-white w-64 h-full flex flex-col transition-transform duration-300",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
          aria-label="Menu móvel"
        >
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/assets/senacmg.png" 
                alt="Logo Senac" 
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </div>
            <button 
              onClick={closeMobileMenu} 
              className="p-2 text-white/60"
              aria-label="Fechar menu móvel"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-2 mt-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-xl transition-all",
                  location.pathname === item.path 
                    ? "bg-senac-orange-500 text-white shadow-lg" 
                    : "text-senac-blue-100 hover:bg-white/10 hover:text-white"
                )}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                <i className={`bi bi-${item.icon} text-lg`} aria-hidden="true"></i>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10">
            <Link 
              to="/auth" 
              className="flex items-center gap-4 p-3 text-senac-blue-100 hover:bg-white/10 hover:text-white rounded-xl transition-all"
              aria-label="Sair do sistema"
            >
              <i className="bi bi-box-arrow-left text-lg" aria-hidden="true"></i>
              <span className="font-medium">Sair</span>
            </Link>
          </div>
        </aside>
      </div>

      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        isSidebarOpen ? "lg:ml-64" : "lg:ml-20"
      )}>
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hidden lg:block"
              aria-label={isSidebarOpen ? "Recolher barra lateral" : "Expandir barra lateral"}
            >
              <i className={`bi bi-${isSidebarOpen ? 'text-indent-left' : 'text-indent-right'} text-xl`} aria-hidden="true"></i>
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 lg:hidden"
              aria-label="Abrir menu móvel"
            >
              <i className="bi bi-list text-2xl" aria-hidden="true"></i>
            </button>
            <div className="flex items-center gap-3">
              <img src="/assets/senacmg.png" alt="Logo Senac" className="h-8 w-auto lg:hidden" />
              <h2 className="font-bold text-slate-800 hidden sm:block">Portal do Aluno</h2>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="relative hidden lg:block">
              <label htmlFor="global-search" className="sr-only">Pesquisar no portal</label>
              <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true"></i>
              <input 
                id="global-search"
                type="text" 
                placeholder="Pesquisar..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-senac-blue-500 transition-all"
              />
            </div>
            
            <button 
              className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-all"
              aria-label="Notificações"
            >
              <i className="bi bi-bell text-xl" aria-hidden="true"></i>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-senac-orange-500 rounded-full border-2 border-white"></span>
              <span className="sr-only">Novas notificações disponíveis</span>
            </button>

            <div className="flex items-center gap-3 sm:pl-6 sm:border-l sm:border-slate-200" aria-label="Informações do usuário">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800">João Silva</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Engenharia de Software</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-senac-blue-100 border-2 border-white shadow-sm flex items-center justify-center text-senac-blue-500 font-bold" aria-hidden="true">
                JS
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-8 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
        
        <AccessibilityBar />
      </div>
    </div>
  );
};
