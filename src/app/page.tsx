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
    src: "/midias/frame1-fernanda.jpg",
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
            <a href="#atelie" className="hover:text-[#1C1917] transition-colors">Ateliê Nonoai</a>
          </nav>

          <a 
            href="https://wa.me/5551999999999?text=Olá,%20Fernanda!%20Gostaria%20de%20agendar%20uma%20avaliação%20VIP."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-full bg-[#1C1917] text-[#FAF3F0] text-xs font-semibold tracking-wider uppercase hover:bg-[#8F6E32] transition-colors duration-300 shadow-sm"
          >
            Avaliação VIP
          </a>
        </div>
      </header>

      {/* 2. HERO CINEMÁTICA FLUIDA A 60FPS (DESOBSTRUÇÃO TOTAL DO ROSTO) */}
      <section className="relative w-full h-[88vh] sm:h-[94vh] min-h-[600px] bg-[#12100E] overflow-hidden flex flex-col justify-end select-none">
        <video
          src="/midias/intro-fernanda.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.92] contrast-[1.04] pointer-events-none transform-gpu"
        />
        
        {/* Gradiente escuro ascendente na base: preserva o rosto da Fernanda 100% limpo no topo/centro e dá contraste perfeito ao texto na base */}
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#FAF6F0] via-black/75 via-45% to-transparent pointer-events-none z-10" />

        <div className="relative z-20 flex flex-col items-center justify-end text-center px-5 max-w-4xl mx-auto pb-10 sm:pb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#C99065]/40 shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C99065] animate-ping" />
            <span className="font-mono text-[9px] sm:text-[11px] tracking-[0.28em] uppercase text-white/95">
              ARQUITETURA FACIAL & ILUMINAÇÃO AUTORAL
            </span>
          </div>

          <h1 className="font-serif font-light tracking-tight text-3xl sm:text-5xl md:text-6xl text-white/95 leading-[1.12] [text-wrap:balance] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            Sua melhor versão com <span className="italic font-normal text-[#E0CEB5]">Morenas Iluminadas</span> e corte visagista sob medida.
          </h1>

          <p className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#E0CEB5]/90 mt-4 sm:mt-5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            FERNANDA GARRONI — ATELIÊ BOUTIQUE • PORTO ALEGRE (AV. NONOAI, 151)
          </p>

          <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <a
              href="https://wa.me/5551999999999?text=Olá,%20Fernanda!%20Gostaria%20de%20agendar%20uma%20avaliação%20VIP."
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] w-full sm:w-auto px-8 py-3.5 bg-[#C99065] hover:bg-[#b57f56] text-[#12100E] font-sans font-bold text-xs tracking-widest uppercase rounded-full shadow-2xl transition-all duration-300 inline-flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Agendar Avaliação VIP</span>
              <span>→</span>
            </a>
            <a
              href="#triade"
              className="min-h-[48px] w-full sm:w-auto px-7 py-3.5 bg-black/40 hover:bg-black/60 text-white backdrop-blur-md border border-white/30 font-sans font-semibold text-xs tracking-widest uppercase rounded-full transition-all inline-flex items-center justify-center active:scale-95"
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
              <span className="w-2 h-2 rounded-full bg-[#8F6E32] animate-pulse" />
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
                  src="/midias/frame1-fernanda.jpg" 
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
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCaseIdx(idx);
                    const triadeEl = document.getElementById("triade");
                    if (triadeEl) triadeEl.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FAF3F0] hover:bg-[#1C1917] hover:text-white text-[#1C1917] border border-[#E8DFD5] font-sans font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Comparar no Slider Interativo</span>
                  <span>⇄</span>
                </button>
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

                  {/* CONTROLE DE SOM */}
                  <button
                    type="button"
                    onClick={() => toggleVideoMute(item.id)}
                    className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 flex items-center justify-center text-xs transition-colors cursor-pointer"
                    aria-label="Alternar som do vídeo"
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
                  src="/midias/video-fernanda-cronograma-capilar-lavatorio.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover" 
                />
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

      {/* 11. LOCALIZAÇÃO E CONTATO DIRETO */}
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

    </div>
  );
}
