import React from 'react';
import {
  Wrench,
  CheckCircle2,
  Award,
  Sparkles,
  HeartHandshake
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const AboutTechnician: React.FC = () => {
  const waLink = "https://wa.me/5551993557167?text=Olá%20Alexandra!%20Gostaria%20de%20falar%20diretamente%20com%20você%20sobre%20meu%20aparelho.";

  return (
    <section id="sobre" className="py-16 bg-slate-100/50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Visual Bio Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-7 shadow-md">
              
              {/* Technician Avatar / Badge */}
              <div className="flex items-center gap-3.5 mb-5">
                <div className="w-13 h-13 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 font-bold text-xl p-3">
                  <Wrench className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 whitespace-nowrap">Alexandra Fernandez Dubal</h3>
                  <p className="text-xs text-cyan-800 font-medium whitespace-nowrap">
                    Técnica Responsável · Rework TechCel
                  </p>
                  <span className="text-[11px] font-mono text-slate-500">
                    CNPJ: 67.210.226/0001-98
                  </span>
                </div>
              </div>

              {/* Core Technician Values */}
              <div className="space-y-2.5 mb-5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                  <HeartHandshake className="w-4 h-4 text-cyan-700 flex-shrink-0" />
                  <div className="text-xs text-slate-600">
                    <strong className="text-slate-900 block font-medium">Atendimento Humanizado:</strong>
                    Você conversa direto com quem vai realizar o reparo.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <div className="text-xs text-slate-600">
                    <strong className="text-slate-900 block font-medium">Diagnóstico Honesto:</strong>
                    Sem orçamentos superfaturados ou substituições desnecessárias.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-amber-700 flex-shrink-0" />
                  <div className="text-xs text-slate-600">
                    <strong className="text-slate-900 block font-medium">Bancada Anti-Drift & Micro-solda:</strong>
                    Equipamentos calibrados com microscópio térmico.
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Redes Sociais:</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/alexandradubal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-pink-600 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://www.facebook.com/alexandra.dubal?locale=pt_BR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Story & Commitment */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-medium px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>A Técnica por Trás da Bancada</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Cuidado minucioso, técnica avançada e transparência
            </h2>

            <div className="space-y-3 text-slate-600 text-xs sm:text-sm leading-relaxed">
              <p>
                À frente da <strong className="text-slate-900 font-medium">Rework TechCel</strong>, Alexandra realiza o reparo do início ao fim: da análise inicial à desmontagem, micro-solda e testes finais na bancada.
              </p>
              <p>
                Diferente de assistências genéricas onde o aparelho passa por atendentes sem você saber quem realizou o serviço, aqui você conversa diretamente com quem trabalha no circuito.
              </p>
              <p>
                Seja para trocar os analógicos do seu controle por <strong className="text-cyan-800 font-medium">Hall Effect magnético</strong>, substituir telas e baterias ou recuperar uma placa molhada, cada serviço é executado com respeito ao seu patrimônio.
              </p>
            </div>

            {/* Quality Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0" />
                <span>Bancada antiestática (ESD)</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0" />
                <span>Microscópio de alta ampliação</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0" />
                <span>Peças selecionadas e testadas</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 flex-shrink-0" />
                <span>Sapucaia do Sul e Região Metropolitana</span>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-full shadow-xs transition-all whitespace-nowrap"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Falar com a Alexandra no WhatsApp</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
