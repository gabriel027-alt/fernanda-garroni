"use client";

import React, { useState, useRef } from "react";

// ACERVO COMPLETO DE ANTES E DEPOIS (TODOS OS PARES REAIS DA PASTA PUBLIC/MIDIAS)
const BEFORE_AFTER_CASES = [
  {
    id: "marrom-acobreado",
    title: "Marrom Marcante & Acobreado",
    subtitle: "Tons quentes de avelã e canela com profundidade elegante para bases castanhas.",
    tag: "Avelã & Canela",
    beforeSrc: "/midias/foto-fernanda-morena-iluminada-marrom-acobreado-antes.jpg",
    afterSrc: "/midias/foto-fernanda-morena-iluminada-marrom-acobreado-depois.jpg",
    altBefore: "Cabelo antes da iluminação marrom acobreado",
    altAfter: "Resultado final marrom acobreado com brilho reflexivo",
  },
  {
    id: "dourado-liso",
    title: "Dourado Solar no Fio Liso",
    subtitle: "Pontos de luz difusa que acompanham o caimento vertical sem linhas de demarcação.",
    tag: "Fio Liso Alinhado",
    beforeSrc: "/midias/foto-fernanda-morena-iluminada-dourada-liso-antes.jpg",
    afterSrc: "/midias/foto-fernanda-morena-iluminada-dourada-liso-depois.jpg",
    altBefore: "Fio liso antes da iluminação",
    altAfter: "Fio liso iluminado com reflexos dourados solares",
  },
  {
    id: "cachos-mel",
    title: "Cachos Mel & Caramelo",
    subtitle: "Mechas esculpidas respeitando a mola capilar e preservando 100% da elasticidade.",
    tag: "Curvaturas 3A a 3C",
    beforeSrc: "/midias/foto-fernanda-morena-iluminada-caramelo-costas-antes.jpg",
    afterSrc: "/midias/foto-fernanda-morena-iluminada-caramelo-costas-depois.jpg",
    altBefore: "Cabelo cacheado volumoso antes da cor",
    altAfter: "Cachos iluminados com definição e movimento tridimensional",
  },
  {
    id: "chocolate-profundo",
    title: "Chocolate Profundo & Brilho",
    subtitle: "Reflexos discretos em tom de chocolate nobre sem clarear excessivamente a base.",
    tag: "Base Escura Natural",
    beforeSrc: "/midias/foto-fernanda-morena-iluminada-chocolate-profundo-costas-antes.jpg",
    afterSrc: "/midias/foto-fernanda-morena-iluminada-chocolate-profundo-costas-depois.jpg",
    altBefore: "Cabelo escuro antes do procedimento",
    altAfter: "Nuance chocolate profundo com luminosidade discreta",
  },
  {
    id: "contour-avela",
    title: "Contour Avelã Frontal",
    subtitle: "Mechas estratégicas no contorno facial para emoldurar a expressão com sutileza.",
    tag: "Moldura Facial",
    beforeSrc: "/midias/foto-fernanda-morena-iluminada-contour-avela-frente-antes.jpg",
    afterSrc: "/midias/foto-fernanda-morena-iluminada-contour-avela-frente-finalizado.jpg",
    altBefore: "Contorno facial antes da iluminação",
    altAfter: "Contour avelã frontal finalizado emoldurando o rosto",
  },
  {
    id: "ondas-avela",
    title: "Ondas Avelã Costas",
    subtitle: "Efeito de luz difusa que acompanha a textura ondulada com movimento fluido.",
    tag: "Ondulado 2B / 2C",
    beforeSrc: "/midias/foto-fernanda-morena-iluminada-ondas-avela-costas-antes.jpg",
    afterSrc: "/midias/foto-fernanda-morena-iluminada-ondas-avela-costas-finalizado.jpg",
    altBefore: "Ondas naturais antes da cor",
    altAfter: "Ondas avelã costas finalizado com relevo e brilho",
  },
  {
    id: "retoque-cor",
    title: "Retoque de Cor & Preservação",
    subtitle: "Alinhamento e revitalização de mechas antigas com proteção da raiz ao comprimento.",
    tag: "Correção & Brilho",
    beforeSrc: "/midias/foto-fernanda-morena-iluminada-antes-retoque-de-cor3.jpg",
    afterSrc: "/midias/foto-fernanda-morena-iluminada-depois-retoque-de-cor-finalizado3.jpg",
    altBefore: "Cabelo com mechas oxidadas antes do retoque",
    altAfter: "Retoque de cor finalizado com uniformidade e saúde",
  },
  {
    id: "marrom-pinhao",
    title: "Marrom Pinhão Marcante",
    subtitle: "Nuance rica e envolvente inspirada no calor do pinhão para climas amenos.",
    tag: "Nuance Exclusiva",
    beforeSrc: "/midias/foto-fernanda-Morena-iluminada-marrom-pinhao-antes1.jpg",
    afterSrc: "/midias/foto-fernanda-Morena-iluminada-marrom-pinhao-depois1.jpg",
    altBefore: "Cabelo antes da morena iluminada marrom pinhão",
    altAfter: "Morena iluminada marrom pinhão com riqueza de nuances",
  },
  {
    id: "perfil-suave",
    title: "Perfil Suave & Harmonia",
    subtitle: "Leitura visagista completa unindo corte a seco sob medida e iluminação suave.",
    tag: "Visagismo de Perfil",
    beforeSrc: "/midias/foto-fernanda-morena-iluminada-perfil-suave-antes.jpg",
    afterSrc: "/midias/foto-fernanda-morena-iluminada-perfil-suave-finalizado.jpg",
    altBefore: "Perfil antes da iluminação e corte",
    altAfter: "Perfil suave finalizado com harmonia e caimento sob medida",
  },
  {
    id: "cafe-canela",
    title: "Nuance Café & Canela",
    subtitle: "Contraste equilibrado com fundo quente que destaca a beleza natural da cliente.",
    tag: "Contraste Médio",
    beforeSrc: "/midias/foto-fernanda-morena-iluminada-antes1.jpg",
    afterSrc: "/midias/foto-fernanda-morena-iluminada-depois-finalizado1.jpg",
    altBefore: "Cabelo castanho escuro antes",
    altAfter: "Nuance café e canela com iluminação fluida",
  },
  {
    id: "amendoa-dourada",
    title: "Amêndoa Dourada & Sedosidade",
    subtitle: "Clareamento consciente com saúde preservada, alta maleabilidade e toque sedoso.",
    tag: "Saúde da Fibra",
    beforeSrc: "/midias/foto-fernanda-morena-iluminada-antes2.jpg",
    afterSrc: "/midias/foto-fernanda-morena-iluminada-depois-finalizado2.jpg",
    altBefore: "Fios antes do processo",
    altAfter: "Transformação amêndoa dourada com brilho intenso",
  },
  {
    id: "doce-leite",
    title: "Doce de Leite & Relevo",
    subtitle: "Distribuição mecha a mecha com esfumado sutil na raiz para crescimento limpo.",
    tag: "Esfumado Perfeito",
    beforeSrc: "/midias/foto-fernanda-morena-iluminada-antes3-part1.jpg",
    afterSrc: "/midias/foto-fernanda-morena-iluminada-depois-finalizado3-part2.jpg",
    altBefore: "Base inicial escura",
    altAfter: "Iluminação doce de leite com transição imperceptível",
  },
];

// GALERIA DE REELS E VÍDEOS REAIS DA FERNANDA
const VIDEO_REELS = [
  {
    id: "moca-mousse",
    title: "Transformação Moça Mousse",
    subtitle: "Nuance autoral aveludada com transição perfeita na raiz e zero linhas marcadas.",
    src: "/midias/video-fernanda-transformacao-morena-iluminada-moca-mousse.mp4",
    badge: "Técnica Autoral",
  },
  {
    id: "lavatorio-spa",
    title: "Lavatório Spa & Massagem",
    subtitle: "Acidificação, reposição lipídica e reestruturação com massagem craniana relaxante.",
    src: "/midias/video-fernanda-cronograma-capilar-lavatorio.mp4",
    badge: "Terapia Capilar",
  },
  {
    id: "retoque-cor-video",
    title: "Retoque de Cor & Preservação",
    subtitle: "Revitalização da nuance e selagem das cutículas mantendo a integridade da fibra.",
    src: "/midias/video-fernanda-morena-iluminada-antes-e-depois-retoque-de-cor2.mp4",
    badge: "Retoque em Movimento",
  },
  {
    id: "balanco-movimento-video",
    title: "Balanço Natural dos Fios",
    subtitle: "Caimento finalizado com movimento 360° e brilho sob a luz do ambiente.",
    src: "/midias/video-fernanda-morena-iluminada-depois1.mp4",
    badge: "Caimento Finalizado",
  },
];

// GALERIA DE FOTOS DE CURVATURAS, ONDAS E CORTES
const CURVATURE_GALLERY = [
  {
    src: "/midias/foto-fernanda-morena-iluminada-ondas-mel-frente.jpg",
    title: "Ondas Mel Frontal",
    category: "Corte em Camadas & Ondas",
  },
  {
    src: "/midias/foto-fernanda-morena-iluminada-perfil-suave-finalizado.jpg",
    title: "Perfil Visagista Finalizado",
    category: "Harmonização de Perfil",
  },
  {
    src: "/midias/foto-fernanda-morena-iluminada-ondas-avela-costas-finalizado.jpg",
    title: "Ondas Avelã Costas",
    category: "Movimento Tridimensional",
  },
  {
    src: "/midias/foto-fernanda-morena-iluminada-contour-avela-frente-finalizado.jpg",
    title: "Contour Avelã Frente",
    category: "Moldura do Rosto",
  },
  {
    src: "/midias/foto-fernanda-morena-iluminada-contour-avela-frente-antes-processo.jpg",
    title: "Diagnóstico & Processo",
    category: "Teste de Mecha & Visagismo",
  },
  {
    src: "/midias/foto-fernanda-morena-iluminada-depois-finalizado3-part3.jpg",
    title: "Definição & Caimento Livre",
    category: "Volume 360° Sem Pirâmide",
  },
];

// FOTOS DA ESPECIALISTA NO ATELIÊ
const SPECIALIST_FRAMES = [
  {
    src: "/midias/frame1-fernanda.png",
    title: "Fernanda Garroni",
    subtitle: "Visagista Titular",
  },
  {
    src: "/midias/frame2-fernanda.jpg",
    title: "Diagnóstico Prévio",
    subtitle: "Análise da Arquitetura Facial",
  },
  {
    src: "/midias/frame3-fernanda.jpg",
    title: "Técnica de Iluminação",
    subtitle: "Aplicação Autoral Mecha a Mecha",
  },
  {
    src: "/midias/frame4-fernanda.jpg",
    title: "Lavatório Spa",
    subtitle: "Rituais de Nutrição & Acidificação",
  },
  {
    src: "/midias/frame5-fernanda.jpg",
    title: "Corte & Finalização",
    subtitle: "Arquitetura a Seco & Caimento",
  },
];

export default function Page() {
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [mutedVideos, setMutedVideos] = useState<Record<string, boolean>>({
    "moca-mousse": true,
    "lavatorio-spa": true,
    "retoque-cor-video": true,
    "balanco-movimento-video": true,
  });
  const isDragging = useRef(false);

  // CONTROLE DE ÁUDIO DO LAVATÓRIO SPA
  const lavatorioVideoRef = useRef<HTMLVideoElement>(null);
  const [lavatorioMuted, setLavatorioMuted] = useState(true);

  const toggleLavatorioMute = () => {
    if (lavatorioVideoRef.current) {
      lavatorioVideoRef.current.muted = !lavatorioMuted;
    }
    setLavatorioMuted((prev) => !prev);
  };

  // ESTADOS DA TRIAGEM INTELIGENTE
  const [triageCurvatura, setTriageCurvatura] = useState<string>("Fio Liso");
  const [triageNuance, setTriageNuance] = useState<string>("Marrom Marcante");
  const [triageQuimica, setTriageQuimica] = useState<string>("Cabelo Natural");

  const generateTriageWhatsAppUrl = () => {
    const text = `Olá, Fernanda! Fiz a triagem inteligente no site e gostaria de agendar uma avaliação:\n\n• Tipo de curvatura: ${triageCurvatura}\n• Nuance desejada: ${triageNuance}\n• Química anterior: ${triageQuimica}\n\nQual é a disponibilidade de horário na Sala 205?`;
    return `https://wa.me/5551999999999?text=${encodeURIComponent(text)}`;
  };

  const currentCase = BEFORE_AFTER_CASES[selectedCaseIdx] || BEFORE_AFTER_CASES[0];

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const toggleVideoMute = (id: string) => {
    setMutedVideos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1C1917] font-sans antialiased selection:bg-[#C99065]/25 selection:text-[#1C1917] overflow-x-hidden">
      
      {/* 1. HEADER COMPACTO BOUTIQUE */}
      <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E8DFD5] transition-all">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-[#C99065]/60 p-0.5 shrink-0 bg-[#12100E]">
              <img 
                src="/midias/foto-logo-fernanda.jpg" 
                alt="Fernanda Garroni" 
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-tight font-medium text-[#1C1917]">Fernanda Garroni</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#736B63] font-mono">Cabeleireira & Visagista</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-xs tracking-wider uppercase font-medium text-[#524B43]">
            <a href="#triade" className="hover:text-[#1C1917] transition-colors">A Tríade</a>
            <a href="#transformacoes" className="hover:text-[#1C1917] transition-colors">Antes & Depois</a>
            <a href="#videos" className="hover:text-[#1C1917] transition-colors">Vídeos Reais</a>
            <a href="#curvaturas" className="hover:text-[#1C1917] transition-colors">Curvaturas & Cortes</a>
            <a href="#triagem-inteligente" className="hover:text-[#1C1917] transition-colors">Triagem VIP</a>
            <a href="#atelie" className="hover:text-[#1C1917] transition-colors">Ateliê Nonoai</a>
          </nav>

          <a 
            href="#triagem-inteligente"
            className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-full bg-gradient-to-r from-[#1C1917] to-[#2E2822] hover:from-[#8F6E32] hover:to-[#B87D4B] text-[#FAF3F0] text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-sm"
          >
            Avaliação VIP
          </a>
        </div>
      </header>

      {/* 2. HERO CINEMÁTICA FLUIDA A 60FPS (DESOBSTRUÇÃO TOTAL DO ROSTO) */}
      <section className="relative w-full h-[92vh] bg-[#12100E] overflow-hidden flex flex-col justify-end">
        <video 
          src="/midias/intro-fernanda.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover object-center" 
        />
        
        {/* Gradiente escuro sólido cobrindo os últimos 40% da altura */}
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#12100E] via-[#12100E]/70 to-transparent pointer-events-none z-10" />

        <div className="relative z-20 flex flex-col items-center justify-end text-center px-5 max-w-4xl mx-auto pb-10 sm:pb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#C99065]/40 shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C99065]" />
            <span className="font-mono text-[9px] sm:text-[11px] tracking-[0.28em] uppercase text-white/95">
              ARQUITETURA FACIAL & ILUMINAÇÃO AUTORAL
            </span>
          </div>

          <h1 className="font-serif font-light tracking-tight text-3xl sm:text-5xl md:text-6xl text-white/95 leading-[1.12] [text-wrap:balance] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            Sua melhor versão com <span className="italic font-normal text-[#E0CEB5]">Morenas Iluminadas</span> e corte visagista sob medida.
          </h1>

          {/* BADGE DE PROVA SOCIAL OFICIAL DO GOOGLE */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-black/65 backdrop-blur-md border border-[#D4AF37]/50 shadow-xl">
            <span className="text-[#D4AF37] text-base leading-none">★</span>
            <span className="text-white text-xs sm:text-sm font-medium tracking-wide">
              <strong className="text-[#D4AF37] font-semibold">5.0</strong> no Google (49 avaliações reais) <span className="text-white/60 mx-1">•</span> Atendimento Boutique com Hora Marcada
            </span>
          </div>

          <p className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#E0CEB5]/90 mt-4 sm:mt-5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            FERNANDA GARRONI — ATELIÊ BOUTIQUE • PORTO ALEGRE (AV. NONOAI, 151)
          </p>

          <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <a
              href="#triagem-inteligente"
              className="relative group min-h-[50px] w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#C99065] to-[#B87D4B] hover:from-[#E5C158] hover:to-[#C99065] text-[#12100E] font-sans font-bold text-xs tracking-widest uppercase rounded-full shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] transition-all duration-300 inline-flex items-center justify-center gap-2.5 active:scale-95"
            >
              <span>Agendar Avaliação VIP</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#triade"
              className="min-h-[50px] w-full sm:w-auto px-7 py-3.5 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/30 font-sans font-semibold text-xs tracking-widest uppercase rounded-full transition-all inline-flex items-center justify-center active:scale-95"
            >
              <span>Explorar a Tríade</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. CARD OFICIAL COM A FOTO REAL DA FERNANDA (FRAME 1) */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-5 sm:px-8 border-b border-[#E8DFD5]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8DFD5] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#8F6E32]" />
              <span className="text-xs font-mono font-bold tracking-[0.16em] uppercase text-[#6E501E]">
                Visagismo & Saúde da Fibra
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] tracking-tight leading-[1.14]">
              Especialista em <span className="italic font-normal text-[#944234]">Morenas Iluminadas</span> & Cabelos com Curvaturas.
            </h2>

            <p className="text-base sm:text-lg text-[#44403C] leading-relaxed font-light">
              Técnicas autorais de iluminação desenhadas para harmonizar com sua arquitetura facial e estilo de vida, com preservação absoluta da saúde capilar. Do alinhamento aos cachos e ondas em definição tridimensional.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-[#44403C] pt-2">
              <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-[#E8DFD5] shadow-xs">
                <span className="font-medium text-[#1C1917]">Av. Nonoai, nº 151, Sala 205</span>
                <span className="text-[#8F6E32] font-semibold">• Porto Alegre / RS</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-[#E8DFD5] shadow-xs">
                <span className="font-bold text-[#1C1917]">Atendimento Individual</span>
                <span className="text-[#8F6E32]">• Privativo</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DFD5] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#44403C]">
              <div className="flex items-center gap-2">
                <span className="text-[#8F6E32] font-bold">✓</span>
                <span>Teste de mecha obrigatório</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#8F6E32] font-bold">✓</span>
                <span>Preservação de curvatura</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#8F6E32] font-bold">✓</span>
                <span>Consultoria visagista</span>
              </div>
            </div>
          </div>

          {/* CARD PRINCIPAL DE VISAGISMO COM A FOTO OFICIAL */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C5A880]/60 bg-[#12100E] group">
              <div className="relative aspect-[9/13] w-full overflow-hidden bg-neutral-900">
                <img 
                  src="/midias/frame1-fernanda.png" 
                  alt="Fernanda Garroni — Cabeleireira & Visagista" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                
                <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-[#C5A880]/40 text-[10px] font-mono font-bold tracking-wider uppercase">
                  VISAGISTA TITULAR • SALA 205
                </div>

                <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-[#1C1917]/80 backdrop-blur-md border border-[#C5A880]/40 text-[#E6C99B] text-[10px] font-mono font-bold uppercase tracking-wider">
                  Porto Alegre
                </div>

                <div className="absolute bottom-5 left-5 right-5 z-20 space-y-2 text-white">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#E6C99B] block">
                    Visagismo & Terapia Capilar
                  </span>
                  <h3 className="font-serif font-bold text-2xl leading-tight">Fernanda Garroni</h3>
                  <p className="text-xs text-neutral-300 leading-relaxed font-light">
                    Especialista em Morenas Iluminadas & Cabelos com Curvaturas. Diagnóstico exclusivo com hora marcada na Av. Nonoai, 151.
                  </p>
                  <a 
                    href="#triade" 
                    className="w-full mt-3 py-3 px-4 rounded-xl bg-white hover:bg-[#FAF6F0] text-[#1C1917] font-sans font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Conhecer Metodologia de Atendimento</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. A ESPECIALISTA EM AÇÃO NO ATELIÊ (FRAMES 1 A 5) */}
      <section className="py-20 bg-[#F4EDE4] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#6E501E] block mb-2 font-bold">
                Atendimento One-on-One
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-bold">
                A Especialista em Ação no Ateliê
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#59524A] font-light max-w-md mt-3 md:mt-0 leading-relaxed">
              Registros reais do atendimento boutique de Fernanda Garroni: do diagnóstico anatômico ao resultado final na Sala 205.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {SPECIALIST_FRAMES.map((item, idx) => (
              <div 
                key={idx} 
                className="group relative rounded-2xl overflow-hidden bg-[#12100E] border border-[#E8DFD5] shadow-xs aspect-[3/4]"
              >
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                  <span className="font-serif text-sm font-bold block">{item.title}</span>
                  <span className="text-[10px] text-[#E6C99B] font-mono tracking-wider uppercase block mt-0.5">{item.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. A TRÍADE DE MORENAS ILUMINADAS — COMPARADOR INTERATIVO MULTICASES */}
      <section id="triade" className="py-24 bg-[#141210] text-[#FAF6F0] relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-8">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C5A880] block mb-3 font-bold">
                Carro-Chefe do Espaço
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white">
                A Tríade de Morenas Iluminadas
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md mt-4 md:mt-0 leading-relaxed">
              Arraste a divisória sobre o diagnóstico fotográfico para comparar o resultado real de Antes e Depois de cada técnica desenvolvida por Fernanda Garroni.
            </p>
          </div>

          {/* SELETOR DE CASOS DA TRÍADE */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {BEFORE_AFTER_CASES.slice(0, 3).map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelectedCaseIdx(idx);
                  setSliderPos(50);
                }}
                className={`min-h-[44px] px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCaseIdx === idx
                    ? "bg-[#C5A880] text-[#141210] font-bold shadow-lg"
                    : "bg-white/5 hover:bg-white/10 text-white/80 border border-white/10"
                }`}
              >
                Pilar 0{idx + 1} — {item.title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* COMPARADOR COM SLIDER INTERATIVO */}
            <div className="lg:col-span-7">
              <div 
                className="relative w-full aspect-[4/5] sm:aspect-[16/11] rounded-2xl overflow-hidden select-none shadow-2xl cursor-ew-resize border border-white/10"
                onMouseDown={() => (isDragging.current = true)}
                onMouseUp={() => (isDragging.current = false)}
                onMouseLeave={() => (isDragging.current = false)}
                onMouseMove={(e) => isDragging.current && handleSliderMove(e.clientX, e.currentTarget.getBoundingClientRect())}
                onTouchMove={(e) => handleSliderMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect())}
              >
                <img 
                  src={currentCase.afterSrc} 
                  alt={currentCase.altAfter} 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
                
                <div 
                  className="absolute inset-0 overflow-hidden pointer-events-none" 
                  style={{ width: `${sliderPos}%` }}
                >
                  <img 
                    src={currentCase.beforeSrc} 
                    alt={currentCase.altBefore} 
                    className="absolute inset-0 max-w-none w-full h-full object-cover" 
                    style={{ width: "100%", height: "100%" }} 
                  />
                  <span className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-[0.2em] bg-black/70 px-3 py-1 rounded-full text-white/80">
                    Antes
                  </span>
                </div>

                <span className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-[0.2em] bg-black/70 px-3 py-1 rounded-full text-[#E6C99B]">
                  Depois
                </span>

                <div 
                  className="absolute top-0 bottom-0 w-[2px] bg-[#E6C99B] pointer-events-none" 
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -left-3.5 -translate-y-1/2 w-7 h-7 rounded-full bg-[#141210] border border-[#E6C99B] flex items-center justify-center text-[10px] text-[#E6C99B] shadow-lg">
                    ⇄
                  </div>
                </div>
              </div>
            </div>

            {/* DETALHES DO CASO ATUAL DA TRÍADE */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
                <span className="font-mono text-[10px] text-[#C5A880] tracking-widest uppercase block mb-1">
                  {currentCase.tag}
                </span>
                <h3 className="font-serif text-2xl text-white mt-1 mb-2 font-bold">
                  {currentCase.title}
                </h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                  {currentCase.subtitle}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-neutral-300 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-[#C5A880]">✓</span>
                    <span>Diagnóstico de contraste e formato facial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#C5A880]">✓</span>
                    <span>Teste de mecha prévio e preservação da raiz</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#C5A880]">✓</span>
                    <span>Tratamento pós-química no lavatório spa</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/5551999999999?text=${encodeURIComponent(`Olá, Fernanda! Gostaria de avaliar meu cabelo na técnica ${currentCase.title}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center w-full min-h-[46px] rounded-xl bg-[#C5A880] hover:bg-[#b57f56] text-[#141210] text-xs font-bold tracking-wider uppercase transition-colors"
                >
                  Avaliar Meu Cabelo Neste Tom →
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. GALERIA COMPLETA DE ANTES E DEPOIS (TODOS OS 12 PARES REAIS) */}
      <section id="transformacoes" className="py-24 max-w-7xl mx-auto px-5 sm:px-8 border-b border-[#E8DFD5]">
        <div className="max-w-3xl mb-14">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#6E501E] block mb-2 font-bold">
            Acervo Completo de Resultados
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] tracking-tight">
            Mais Casos Reais & Transformações Autorais
          </h2>
          <p className="text-base text-[#44403C] font-light leading-relaxed mt-3">
            Cada cliente possui uma história, textura e contraste únicos. Explore a galeria completa dos resultados desenvolvidos por Fernanda Garroni na Sala 205.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BEFORE_AFTER_CASES.map((item, idx) => (
            <div 
              key={item.id} 
              className="flex flex-col bg-white rounded-2xl border border-[#E8DFD5] overflow-hidden shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="p-4 sm:p-5 border-b border-[#F0E4DE] flex flex-col gap-1.5">
                <span className="text-[10px] font-mono font-bold tracking-[0.16em] uppercase text-[#6E501E] bg-[#FAF3F0] px-2.5 py-1 rounded-full border border-[#E8DFD5] w-fit">
                  {item.tag}
                </span>
                <h3 className="font-serif font-bold text-lg text-[#1C1917] mt-1 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5D5752] font-light leading-relaxed line-clamp-2">
                  {item.subtitle}
                </p>
              </div>

              {/* CARD DUPLO ANTES & DEPOIS */}
              <div className="grid grid-cols-2 gap-1 p-2 bg-[#F7F2EC]">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-neutral-900">
                  <img 
                    src={item.beforeSrc} 
                    alt={item.altBefore} 
                    className="w-full h-full object-cover" 
                    loading="lazy" 
                  />
                  <span className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-wider bg-black/70 px-2 py-0.5 rounded text-white/90">
                    Antes
                  </span>
                </div>
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-neutral-900">
                  <img 
                    src={item.afterSrc} 
                    alt={item.altAfter} 
                    className="w-full h-full object-cover" 
                    loading="lazy" 
                  />
                  <span className="absolute bottom-2 right-2 font-mono text-[9px] uppercase tracking-wider bg-[#C5A880] px-2 py-0.5 rounded text-[#141210] font-bold">
                    Depois
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white border-t border-[#F0E4DE] mt-auto">
                <a
                  href={`https://wa.me/5551999999999?text=${encodeURIComponent(`Olá, Fernanda! Vi o resultado "${item.title}" (${item.tag}) no site e quero este tom no meu cabelo. Como funciona a avaliação?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-xs tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow"
                >
                  <span>Quero Este Tom no Meu Cabelo</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. GRADE DE VÍDEOS REAIS & REELS DE TRANSFORMAÇÕES */}
      <section id="videos" className="py-24 bg-[#141210] text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 border-b border-white/10 pb-8">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C5A880] block mb-3 font-bold">
                Movimento & Fluidez Real
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight">
                Transformações e Retoques em Vídeo
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md mt-4 md:mt-0 leading-relaxed">
              Assista ao caimento autêntico e ao brilho sem filtros das transformações realizadas no espaço privativo na Av. Nonoai, 151.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VIDEO_REELS.map((item) => (
              <div 
                key={item.id} 
                className="relative rounded-2xl overflow-hidden bg-neutral-950 border border-white/10 flex flex-col group shadow-xl"
              >
                <div className="relative aspect-[9/14] w-full overflow-hidden bg-black">
                  <video 
                    src={item.src} 
                    autoPlay 
                    loop 
                    muted={mutedVideos[item.id]} 
                    playsInline 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* BADGE */}
                  <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9px] font-mono tracking-wider uppercase text-[#E6C99B]">
                    {item.badge}
                  </div>

                  {/* CONTROLE DE SOM (MÍNIMO 44X44PX, ALTA VISIBILIDADE) */}
                  <button
                    type="button"
                    onClick={() => toggleVideoMute(item.id)}
                    className="absolute top-3 right-3 z-30 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-black/85 hover:bg-[#1C1917] text-white border-2 border-[#D4AF37]/70 shadow-lg flex items-center justify-center text-sm transition-all duration-200 cursor-pointer active:scale-95 hover:scale-105"
                    aria-label={mutedVideos[item.id] ? "Ativar som do vídeo" : "Desativar som do vídeo"}
                  >
                    {mutedVideos[item.id] ? "🔇" : "🔊"}
                  </button>

                  <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
                    <h3 className="font-serif font-bold text-base leading-snug">{item.title}</h3>
                    <p className="text-[11px] text-neutral-300 font-light mt-1 line-clamp-2 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. GALERIA DE CURVATURAS, ONDAS E CORTES ANATÔMICOS */}
      <section id="curvaturas" className="py-24 max-w-7xl mx-auto px-5 sm:px-8 border-b border-[#E8DFD5]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#6E501E] block font-bold">
              Curvaturas 2A a 4C
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1917] font-normal leading-[1.12]">
              Corte a seco estruturado: respeito absoluto à forma.
            </h2>
            <p className="text-sm text-[#59524A] leading-relaxed font-light">
              Cabelos ondulados, cacheados e crespos exigem leitura anatômica antes da tesoura. Cada camada é desenhada para distribuir o volume em 360°, eliminando o efeito pirâmide e respeitando o fator de encolhimento pós-secagem.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="border-l-2 border-[#8F6E32] pl-4">
                <span className="font-serif text-base text-[#1C1917] block font-bold">Zero Efeito Pirâmide</span>
                <span className="text-xs text-[#7A7269] font-light">Camadas em 360° com leveza</span>
              </div>
              <div className="border-l-2 border-[#8F6E32] pl-4">
                <span className="font-serif text-base text-[#1C1917] block font-bold">Teste de Mecha</span>
                <span className="text-xs text-[#7A7269] font-light">Preservação integral da mola</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E8DFD5] shadow-xs space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#8F6E32]">
                <span>✓</span>
                <span>Metodologia Autoral de Cortes em Curvaturas</span>
              </div>
              <p className="text-xs text-[#59524A] leading-relaxed font-light">
                Análise do formato craniano, grau de curvatura por quadrante e rotina real de secagem. O corte a seco permite visualizar em tempo real a queda exata do fio.
              </p>
              <div className="pt-2">
                <a 
                  href="https://wa.me/5551999999999?text=Olá,%20Fernanda!%20Gostaria%20de%20agendar%20um%20corte%20visagista%20para%20curvaturas."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center min-h-[46px] px-6 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  Agendar Corte de Curvaturas →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* GRADE DAS 6 FOTOS REAIS DE CURVATURAS E CORTES */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CURVATURE_GALLERY.map((item, idx) => (
            <div 
              key={idx} 
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-900 border border-[#E8DFD5] shadow-xs"
            >
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                loading="lazy" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="font-serif text-xs font-bold block leading-tight">{item.title}</span>
                <span className="text-[9px] text-[#E6C99B] font-mono tracking-wider uppercase block mt-0.5">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. CRONOGRAMA CAPILAR E LAVATÓRIO SPA TERAPÊUTICO */}
      <section id="lavatorio" className="py-20 bg-[#F4EDE4] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#6E501E] block font-bold">
                Saúde da Fibra & Lavatório Spa
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-bold leading-tight">
                Cronograma Capilar & Rituais de Recuperação
              </h2>
              <p className="text-sm text-[#59524A] font-light leading-relaxed">
                Diagnóstico profundo com reposição de massa lipídica, reestruturação proteica e relaxamento terapêutico na Av. Nonoai, 151.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5]">
                  <strong className="text-xs font-bold uppercase tracking-wider text-[#8F6E32] block">Fase 01 — Acidificação Cuticular</strong>
                  <p className="text-xs text-[#59524A] mt-1">Reequilíbrio de pH pós-química para selar as cutículas e proporcionar brilho reflexivo instantâneo.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5]">
                  <strong className="text-xs font-bold uppercase tracking-wider text-[#8F6E32] block">Fase 02 — Nutrição Lipídica</strong>
                  <p className="text-xs text-[#59524A] mt-1">Reposição de óleos nobres para combater o ressecamento e o toque áspero das pontas.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5]">
                  <strong className="text-xs font-bold uppercase tracking-wider text-[#8F6E32] block">Fase 03 — Reconstrução Proteica</strong>
                  <p className="text-xs text-[#59524A] mt-1">Devolução de aminoácidos ao córtex capilar, restaurando a elasticidade e a resistência mecânica.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-xl border border-[#C5A880]/40 bg-[#12100E] aspect-[9/13]">
                <video 
                  ref={lavatorioVideoRef}
                  src="/midias/video-fernanda-cronograma-capilar-lavatorio.mp4" 
                  autoPlay 
                  loop 
                  muted={lavatorioMuted}
                  playsInline 
                  className="w-full h-full object-cover" 
                />
                
                {/* BOTÃO VISÍVEL DE CONTROLE DE ÁUDIO NO CANTO SUPERIOR DIREITO */}
                <button
                  type="button"
                  onClick={toggleLavatorioMute}
                  className="absolute top-4 right-4 z-30 min-w-[44px] min-h-[44px] px-3.5 py-2 rounded-full bg-black/85 hover:bg-[#1C1917] text-white border-2 border-[#D4AF37]/80 shadow-lg flex items-center justify-center gap-1.5 text-xs font-mono font-medium transition-all duration-200 cursor-pointer active:scale-95"
                  aria-label={lavatorioMuted ? "Ativar som do vídeo do lavatório" : "Desativar som do vídeo do lavatório"}
                >
                  <span className="text-sm">{lavatorioMuted ? "🔇" : "🔊"}</span>
                  <span className="uppercase tracking-wider text-[10px]">
                    {lavatorioMuted ? "Sem Som" : "Com Som"}
                  </span>
                </button>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#E6C99B] block mb-1">Ritual na Sala 205</span>
                  <h3 className="font-serif text-lg font-bold">Lavatório Spa Terapêutico</h3>
                  <p className="text-xs text-neutral-300 font-light mt-1">Emulsão minuciosa mecha a mecha com massagem craniana relaxante.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 10. ATELIÊ BOUTIQUE NA SALA 205 (AUTORIDADE & ATENDIMENTO EXCLUSIVO) */}
      <section className="py-20 sm:py-28 bg-[#FAF6F0] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-12">
            {/* BADGE DE PROVA SOCIAL OFICIAL DO GOOGLE */}
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-white border border-[#D4AF37]/60 shadow-xs">
              <span className="text-[#D4AF37] text-base leading-none">★</span>
              <span className="text-xs sm:text-sm font-medium text-[#1C1917] tracking-wide">
                <strong className="text-[#8F6E32] font-semibold">5.0</strong> no Google (49 avaliações reais) <span className="text-[#736B63] mx-1">•</span> Atendimento Boutique com Hora Marcada
              </span>
            </div>

            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#6E501E] block mb-2 font-bold">
              Atendimento Boutique Exclusivo
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-bold">
              Atendimento Individual e Personalizado na Sala 205
            </h2>
            <p className="text-sm text-[#59524A] font-light leading-relaxed mt-2">
              Um ambiente acolhedor e privativo na Av. Nonoai, 151, com dedicação exclusiva ao seu diagnóstico capilar, sem a agitação de salões tradicionais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-[#E8DFD5] shadow-xs hover:border-[#C99065]/50 transition-colors">
              <span className="font-serif text-2xl text-[#8F6E32] block mb-3 font-bold">01</span>
              <h3 className="font-serif text-lg text-[#1E1B18] mb-2 font-bold">Hora Marcada Exclusiva</h3>
              <p className="text-xs text-[#59524A] leading-relaxed font-light">
                Atendimento one-on-one com foco integral em você. Sem pressa, sem sobreposições e com pausa para café especial.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E8DFD5] shadow-xs hover:border-[#C99065]/50 transition-colors">
              <span className="font-serif text-2xl text-[#8F6E32] block mb-3 font-bold">02</span>
              <h3 className="font-serif text-lg text-[#1E1B18] mb-2 font-bold">Diagnóstico Visagista & Teste de Mecha</h3>
              <p className="text-xs text-[#59524A] leading-relaxed font-light">
                Avaliação minuciosa da anatomia facial e teste de mecha obrigatório para assegurar a elasticidade e a integridade da fibra.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E8DFD5] shadow-xs hover:border-[#C99065]/50 transition-colors">
              <span className="font-serif text-2xl text-[#8F6E32] block mb-3 font-bold">03</span>
              <h3 className="font-serif text-lg text-[#1E1B18] mb-2 font-bold">Privacidade & Conforto Total</h3>
              <p className="text-xs text-[#59524A] leading-relaxed font-light">
                Espaço climatizado, lavatório ergonômico, Wi-Fi de alta velocidade e facilidade de estacionamento no bairro Nonoai.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://wa.me/5551999999999?text=Olá,%20Fernanda!%20Gostaria%20de%20agendar%20uma%20triagem%20de%20horário%20para%20atendimento%20exclusivo%20na%20Sala%20205."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-md"
            >
              Agendar Horário Exclusivo no WhatsApp →
            </a>
          </div>
        </div>
      </section>

      {/* 11. TRIAGEM INTELIGENTE (FILTRO DE ATENDIMENTO VIP) */}
      <section id="triagem-inteligente" className="scroll-mt-20 py-24 bg-[#141210] text-[#FAF6F0] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#D4AF37]/40 shadow-xs mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#E6C99B]">
                Triagem Rápida Personalizada
              </span>
            </div>
            
            <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
              Triagem Inteligente de Atendimento
            </h2>
            <p className="text-sm text-neutral-300 font-light mt-3 leading-relaxed">
              Descubra a combinação ideal de procedimento para seu perfil em 3 passos simples antes de iniciar seu atendimento na Sala 205.
            </p>
          </div>

          <div className="bg-[#1C1917] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl space-y-8">
            
            {/* ETAPA 1 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#12100E] font-bold text-xs flex items-center justify-center">1</span>
                <h3 className="font-serif text-lg sm:text-xl text-white font-medium">Qual é o seu tipo de curvatura?</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["Fio Liso", "Ondulado", "Cacheado", "Crespo"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTriageCurvatura(item)}
                    className={`min-h-[48px] px-4 py-3 rounded-2xl text-xs font-semibold tracking-wide transition-all duration-200 border cursor-pointer ${
                      triageCurvatura === item
                        ? "bg-[#D4AF37] text-[#12100E] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                        : "bg-white/5 hover:bg-white/10 text-white/80 border-white/10"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* ETAPA 2 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#12100E] font-bold text-xs flex items-center justify-center">2</span>
                <h3 className="font-serif text-lg sm:text-xl text-white font-medium">Qual nuance você deseja?</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {["Marrom Marcante", "Dourado Solar", "Cachos Mel & Caramelo", "Manutenção & Corte"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTriageNuance(item)}
                    className={`min-h-[48px] px-4 py-3 rounded-2xl text-xs font-semibold tracking-wide transition-all duration-200 border cursor-pointer ${
                      triageNuance === item
                        ? "bg-[#D4AF37] text-[#12100E] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                        : "bg-white/5 hover:bg-white/10 text-white/80 border-white/10"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* ETAPA 3 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#12100E] font-bold text-xs flex items-center justify-center">3</span>
                <h3 className="font-serif text-lg sm:text-xl text-white font-medium">Seu cabelo já possui química anterior?</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["Sim", "Cabelo Natural"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTriageQuimica(item)}
                    className={`min-h-[48px] px-4 py-3 rounded-2xl text-xs font-semibold tracking-wide transition-all duration-200 border cursor-pointer ${
                      triageQuimica === item
                        ? "bg-[#D4AF37] text-[#12100E] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                        : "bg-white/5 hover:bg-white/10 text-white/80 border-white/10"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* RESUMO DO DIAGNÓSTICO E BOTÃO FINAL */}
            <div className="pt-6 border-t border-white/10 flex flex-col items-center gap-4 text-center">
              <div className="text-xs font-mono text-neutral-300">
                <span className="text-[#D4AF37] font-semibold">Diagnóstico selecionado:</span> {triageCurvatura} • {triageNuance} • Química: {triageQuimica}
              </div>

              <a
                href={generateTriageWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#C99065] to-[#B87D4B] hover:from-[#E5C158] hover:to-[#C99065] text-[#12100E] font-sans font-bold text-xs tracking-wider uppercase shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300 inline-flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
              >
                <span>Gerar Diagnóstico e Enviar para a Fernanda no WhatsApp</span>
                <span>→</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 12. LOCALIZAÇÃO E CONTATO DIRETO */}
      <section id="atelie" className="py-20 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#6E501E] font-bold">Localização & Contato</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-bold">
              Atendimento Personalizado em Porto Alegre
            </h2>
            <p className="text-xs sm:text-sm text-[#59524A] font-light leading-relaxed">
              Ateliê preparado para atendimentos privativos com hora marcada. Av. Nonoai, nº 151, Sala 205 — Bairro Nonoai, Porto Alegre / RS.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Av.+Nonoai,+151,+Sala+205+-+Porto+Alegre+-+RS" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-[#1C1917] text-white text-xs tracking-wider uppercase font-semibold hover:bg-[#8F6E32] transition-colors"
              >
                Traçar Rota no Google Maps
              </a>
              <a 
                href="https://waze.com/ul?q=Av.+Nonoai,+151+Porto+Alegre" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full border border-[#D9CEBF] text-[#1C1917] text-xs tracking-wider uppercase font-semibold hover:border-[#1C1917] transition-colors"
              >
                Navegar via Waze
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#E8DFD5] h-[340px] shadow-sm">
            <iframe
              title="Localização Fernanda Garroni na Av. Nonoai, 151"
              src="https://maps.google.com/maps?q=Av.+Nonoai,+151+-+Porto+Alegre+-+RS&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

        </div>
      </section>

      {/* 12. FOOTER EDITORIAL OFICIAL */}
      <footer className="bg-[#12100E] text-neutral-400 py-12 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#C99065]/40">
              <img src="/midias/foto-logo-fernanda.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-serif text-white tracking-wide text-sm">Fernanda Garroni • Cabeleireira & Visagista</span>
          </div>

          <span className="text-[11px] font-mono text-neutral-400">
            Av. Nonoai, nº 151, Sala 205 • Porto Alegre - RS
          </span>

          <span className="text-[11px] text-neutral-500">
            © 2026 Fernanda Garroni. Todos os direitos reservados.
          </span>
        </div>
      </footer>

      {/* BOTÃO FLUTUANTE DE TRIAGEM RÁPIDA VIP */}
      <aside aria-label="Ir para a Triagem Inteligente" className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <a
          href="#triagem-inteligente"
          aria-label="Iniciar Triagem Inteligente VIP"
          className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#25D366] via-[#20BD5A] to-[#128C7E] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_10px_35px_rgba(37,211,102,0.65)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#D4AF37]/50 via-[#25D366]/30 to-[#D4AF37]/50 blur-sm opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          {/* Ícone oficial SVG do WhatsApp */}
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 fill-current relative z-10 drop-shadow-sm"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </a>
      </aside>

    </div>
  );
}
