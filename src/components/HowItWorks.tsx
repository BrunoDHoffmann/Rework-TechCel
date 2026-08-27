import React from 'react';
import { Search, Wrench, CheckCircle, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: WhatsAppIcon,
      title: 'Você Chama no WhatsApp',
      desc: 'Mande uma mensagem contando o que aconteceu com o aparelho (marca, modelo e defeito).',
    },
    {
      step: '02',
      icon: Search,
      title: 'Diagnóstico & Orçamento Sem Custo',
      desc: 'Avaliamos tecnicamente na bancada e informamos o valor exato. Você só realiza se aprovar.',
    },
    {
      step: '03',
      icon: Wrench,
      title: 'Reparo com Peças Selecionadas',
      desc: 'Executamos o conserto com ferramentas antiestáticas, microscópio e peças de alta qualidade.',
    },
    {
      step: '04',
      icon: CheckCircle,
      title: 'Testes Finais e Entrega',
      desc: 'Fazemos uma bateria de testes completa e entregamos seu equipamento 100% pronto para uso.',
    },
  ];

  const waLink = "https://wa.me/5551993557167?text=Olá%20Alexandra!%20Gostaria%20de%20iniciar%20um%20orçamento%20para%20o%20meu%20aparelho.";

  return (
    <section id="comofunciona" className="py-16 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-800 bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full">
            Passo a Passo
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2.5">
            Como funciona o conserto do seu aparelho
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed max-w-2xl mx-auto">
            Processo ágil, direto com a técnica e 100% transparente do início ao fim.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-white border border-slate-200/90 p-5 flex flex-col justify-between hover:border-cyan-400 transition-all shadow-xs hover:shadow-md"
              >
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-bold text-slate-300">
                    {item.step}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] font-semibold text-cyan-800 flex items-center gap-1">
                  <span>Passo {idx + 1} de 4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick CTA Banner under steps */}
        <div className="mt-10 rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-slate-900">
              Pronto para recuperar seu aparelho?
            </h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Fale diretamente com a Alexandra no WhatsApp e tire todas as suas dúvidas.
            </p>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full shadow-xs transition-all whitespace-nowrap"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Falar no WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
