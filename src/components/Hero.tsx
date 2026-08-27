import React from 'react';
import {
  Sparkles,
  Phone,
  Gamepad2,
  Smartphone,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Clock,
  Zap
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface HeroProps {
  onScrollToSimulator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToSimulator }) => {
  const waLink = "https://wa.me/5551993557167?text=Olá%20Alexandra!%20Vi%20a%20página%20da%20Rework%20TechCel%20e%20gostaria%20de%20um%20orçamento%20para%20o%20meu%20aparelho.";

  return (
    <section className="relative pt-6 pb-14 lg:pt-10 lg:pb-20 overflow-hidden bg-slate-50">
      {/* Subtle Soft Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-cyan-100/40 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Location & Trust Tag */}
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1 text-xs text-slate-700 shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-cyan-800">Sapucaia do Sul · RS</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">Bancada Técnica Especializada</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Conserto especializado do seu{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 via-sky-600 to-blue-700">
                celular, tablet e controle de videogame
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Troca de telas com toque preciso, baterias novas, solução para{' '}
              <strong className="text-slate-900 font-medium">drift em controles (PS5, Xbox, Switch)</strong>, micro-solda em placas e software. 
              Atendimento direto com a técnica <strong className="text-cyan-800 font-medium">Alexandra Dubal</strong>, sem intermediários e com{' '}
              <span className="text-emerald-700 font-medium">orçamento 100% gratuito</span>.
            </p>

            {/* Soft, Semi-Transparent, Rounded, Smaller Action CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full shadow-sm transition-all whitespace-nowrap"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Pedir Orçamento Grátis</span>
              </a>

              <button
                onClick={onScrollToSimulator}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-medium text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full border border-slate-300 shadow-xs transition-all whitespace-nowrap"
              >
                <span className="whitespace-nowrap">Simular Defeito</span>
                <ArrowRight className="w-3.5 h-3.5 text-cyan-600" />
              </button>

              <a
                href="tel:+5551993557167"
                className="inline-flex items-center justify-center gap-1.5 text-slate-600 hover:text-slate-900 text-xs px-3 py-2 rounded-full transition-colors sm:hidden border border-slate-200"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-600" />
                <span>(51) 99355-7167</span>
              </a>
            </div>

            {/* Quick Highlights List */}
            <div className="pt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600 border-t border-slate-200">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Orçamento 100% sem custo</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0" />
                <span>Atendimento direto com a técnica</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                <span>Reparos em 24h a 72h</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Device & Technical Bench Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              <div className="relative rounded-2xl bg-white p-5 sm:p-6 border border-slate-200/90 shadow-xl">
                
                {/* Header of the bench card */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-50 border border-cyan-200 text-cyan-700 flex items-center justify-center">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-xs sm:text-sm font-bold text-slate-900 whitespace-nowrap">Bancada de Manutenção</h2>
                      <p className="text-[10px] text-slate-500 whitespace-nowrap">Rework TechCel · Sapucaia do Sul</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Atendimento Ativo
                  </span>
                </div>

                {/* Specialties preview pills */}
                <div className="space-y-2.5 mb-4">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-sky-100 text-sky-700 mt-0.5">
                      <Smartphone className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-semibold text-slate-900">Smartphones & iPhones</h3>
                        <span className="text-[10px] text-cyan-700 font-medium">Telas & Baterias</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Telas Premium, desoxidação, troca de conectores Tipo-C e Lightning.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700 mt-0.5">
                      <Gamepad2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-semibold text-slate-900">Controles de Videogame</h3>
                        <span className="text-[10px] text-purple-700 font-medium">Anti-Drift Hall Effect</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        PS5 DualSense, PS4, Xbox Series/One, Switch. Calibração digital.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-amber-100 text-amber-700 mt-0.5">
                      <Cpu className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-semibold text-slate-900">Micro-soldagem em Placas</h3>
                        <span className="text-[10px] text-amber-700 font-medium">Sob Microscópio</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Diagnóstico de curto, troca de CI de carga e restauração de circuitos.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom stats highlight */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/70">
                    <div className="text-sm font-bold text-cyan-700">R$ 0,00</div>
                    <div className="text-[10px] text-slate-500">Orçamento</div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/70">
                    <div className="text-sm font-bold text-slate-900">24h a 72h</div>
                    <div className="text-[10px] text-slate-500">Prazo Médio</div>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-200/70">
                    <div className="text-sm font-bold text-emerald-700">Direto</div>
                    <div className="text-[10px] text-slate-500">Com a Técnica</div>
                  </div>
                </div>

              </div>

              {/* Floating review badge */}
              <div className="absolute -bottom-3 -left-2 sm:-left-4 bg-white border border-slate-200/90 rounded-xl p-2.5 shadow-lg flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs">
                    {'★'.repeat(5)}
                    <span className="text-slate-800 font-semibold text-[11px] ml-1">5.0</span>
                  </div>
                  <p className="text-[10px] text-slate-600 font-medium">Clientes atendidos em Sapucaia</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
