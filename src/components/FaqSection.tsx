import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { FAQ_DATA } from '../data/faqData';

export const FaqSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']); // First FAQ open by default

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQ_DATA.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const waLink = "https://wa.me/5551993557167?text=Olá%20Alexandra!%20Tenho%20uma%20dúvida%20sobre%20o%20conserto%20do%20meu%20aparelho.";

  return (
    <section id="faq" className="py-16 bg-slate-100/60 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-800 bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full">
            Dúvidas Frequentes
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2.5">
            Tudo o que você precisa saber
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Transparência antes de qualquer decisão. Se ainda tiver dúvidas, chame direto no WhatsApp.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Pesquise sua dúvida (ex: orçamento, controles, prazo)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-full pl-11 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-600 shadow-xs transition-all"
          />
        </div>

        {/* FAQs List */}
        <div className="space-y-2.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <HelpCircle className="w-7 h-7 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600 text-xs sm:text-sm">Nenhuma pergunta encontrada com esse termo.</p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-700 text-xs font-medium mt-2.5 hover:underline"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                Perguntar diretamente para a Alexandra no WhatsApp
              </a>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-slate-900 hover:text-cyan-800 transition-colors"
                  >
                    <span className="font-medium text-xs sm:text-sm">
                      {faq.question}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 bg-cyan-100 text-cyan-800' : 'text-slate-500'
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* CTA below FAQ */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-600">
            Não encontrou o que procurava?{' '}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-800 font-medium underline underline-offset-4 inline-flex items-center gap-1 ml-1"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              Chamar no WhatsApp agora
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};
