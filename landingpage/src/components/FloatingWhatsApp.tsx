import React, { useState } from 'react';
import { X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const waLink = "https://wa.me/5551993557167?text=Olá%20Alexandra!%20Gostaria%20de%20tirar%20uma%20dúvida%20e%20pedir%20um%20orçamento%20gratuito.";

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-end gap-2.5">
      {/* Popover Bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white/95 border border-slate-200 text-slate-900 text-xs px-3 py-2 rounded-2xl shadow-lg backdrop-blur-md">
          <div className="flex flex-col">
            <span className="font-semibold text-emerald-700">Atendimento Direto</span>
            <span className="text-slate-600 text-[11px]">Orçamento gratuito no WhatsApp</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 p-0.5 ml-1 rounded"
            aria-label="Fechar aviso"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Alexandra no WhatsApp"
        className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg transition-all hover:scale-105"
      >
        <WhatsAppIcon className="w-6 h-6" />
      </a>
    </div>
  );
};
