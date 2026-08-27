import React from 'react';
import { DollarSign, CheckCircle2, Zap, UserCheck } from 'lucide-react';

export const TrustBanner: React.FC = () => {
  const pillars = [
    {
      icon: DollarSign,
      title: 'Orçamento Gratuito',
      desc: 'Avaliação técnica sem compromisso. Você só realiza o serviço se aprovar.',
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
    },
    {
      icon: CheckCircle2,
      title: 'Diagnóstico Preciso',
      desc: 'Análise minuciosa em bancada para encontrar a causa raiz sem trocar peças à toa.',
      color: 'text-cyan-700',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
    },
    {
      icon: Zap,
      title: 'Agilidade Real',
      desc: 'Reparos comuns no mesmo dia ou em 24h a 72h para serviços minuciosos de micro-solda.',
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
    },
    {
      icon: UserCheck,
      title: 'Atendimento Direto',
      desc: 'Converse direto com a técnica Alexandra, que vai abrir, consertar e testar seu aparelho.',
      color: 'text-sky-700',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
    },
  ];

  return (
    <section id="diferenciais" className="py-6 bg-slate-100/70 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-slate-300 transition-all"
              >
                <div
                  className={`w-9 h-9 rounded-lg ${item.bgColor} ${item.borderColor} border flex items-center justify-center flex-shrink-0 ${item.color}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-xs sm:text-sm text-slate-900">{item.title}</h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

