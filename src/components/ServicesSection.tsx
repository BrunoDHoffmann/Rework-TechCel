import React, { useState } from 'react';
import {
  Smartphone,
  BatteryCharging,
  Gamepad2,
  Zap,
  Cpu,
  Tablet,
  RefreshCw,
  Camera,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServiceItem } from '../types';
import { WhatsAppIcon } from './WhatsAppIcon';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Smartphone,
  BatteryCharging,
  Gamepad2,
  Zap,
  Cpu,
  Tablet,
  RefreshCw,
  Camera,
};

export const ServicesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'smartphones', label: 'Smartphones & Celulares' },
    { id: 'games', label: 'Controles de Videogame' },
    { id: 'boards', label: 'Micro-solda & Placas' },
    { id: 'tablets', label: 'Tablets & iPads' },
    { id: 'software', label: 'Software & Downgrade' },
  ];

  const filteredServices =
    activeCategory === 'all'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === activeCategory);

  const buildWhatsAppLink = (serviceTitle: string) => {
    const text = `Olá Alexandra! Vi o serviço "${serviceTitle}" no site da Rework TechCel e gostaria de um orçamento sem compromisso.`;
    return `https://wa.me/5551993557167?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="servicos" className="py-16 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-800 bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full">
            Especialidades de Bancada
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2.5">
            Do reparo comum à micro-solda avançada
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2.5 leading-relaxed max-w-2xl mx-auto">
            Seu celular, tablet e controle de videogame são reparados com ferramentas profissionais, bancada antiestática e peças selecionadas.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-cyan-600 text-white shadow-xs font-semibold'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredServices.map((service) => {
            const IconComponent = ICON_MAP[service.iconName] || Smartphone;
            return (
              <div
                key={service.id}
                className="group relative rounded-2xl bg-white border border-slate-200/90 hover:border-cyan-400 p-5 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-md"
              >
                {service.popular && (
                  <span className="absolute top-3.5 right-3.5 bg-cyan-50 text-cyan-800 border border-cyan-200 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    Mais Procurado
                  </span>
                )}

                <div>
                  {/* Icon & Title */}
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-200 flex items-center justify-center mb-3">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Typical Symptoms list */}
                  <div className="mt-3.5 pt-3.5 border-t border-slate-100">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                      Sintomas comuns:
                    </div>
                    <ul className="space-y-1">
                      {service.symptoms.slice(0, 3).map((symp, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-cyan-600 flex-shrink-0 mt-0.5" />
                          <span>{symp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Info & Action */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-600" /> {service.turnaroundTime.split('(')[0]}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                      <Sparkles className="w-3 h-3" /> Orçamento Grátis
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="text-xs font-medium text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-colors flex-1"
                    >
                      Ver detalhes
                    </button>
                    <a
                      href={buildWhatsAppLink(service.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap shadow-xs"
                      title="Pedir Orçamento no WhatsApp"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
                      <span>Orçar</span>
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-5 sm:p-6 relative shadow-2xl space-y-3.5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200">
                  Detalhes do Serviço
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedService.title}</h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg bg-slate-100 text-xs"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {selectedService.fullDesc}
            </p>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Prazo estimado:</span>
                <span className="text-slate-900 font-medium">{selectedService.turnaroundTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Orçamento prévio:</span>
                <span className="text-emerald-700 font-medium">100% Gratuito</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold text-slate-700 mb-1.5">Sintomas atendidos:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {selectedService.symptoms.map((s, idx) => (
                  <div key={idx} className="text-xs text-slate-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-cyan-600 flex-shrink-0" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setSelectedService(null)}
                className="w-1/3 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 py-2.5 rounded-full border border-slate-200 transition-colors"
              >
                Fechar
              </button>
              <a
                href={buildWhatsAppLink(selectedService.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-2/3 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm py-2.5 rounded-full shadow-sm transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span>Orçar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

