import React, { useState, useEffect } from 'react';
import { Wrench, Phone, Menu, X, Clock, MapPin, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeaderProps {
  onOpenBudgetModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBudgetModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const waLink = "https://wa.me/5551993557167?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento%20gratuito%20para%20o%20meu%20aparelho.";

  return (
    <>
      {/* Top micro-banner */}
      <div className="bg-slate-100/90 text-slate-600 border-b border-slate-200/80 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1 text-cyan-700 font-medium whitespace-nowrap">
              <MapPin className="w-3.5 h-3.5" /> Sapucaia do Sul · RS
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-600 whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" /> Orçamento 100% Gratuito
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-600 whitespace-nowrap">
              <Clock className="w-3.5 h-3.5 text-amber-600" /> Reparos em 24h a 72h
            </span>
          </div>
          <div className="flex items-center gap-3 whitespace-nowrap text-xs">
            <a
              href="tel:+5551993557167"
              className="text-slate-600 hover:text-cyan-700 transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-cyan-600" /> (51) 99355-7167
            </a>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-mono text-[11px] whitespace-nowrap">CNPJ: 67.210.226/0001-98</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-2.5'
            : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/60 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Brand Logo - Single line constraint strictly applied */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-cyan-600/10 border border-cyan-500/20 text-cyan-700 flex items-center justify-center font-bold shadow-xs transition-transform group-hover:scale-105 shrink-0">
              <Wrench className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="font-display font-bold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-cyan-700 transition-colors whitespace-nowrap">
                Rework TechCel
              </span>
              <span className="hidden sm:inline-block text-[10px] font-medium tracking-wide bg-cyan-50 text-cyan-700 border border-cyan-200 px-2 py-0.5 rounded-full whitespace-nowrap">
                Assistência Especializada
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6 text-xs font-medium text-slate-600">
            <a href="#servicos" className="hover:text-cyan-700 transition-colors whitespace-nowrap">
              Serviços
            </a>
            <a href="#simulador" className="hover:text-cyan-700 transition-colors whitespace-nowrap">
              Simulador
            </a>
            <a href="#diferenciais" className="hover:text-cyan-700 transition-colors whitespace-nowrap">
              Diferenciais
            </a>
            <a href="#comofunciona" className="hover:text-cyan-700 transition-colors whitespace-nowrap">
              Como Funciona
            </a>
            <a href="#sobre" className="hover:text-cyan-700 transition-colors whitespace-nowrap">
              A Técnica
            </a>
            <a href="#avaliacoes" className="hover:text-cyan-700 transition-colors whitespace-nowrap">
              Avaliações
            </a>
            <a href="#localizacao" className="hover:text-cyan-700 transition-colors whitespace-nowrap">
              Localização
            </a>
          </nav>

          {/* Action CTA Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {onOpenBudgetModal && (
              <button
                onClick={onOpenBudgetModal}
                className="text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 px-3.5 py-2 rounded-full transition-all whitespace-nowrap shrink-0"
              >
                Simular Defeito
              </button>
            )}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100/90 text-emerald-800 border border-emerald-300 font-medium text-xs px-3.5 py-2 rounded-full transition-all whitespace-nowrap shrink-0 shadow-xs"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Pedir Orçamento</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden text-slate-600 hover:text-slate-900 p-2 rounded-full bg-slate-100 border border-slate-200 transition-colors"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 pt-3 pb-5 space-y-1.5 mt-2 animate-in fade-in slide-in-from-top-2 shadow-lg">
            <a
              href="#servicos"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl whitespace-nowrap"
            >
              Serviços
            </a>
            <a
              href="#simulador"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl whitespace-nowrap"
            >
              Simulador de Orçamento
            </a>
            <a
              href="#diferenciais"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl whitespace-nowrap"
            >
              Diferenciais
            </a>
            <a
              href="#comofunciona"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl whitespace-nowrap"
            >
              Como Funciona
            </a>
            <a
              href="#sobre"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl whitespace-nowrap"
            >
              A Técnica (Alexandra Dubal)
            </a>
            <a
              href="#avaliacoes"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl whitespace-nowrap"
            >
              Avaliações de Clientes
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl whitespace-nowrap"
            >
              Dúvidas Frequentes
            </a>
            <a
              href="#localizacao"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-xl whitespace-nowrap"
            >
              Localização & Mapa
            </a>
            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-medium text-sm py-2.5 rounded-full shadow-xs transition-all whitespace-nowrap"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Pedir Orçamento no WhatsApp</span>
              </a>
              <a
                href="tel:+5551993557167"
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs py-2 rounded-full border border-slate-200 transition-colors whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-600" />
                <span className="whitespace-nowrap">Ligar: (51) 99355-7167</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
