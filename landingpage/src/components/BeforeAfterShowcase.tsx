import React, { useState } from 'react';
import { Sparkles, Gamepad2, Smartphone, Cpu, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface CaseStudy {
  id: string;
  category: string;
  title: string;
  device: string;
  icon: React.ComponentType<{ className?: string }>;
  before: {
    title: string;
    description: string;
    badge: string;
  };
  after: {
    title: string;
    description: string;
    badge: string;
  };
  solution: string;
  timeSpent: string;
}

const CASES: CaseStudy[] = [
  {
    id: 'case-ps5',
    category: 'Controle de Videogame',
    title: 'Drift Severo no Analógico Esquerdo',
    device: 'Controle PS5 DualSense',
    icon: Gamepad2,
    before: {
      title: 'Mira e boneco andando sozinhos',
      description: 'Potenciômetro de carbono com trilha gasta após 8 meses de uso intenso no FPS. Jogador não conseguia mirar.',
      badge: 'Defeito Crítico',
    },
    after: {
      title: 'Analógico Hall Effect com Sensor Magnético',
      description: 'Substituição completa por módulo magnético sem atrito físico (anti-drift permanente), com calibração digital precisa.',
      badge: '100% Calibrado',
    },
    solution: 'Dessolda precisa com estação de ar quente, instalação de módulo magnético Hall Effect e calibração de software.',
    timeSpent: '24 horas',
  },
  {
    id: 'case-phone',
    category: 'Smartphone',
    title: 'Tela Trincada e Display com Mancha Preta',
    device: 'Samsung Galaxy / iPhone',
    icon: Smartphone,
    before: {
      title: 'Vidro estilhaçado e toque cego',
      description: 'Queda de quina que quebrou o vidro frontal e danificou as linhas de LED do painel.',
      badge: 'Sem Visibilidade',
    },
    after: {
      title: 'Display Premium com Brilho Original',
      description: 'Painel novo com taxa de atualização suave, cores fiéis, touch 100% calibrado e vedação anti-poeira nova.',
      badge: 'Como Novo de Fábrica',
    },
    solution: 'Abertura térmica cuidadosa, troca do módulo frontal premium, higienização interna e aplicação de fita adesiva original.',
    timeSpent: '3 horas',
  },
  {
    id: 'case-board',
    category: 'Micro-solda em Placa',
    title: 'Celular Molhado que não Ligava (Curto na Placa)',
    device: 'Motorola / Xiaomi',
    icon: Cpu,
    before: {
      title: 'Aparelho apagado após contato com água',
      description: 'Oxidação em capacitores da linha VDD_MAIN impedindo a inicialização do aparelho. Outra loja sugeriu trocar placa inteira.',
      badge: 'Condenado por Terceiros',
    },
    after: {
      title: 'Placa Recuperada e Dados Salvos',
      description: 'Celular voltou a inicializar normalmente, mantendo todas as fotos, conversas e arquivos intactos do cliente.',
      badge: 'Dados Preservados',
    },
    solution: 'Desoxidação em cuba ultrassônica, localização de capacitor em curto com câmera térmica e substituição sob microscópio.',
    timeSpent: '48 horas',
  },
];

export const BeforeAfterShowcase: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CASES[0].id);

  const currentCase = CASES.find((c) => c.id === selectedCaseId) || CASES[0];
  const Icon = currentCase.icon;

  return (
    <section className="py-20 bg-slate-100/60 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full">
            Casos Reais de Bancada
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            O que chega com defeito sai funcionando como novo
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Veja exemplos práticos de como tratamos e recuperamos aparelhos no nosso laboratório em Sapucaia do Sul.
          </p>
        </div>

        {/* Case selector buttons */}
        <div className="flex justify-center flex-wrap gap-2 mb-8">
          {CASES.map((c) => {
            const CaseIcon = c.icon;
            const isSelected = c.id === selectedCaseId;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCaseId(c.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-cyan-600 text-white font-semibold shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <CaseIcon className="w-3.5 h-3.5" />
                <span>{c.device}</span>
              </button>
            );
          })}
        </div>

        {/* Comparison Showcase Container */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-md">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-800">
                  {currentCase.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{currentCase.title}</h3>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="bg-slate-50 px-3 py-1 rounded-full text-slate-600 border border-slate-200">
                <span className="text-slate-500">Tempo de bancada:</span>{' '}
                <strong className="text-slate-900 font-semibold">{currentCase.timeSpent}</strong>
              </div>
            </div>
          </div>

          {/* Comparison Cards: Before vs After */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
            
            {/* Before (Estado Inicial) */}
            <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-800 bg-rose-100 border border-rose-200 px-2 py-0.5 rounded-full">
                    Antes / Sintoma
                  </span>
                  <span className="text-[11px] font-medium text-rose-700">
                    {currentCase.before.badge}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mt-1">
                  {currentCase.before.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentCase.before.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-rose-200/80 text-xs text-rose-700 font-medium">
                ❌ Inutilizável ou com alto risco de perda do aparelho
              </div>
            </div>

            {/* After (Resultado Rework TechCel) */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Depois / Restaurado
                  </span>
                  <span className="text-[11px] font-medium text-emerald-700">
                    {currentCase.after.badge}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mt-1">
                  {currentCase.after.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {currentCase.after.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-200/80 text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> 100% testado na bancada e pronto para uso
              </div>
            </div>

          </div>

          {/* Procedure detail */}
          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
            <span className="font-semibold text-cyan-800 shrink-0">Técnica aplicada:</span>
            <span>{currentCase.solution}</span>
          </div>

        </div>

      </div>
    </section>
  );
};
