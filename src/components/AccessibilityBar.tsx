import React, { useState, useEffect, useCallback } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { cn } from './BaseUI';

const triggerVlibrasButton = () => {
  const btn = document.querySelector('[vw-access-button]');
  if (btn) {
    (btn as HTMLElement).dispatchEvent(new MouseEvent('click', { bubbles: true, view: window }));
  }
};

export const AccessibilityBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVlibrasOpen, setIsVlibrasOpen] = useState(false);
  const { 
    increaseFontSize, 
    decreaseFontSize, 
    resetFontSize, 
    toggleHighContrast, 
    toggleGrayscale,
    highContrast,
    grayscale,
    resetAll
  } = useAccessibility();

  // Detectar quando o usuário fecha o plugin VLibras pelo X
  useEffect(() => {
    const wrapper = document.querySelector('[vw-plugin-wrapper]');
    if (!wrapper) return;

    const isPluginVisible = () => {
      const el = wrapper as HTMLElement;
      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') return false;
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    };

    const checkPluginClosed = () => {
      if (isVlibrasOpen && !isPluginVisible()) {
        setIsVlibrasOpen(false);
      }
    };

    const observer = new MutationObserver(checkPluginClosed);
    observer.observe(wrapper, { attributes: true, attributeFilter: ['style', 'class'], subtree: true });

    const interval = setInterval(checkPluginClosed, 400);
    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [isVlibrasOpen]);

  const handleVlibrasToggle = useCallback(() => {
    if (isVlibrasOpen) {
      triggerVlibrasButton();
      setIsVlibrasOpen(false);
    } else {
      triggerVlibrasButton();
      setIsOpen(false);
      setIsVlibrasOpen(true);
    }
  }, [isVlibrasOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {/* Accessibility Menu */}
      <div className={cn(
        "bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 w-64 transition-all duration-300 transform origin-bottom-right",
        isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4 pointer-events-none"
      )}>
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <i className="bi bi-person-wheelchair text-senac-blue-500"></i>
            Acessibilidade
          </h3>
          <button 
            onClick={() => setIsOpen(false)} 
            className="text-slate-400 hover:text-slate-600 p-1"
            aria-label="Fechar menu de acessibilidade"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="space-y-4">
          {/* Font Size */}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tamanho da Fonte</p>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={decreaseFontSize}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors flex flex-col items-center"
                title="Diminuir fonte"
                aria-label="Diminuir tamanho da fonte"
              >
                <i className="bi bi-dash-lg"></i>
                <span className="text-[10px] font-bold">A-</span>
              </button>
              <button 
                onClick={resetFontSize}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors flex flex-col items-center"
                title="Resetar fonte"
                aria-label="Resetar tamanho da fonte para 100%"
              >
                <i className="bi bi-arrow-counterclockwise"></i>
                <span className="text-[10px] font-bold">100%</span>
              </button>
              <button 
                onClick={increaseFontSize}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors flex flex-col items-center"
                title="Aumentar fonte"
                aria-label="Aumentar tamanho da fonte"
              >
                <i className="bi bi-plus-lg"></i>
                <span className="text-[10px] font-bold">A+</span>
              </button>
            </div>
          </div>

          {/* VLibras - Tradutor de Libras */}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Recursos</p>
            <button 
              onClick={handleVlibrasToggle}
              className={cn(
                "w-full p-3 rounded-xl border flex items-center gap-3 transition-all",
                isVlibrasOpen 
                  ? "bg-senac-blue-500 text-white border-senac-blue-500" 
                  : "bg-white text-slate-700 border-slate-200 hover:border-senac-blue-500"
              )}
              aria-pressed={isVlibrasOpen}
              aria-label={isVlibrasOpen ? "Fechar tradutor VLibras" : "Abrir tradutor VLibras"}
            >
              <i className="bi bi-signpost-split"></i>
              <span className="font-medium text-sm">VLibras (Libras)</span>
              {isVlibrasOpen && <i className="bi bi-check-lg ml-auto"></i>}
            </button>
          </div>

          {/* Visual Modes */}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Modos Visuais</p>
            <div className="space-y-2">
              <button 
                onClick={toggleHighContrast}
                className={cn(
                  "w-full p-3 rounded-xl border flex items-center gap-3 transition-all",
                  highContrast 
                    ? "bg-senac-blue-500 text-white border-senac-blue-500" 
                    : "bg-white text-slate-700 border-slate-200 hover:border-senac-blue-500"
                )}
                aria-pressed={highContrast}
              >
                <i className="bi bi-circle-half"></i>
                <span className="font-medium text-sm">Alto Contraste</span>
                {highContrast && <i className="bi bi-check-lg ml-auto"></i>}
              </button>
              <button 
                onClick={toggleGrayscale}
                className={cn(
                  "w-full p-3 rounded-xl border flex items-center gap-3 transition-all",
                  grayscale 
                    ? "bg-senac-blue-500 text-white border-senac-blue-500" 
                    : "bg-white text-slate-700 border-slate-200 hover:border-senac-blue-500"
                )}
                aria-pressed={grayscale}
              >
                <i className="bi bi-droplet-half"></i>
                <span className="font-medium text-sm">Escala de Cinza</span>
                {grayscale && <i className="bi bi-check-lg ml-auto"></i>}
              </button>
            </div>
          </div>

          <button 
            onClick={resetAll}
            className="w-full py-2 text-xs font-bold text-senac-orange-500 hover:bg-senac-orange-50 rounded-lg transition-colors"
            aria-label="Resetar todas as configurações de acessibilidade"
          >
            Limpar todas as preferências
          </button>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95",
          isOpen ? "bg-senac-orange-500 text-white rotate-90" : "bg-senac-blue-500 text-white"
        )}
        aria-label="Menu de Acessibilidade"
      >
        <i className={cn("bi text-2xl", isOpen ? "bi-x-lg" : "bi-person-wheelchair")}></i>
      </button>
    </div>
  );
};
