import React, { useState } from 'react';
import {
  Smartphone,
  Gamepad2,
  Tablet,
  Cpu,
  CheckCircle,
  Sparkles,
  Clock,
  Zap,
  HelpCircle,
  PenTool
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface DeviceType {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  brands: string[];
  issues: {
    id: string;
    label: string;
    description: string;
    estimatedTime: string;
    recommendation: string;
  }[];
}

const DEVICE_TYPES: DeviceType[] = [
  {
    id: 'smartphone',
    name: 'Celular / Smartphone',
    icon: Smartphone,
    brands: ['Apple (iPhone)', 'Samsung Galaxy', 'Motorola / Moto G', 'Xiaomi / Redmi / POCO', 'Outra Marca'],
    issues: [
      {
        id: 'tela',
        label: 'Tela Quebrada / Touch Falhando',
        description: 'Vidro trincado, display preto, manchas, listras ou toque clicando sozinho.',
        estimatedTime: '2h a 4h (com peça em estoque)',
        recommendation: 'Troca de tela completa ou display com calibração de toque e teste de sensor.',
      },
      {
        id: 'bateria',
        label: 'Bateria Descarregando Rápido / Estufada',
        description: 'Descarrega em poucas horas, desliga com carga ou aparelho estufando.',
        estimatedTime: '1h a 3h',
        recommendation: 'Substituição por bateria nova com ciclos zerados e teste de corrente.',
      },
      {
        id: 'conector',
        label: 'Não Carrega / Conector Frouxo',
        description: 'Tem que posicionar o cabo em certo ângulo, não reconhece carregamento turbo.',
        estimatedTime: '2h a 5h',
        recommendation: 'Reparo ou substituição do conector de carga Tipo-C / Lightning e limpeza.',
      },
      {
        id: 'placa-agua',
        label: 'Não Liga / Caiu na Água (Molhou)',
        description: 'Aparelho apagou após queda em líquido ou parou de ligar de repente.',
        estimatedTime: '24h a 72h (diagnóstico detalhado)',
        recommendation: 'Banho químico ultrassônico, desoxidação sob microscópio e mapeamento de curtos.',
      },
      {
        id: 'software',
        label: 'Travado no Logo / Downgrade Android',
        description: 'Reiniciando em loop, lentidão extrema após atualização.',
        estimatedTime: '2h a 6h',
        recommendation: 'Reinstalação limpa de firmware de fábrica ou downgrade para versão estável.',
      },
      {
        id: 'camera-audio',
        label: 'Câmera, Microfone ou Alto-falante',
        description: 'Vidro da câmera quebrado, fotos embaçadas ou áudio baixo/chiando.',
        estimatedTime: '2h a 4h',
        recommendation: 'Troca do vidro da lente, módulo de câmera ou limpeza de microfones.',
      },
      {
        id: 'outro-problema',
        label: 'Outros defeitos / Não listado acima',
        description: 'Descreva abaixo com suas próprias palavras o que está acontecendo.',
        estimatedTime: '24h a 48h',
        recommendation: 'Avaliação técnica personalizada e diagnóstico preciso na bancada de testes.',
      },
    ],
  },
  {
    id: 'gamepad',
    name: 'Controle de Videogame',
    icon: Gamepad2,
    brands: ['PS5 (DualSense)', 'PlayStation 4 (DualShock)', 'Xbox Series X/S / Xbox One', 'Nintendo Switch (Joy-Con / Pro)', 'Outro Controle'],
    issues: [
      {
        id: 'drift',
        label: 'Drift no Analógico (Puxando Sozinho)',
        description: 'A mira ou o personagem se move sem você tocar na alavanca.',
        estimatedTime: '24h a 48h',
        recommendation: 'Troca do módulo do analógico ou instalação de Analógicos Magnéticos Hall Effect (anti-drift permanente) e calibração.',
      },
      {
        id: 'botoes',
        label: 'Botões L2/R2 / Gatilhos Quebrados ou Moles',
        description: 'Gatilho sem pressão, mola solta ou botão afundado.',
        estimatedTime: '24h',
        recommendation: 'Substituição das molas reforçadas e troca de borrachas condutivas.',
      },
      {
        id: 'conector-game',
        label: 'Não Carrega / Cabo Desconecta',
        description: 'Controle não segura carga ou conector USB-C / Micro-USB frouxo.',
        estimatedTime: '24h',
        recommendation: 'Ressolda ou troca do conector Type-C na placa do controle.',
      },
      {
        id: 'outro-problema',
        label: 'Outros defeitos / Não listado acima',
        description: 'Descreva abaixo com suas palavras o problema do controle.',
        estimatedTime: '24h a 48h',
        recommendation: 'Inspeção minuciosa na bancada, teste de botões e calibração digital.',
      },
    ],
  },
  {
    id: 'tablet',
    name: 'Tablet / iPad',
    icon: Tablet,
    brands: ['Apple (iPad)', 'Samsung Galaxy Tab', 'Lenovo / Multilaser', 'Outro Tablet'],
    issues: [
      {
        id: 'tela-tab',
        label: 'Tela Grande Trincada ou Sem Imagem',
        description: 'Vidro estilhaçado ou display sem luminosidade.',
        estimatedTime: '24h a 48h',
        recommendation: 'Substituição do módulo frontal ou vidro e calibração de toque amplo.',
      },
      {
        id: 'bateria-tab',
        label: 'Bateria Sem Autonomia',
        description: 'Aparelho desliga rápido durante estudos ou trabalho.',
        estimatedTime: '24h',
        recommendation: 'Instalação de bateria de alta capacidade com testes de estabilidade.',
      },
      {
        id: 'conector-tab',
        label: 'Conector de Carga Danificado',
        description: 'Não conecta ou demora muitas horas para carregar.',
        estimatedTime: '24h',
        recommendation: 'Substituição do conector de energia e revisão do circuito de carga.',
      },
      {
        id: 'outro-problema',
        label: 'Outros defeitos / Não listado acima',
        description: 'Descreva abaixo o defeito apresentado pelo seu tablet.',
        estimatedTime: '24h a 48h',
        recommendation: 'Análise estrutural e de componentes internos na bancada.',
      },
    ],
  },
  {
    id: 'micro-solda',
    name: 'Reparo em Placa / Micro-solda',
    icon: Cpu,
    brands: ['Qualquer Marca / Modelo', 'iPhone / iPad', 'Samsung / Android', 'Placa de Controle'],
    issues: [
      {
        id: 'curto-placa',
        label: 'Curto na Placa / Não Inicializa',
        description: 'Aparelho condenado por outras lojas ou sem sinal de vida.',
        estimatedTime: '24h a 72h',
        recommendation: 'Análise microscópica térmica, injeção de tensão e substituição de componentes SMD/CI.',
      },
      {
        id: 'trilhas-rompidas',
        label: 'Trilhas Rompidas ou Desoxidação Severa',
        description: 'Oxidação profunda pós-água ou danos em conectores FPC na placa.',
        estimatedTime: '48h a 72h',
        recommendation: 'Micro-jumpers com fio de cobre esmaltado sob lente 40x e aplicação de máscara UV.',
      },
      {
        id: 'outro-problema',
        label: 'Outros defeitos em placa',
        description: 'Descreva abaixo os sintomas elétricos ou de inicialização.',
        estimatedTime: '24h a 72h',
        recommendation: 'Diagnóstico avançado sob microscópio de bancada com medição de impedância.',
      },
    ],
  },
  {
    id: 'outros-equipamentos',
    name: 'Outros Equipamentos',
    icon: HelpCircle,
    brands: ['Outro Dispositivo'],
    issues: [
      {
        id: 'outro-problema',
        label: 'Defeito / Avaliação de Outro Aparelho',
        description: 'Descreva no campo abaixo qual é o aparelho e o que está acontecendo.',
        estimatedTime: '24h a 48h',
        recommendation: 'Avaliação técnica especializada na bancada da Rework TechCel.',
      },
    ],
  },
];

export const BudgetSimulator: React.FC = () => {
  const [selectedDeviceTypeId, setSelectedDeviceTypeId] = useState<string>('smartphone');
  const [selectedBrand, setSelectedBrand] = useState<string>('Apple (iPhone)');
  const [customDeviceName, setCustomDeviceName] = useState<string>('');
  const [modelInput, setModelInput] = useState<string>('');
  const [selectedIssueId, setSelectedIssueId] = useState<string>('tela');
  const [customIssueText, setCustomIssueText] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  const currentDevice = DEVICE_TYPES.find((d) => d.id === selectedDeviceTypeId) || DEVICE_TYPES[0];

  const handleDeviceChange = (device: DeviceType) => {
    setSelectedDeviceTypeId(device.id);
    setSelectedBrand(device.brands[0] || '');
    setSelectedIssueId(device.issues[0]?.id || 'outro-problema');
  };

  const currentIssue =
    currentDevice.issues.find((i) => i.id === selectedIssueId) || currentDevice.issues[0];

  const isCustomIssue = selectedIssueId === 'outro-problema';

  const generateWhatsAppMessage = () => {
    const deviceDisplayName = selectedDeviceTypeId === 'outros-equipamentos' && customDeviceName.trim()
      ? customDeviceName.trim()
      : currentDevice.name;

    const brandText = selectedBrand ? selectedBrand : 'Não especificado';
    const modelText = modelInput.trim() ? modelInput.trim() : 'Modelo a verificar';
    const nameGreeting = clientName.trim() ? `Meu nome é ${clientName.trim()}. ` : '';
    
    const issueText = isCustomIssue && customIssueText.trim()
      ? `Outro defeito: ${customIssueText.trim()}`
      : currentIssue?.label || 'Defeito a diagnosticar';

    const messageLines = [
      `Olá Alexandra! ${nameGreeting}Gostaria de solicitar um orçamento para meu aparelho:`,
      '',
      `*Equipamento:* ${deviceDisplayName}`,
      `*Marca:* ${brandText}`,
      `*Modelo:* ${modelText}`,
      `*Problema:* ${issueText}`,
    ];

    if (additionalNotes.trim()) {
      messageLines.push(`*Observações:* ${additionalNotes.trim()}`);
    }

    messageLines.push('');
    messageLines.push('_Enviado através do simulador no site da Rework TechCel._');

    const fullMessage = messageLines.join('\n');
    return `https://wa.me/5551993557167?text=${encodeURIComponent(fullMessage)}`;
  };

  return (
    <section id="simulador" className="py-16 bg-slate-100/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-medium px-3 py-1 rounded-full mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulador de Diagnóstico</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Descubra o diagnóstico do seu aparelho
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed max-w-2xl mx-auto">
            Selecione o equipamento e o defeito para receber a recomendação técnica e enviar o pedido diretamente para o WhatsApp da Alexandra.
          </p>
        </div>

        {/* Main Grid: Form + Live Estimate Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-md">
            
            {/* Step 1: Device Type */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2.5">
                1. Qual é o seu aparelho?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {DEVICE_TYPES.map((dev) => {
                  const Icon = dev.icon;
                  const isSelected = dev.id === selectedDeviceTypeId;
                  return (
                    <button
                      key={dev.id}
                      type="button"
                      onClick={() => handleDeviceChange(dev)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-cyan-50 border-cyan-500 text-cyan-900 font-semibold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1 ${isSelected ? 'text-cyan-700' : 'text-slate-500'}`} />
                      <span className="text-[11px] leading-tight line-clamp-1">{dev.name.split(' / ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* If "Outros Equipamentos" is selected */}
              {selectedDeviceTypeId === 'outros-equipamentos' && (
                <div className="mt-3 p-3 rounded-xl bg-cyan-50/50 border border-cyan-200 animate-in fade-in">
                  <label className="block text-xs font-medium text-cyan-900 mb-1">
                    Qual aparelho você deseja consertar?
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Nintendo 3DS, Smartwatch, Fone Bluetooth, Caixa de Som..."
                    value={customDeviceName}
                    onChange={(e) => setCustomDeviceName(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-600"
                  />
                </div>
              )}
            </div>

            {/* Step 2: Brand & Model */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  2. Marca
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-cyan-600 focus:bg-white"
                >
                  {currentDevice.brands.map((b) => (
                    <option key={b} value={b} className="bg-white text-slate-900">
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  3. Modelo (opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: iPhone 13, DualSense PS5, A54..."
                  value={modelInput}
                  onChange={(e) => setModelInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-600 focus:bg-white"
                />
              </div>
            </div>

            {/* Step 3: Issue Selection with "Outros" option & custom field */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2.5">
                4. O que está acontecendo com o aparelho?
              </label>
              <div className="space-y-2">
                {currentDevice.issues.map((iss) => {
                  const isSelected = iss.id === selectedIssueId;
                  return (
                    <div
                      key={iss.id}
                      onClick={() => setSelectedIssueId(iss.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                        isSelected
                          ? 'bg-cyan-50/80 border-cyan-400 text-slate-900 shadow-xs'
                          : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100/70'
                      }`}
                    >
                      <input
                        type="radio"
                        name="issueRadio"
                        checked={isSelected}
                        onChange={() => setSelectedIssueId(iss.id)}
                        className="mt-0.5 text-cyan-600 focus:ring-cyan-500"
                      />
                      <div className="flex-1">
                        <div className="text-xs sm:text-sm font-semibold flex items-center justify-between">
                          <span className="text-slate-900">{iss.label}</span>
                          {isSelected && (
                            <span className="text-[10px] bg-cyan-100 text-cyan-800 border border-cyan-300 px-2 py-0.5 rounded-full font-medium">
                              Selecionado
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">{iss.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Custom Problem Input Field when 'Outros' is active */}
              {isCustomIssue && (
                <div className="mt-3 p-3.5 rounded-xl bg-cyan-50/40 border border-cyan-300 animate-in fade-in space-y-1.5">
                  <label className="block text-xs font-medium text-cyan-900 flex items-center gap-1.5">
                    <PenTool className="w-3.5 h-3.5" /> Descreva com detalhes o que está acontecendo:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ex: O botão de ligar afundou, o aparelho faz barulho mas não dá imagem, molhou com água da chuva..."
                    value={customIssueText}
                    onChange={(e) => setCustomIssueText(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-600 resize-none"
                  />
                  <p className="text-[10px] text-slate-500">
                    A Alexandra analisará sua descrição para dar uma estimativa precisa no WhatsApp.
                  </p>
                </div>
              )}
            </div>

            {/* Optional Client Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3 border-t border-slate-200">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Seu Nome (opcional)
                </label>
                <input
                  type="text"
                  placeholder="Como podemos te chamar?"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">
                  Algum detalhe extra? (opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: caiu no chão ontem, urgente..."
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-cyan-600 focus:bg-white"
                />
              </div>
            </div>

          </div>

          {/* Right Column: Live Diagnostic Summary Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-20">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xl relative">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 mb-4">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-800">
                    Diagnóstico Preliminar
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">Resumo da Simulação</h3>
                </div>
                <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>

              {/* Selected Specs */}
              <div className="space-y-3.5 mb-5 text-xs">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Equipamento:</span>
                    <span className="text-slate-900 font-medium">
                      {selectedDeviceTypeId === 'outros-equipamentos' && customDeviceName.trim()
                        ? customDeviceName.trim()
                        : currentDevice.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Marca / Modelo:</span>
                    <span className="text-cyan-800 font-medium">
                      {selectedBrand} {modelInput.trim() ? `(${modelInput.trim()})` : ''}
                    </span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-slate-500 shrink-0">Problema:</span>
                    <span className="text-amber-800 font-medium text-right line-clamp-2">
                      {isCustomIssue && customIssueText.trim()
                        ? customIssueText.trim()
                        : currentIssue?.label}
                    </span>
                  </div>
                </div>

                {/* Procedure & Recommendation */}
                <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-200">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-900 mb-1">
                    <Zap className="w-3.5 h-3.5 text-cyan-700" />
                    Procedimento Recomendado
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {currentIssue?.recommendation}
                  </p>
                </div>

                {/* Time & Budget cost stat */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Prazo Médio</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-900 mt-1">
                      {currentIssue?.estimatedTime}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Orçamento</span>
                    </div>
                    <div className="text-xs font-bold text-emerald-700 mt-1">
                      100% Gratuito
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm py-2.5 px-4 rounded-full shadow-sm transition-all"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Enviar Simulação no WhatsApp</span>
              </a>

              <p className="text-[11px] text-center text-slate-500 mt-2.5">
                A Alexandra responderá confirmando valores e horários disponíveis.
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

