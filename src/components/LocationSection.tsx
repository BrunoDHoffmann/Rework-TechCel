import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, Clock, FileText, ExternalLink } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const addressText = "Rua Maria Alves da Silveira, 130, Bairro Walderez, Sapucaia do Sul - RS, CEP 93226-512";
  const mapsNavigationLink = "https://www.google.com/maps/search/?api=1&query=Rua+Maria+Alves+da+Silveira+130+Sapucaia+do+Sul+RS+93226-512";
  const waLink = "https://wa.me/5551993557167?text=Olá%20Alexandra!%20Estou%20indo%20até%20a%20oficina%20para%20levar%20meu%20aparelho.";

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(addressText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="localizacao" className="py-16 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Address & Contact Details */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-800 bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full">
                Onde Estamos
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-2.5">
                Sapucaia do Sul · RS
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
                Fácil acesso no Bairro Walderez. Atendemos Sapucaia do Sul, Esteio, São Leopoldo, Canoas e toda a Região Metropolitana.
              </p>
            </div>

            {/* Address Card */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3.5 shadow-md">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Endereço da Oficina:</h3>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Rua Maria Alves da Silveira, 130<br />
                    Bairro Walderez — Sapucaia do Sul / RS<br />
                    <span className="text-[11px] text-slate-500 font-mono">CEP: 93226-512</span>
                  </p>
                </div>
              </div>

              {/* Quick Actions for Address */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                <a
                  href={mapsNavigationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-cyan-800 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 transition-colors shadow-2xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Abrir no GPS / Waze</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-medium px-3 py-1.5 rounded-full border border-slate-200 transition-colors shadow-2xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-medium">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Endereço</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Contacts List */}
            <div className="space-y-2">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 flex items-center justify-between transition-all group shadow-xs hover:shadow-md"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                    <WhatsAppIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500">WhatsApp Oficial</div>
                    <div className="text-xs sm:text-sm font-medium text-slate-900 group-hover:text-emerald-700 transition-colors">
                      +55 51 99355-7167
                    </div>
                  </div>
                </div>
                <span className="text-xs text-emerald-700 font-medium">Conversar →</span>
              </a>

              <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs text-slate-500 shadow-2xs">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-cyan-700" />
                  <span>CNPJ:</span>
                </div>
                <span className="font-mono text-slate-700 font-medium">67.210.226/0001-98</span>
              </div>
            </div>

            {/* Friendly tip */}
            <div className="p-3 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-700 leading-relaxed flex items-start gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-900">Dica:</strong> Chame a Alexandra no WhatsApp antes de se deslocar para confirmarmos a disponibilidade das peças e agilizarmos sua bancada.
              </span>
            </div>

          </div>

          {/* Right Column: Google Maps Embed Frame */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-md overflow-hidden">
              <div className="rounded-xl overflow-hidden border border-slate-200 relative aspect-[4/3] sm:aspect-[16/10] w-full bg-slate-100">
                <iframe
                  title="Mapa de Localização - Rework TechCel"
                  src="https://www.google.com/maps?q=Rua%20Maria%20Alves%20da%20Silveira%20130%2C%20Sapucaia%20do%20Sul%2C%20RS%2C%2093226-512&output=embed"
                  className="w-full h-full border-0 absolute inset-0 filter contrast-[1.02]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="p-2.5 flex items-center justify-between flex-wrap gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-700" /> Sapucaia do Sul - RS
                </span>
                <a
                  href={mapsNavigationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-800 hover:text-cyan-900 font-medium inline-flex items-center gap-1"
                >
                  Rotas no Google Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
