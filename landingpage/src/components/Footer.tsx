import React from 'react';
import { Wrench, Phone, MapPin } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const Footer: React.FC = () => {
  const waLink = "https://wa.me/5551993557167?text=Olá%20Alexandra!%20Gostaria%20de%20um%20orçamento%20para%20meu%20aparelho.";

  return (
    <footer className="bg-slate-100 border-t border-slate-200 text-slate-600 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-700 border border-cyan-200 flex items-center justify-center font-black">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-slate-900 whitespace-nowrap">
                Rework TechCel
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Assistência técnica especializada em manutenção de celulares, tablets e controles de videogame em Sapucaia do Sul e região. Orçamento gratuito e peças selecionadas.
            </p>

            <div className="pt-1 text-[11px] text-slate-500 font-mono">
              CNPJ: 67.210.226/0001-98
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="font-semibold text-xs text-slate-900 uppercase tracking-wider mb-3">
              Serviços Especializados
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <a href="#servicos" className="hover:text-cyan-800 transition-colors">
                  Troca de Tela OLED / LCD
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-cyan-800 transition-colors">
                  Baterias Novas & Autonomia
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-cyan-800 transition-colors">
                  Drift em Controles (PS5, Xbox, Switch)
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-cyan-800 transition-colors">
                  Analógicos Magnéticos Hall Effect
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-cyan-800 transition-colors">
                  Micro-solda & Reparo em Placa
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-cyan-800 transition-colors">
                  Desoxidação Pós-queda em Água
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-cyan-800 transition-colors">
                  Downgrade e Reinstalação de Software
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-semibold text-xs text-slate-900 uppercase tracking-wider mb-3">
              Links Rápidos
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <a href="#simulador" className="hover:text-cyan-800 transition-colors">
                  Simulador de Diagnóstico
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-cyan-800 transition-colors">
                  Especialidades de Bancada
                </a>
              </li>
              <li>
                <a href="#comofunciona" className="hover:text-cyan-800 transition-colors">
                  Como Funciona o Reparo
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-cyan-800 transition-colors">
                  A Técnica (Alexandra Dubal)
                </a>
              </li>
              <li>
                <a href="#avaliacoes" className="hover:text-cyan-800 transition-colors">
                  Avaliações de Clientes
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-800 transition-colors">
                  Dúvidas Frequentes
                </a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-cyan-800 transition-colors">
                  Localização & Rotas
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-slate-900 uppercase tracking-wider mb-3">
              Contato & Redes
            </h4>

            <div className="space-y-2 text-xs text-slate-600">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-medium transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
                <span>+55 51 99355-7167</span>
              </a>

              <a
                href="tel:+5551993557167"
                className="flex items-center gap-1.5 hover:text-cyan-800 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-700 shrink-0" />
                <span>(51) 99355-7167</span>
              </a>

              <div className="flex items-start gap-1.5 pt-1 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-cyan-700 shrink-0 mt-0.5" />
                <span>Rua Maria Alves da Silveira, 130, Bairro Walderez — Sapucaia do Sul / RS</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://www.instagram.com/alexandradubal/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:border-pink-500 flex items-center justify-center text-slate-600 hover:text-pink-600 transition-colors shadow-2xs"
                title="Instagram Alexandra Dubal"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/alexandra.dubal?locale=pt_BR"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white border border-slate-200 hover:border-blue-500 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-colors shadow-2xs"
                title="Facebook Alexandra Dubal"
              >
                <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-10 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Rework TechCel. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Assistência técnica especializada em Sapucaia do Sul / RS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
