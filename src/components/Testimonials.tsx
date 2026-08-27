import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';

export const Testimonials: React.FC = () => {
  return (
    <section id="avaliacoes" className="py-16 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-800 bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full">
            Avaliações de Clientes
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2.5">
            Quem conserta na Rework TechCel recomenda
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Confira a experiência de quem confiou seu smartphone, videogame ou placa em nossa bancada.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-cyan-400 transition-all shadow-xs hover:shadow-md"
            >
              <div>
                {/* Rating & Highlight */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] text-slate-500">{item.date}</span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                  "{item.highlight}"
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Author info */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-xs sm:text-sm text-slate-900 flex items-center gap-1">
                    <span>{item.name}</span>
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {item.city} · <span className="text-cyan-800 font-medium">{item.device}</span>
                  </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <Quote className="w-3.5 h-3.5 text-cyan-700" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Trust metrics line */}
        <div className="mt-8 text-center text-xs text-slate-600">
          ⭐ Média de avaliação <strong className="text-slate-900">5.0 / 5.0 estrelas</strong> por clientes atendidos em Sapucaia do Sul e região.
        </div>

      </div>
    </section>
  );
};
