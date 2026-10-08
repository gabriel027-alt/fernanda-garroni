"use client";

import React, { useState, useRef } from "react";

export default function Page() {
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
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

          <nav className="hidden md:flex items-center gap-8 text-xs tracking-wider uppercase font-medium text-[#524B43]">
            <a href="#triade" className="hover:text-[#1C1917] transition-colors">Tríade Autoral</a>
            <a href="#curvaturas" className="hover:text-[#1C1917] transition-colors">Curvaturas & Cortes</a>
            <a href="#lavatorio" className="hover:text-[#1C1917] transition-colors">Lavatório Spa</a>
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

      {/* 2. HERO CINEMÁTICA FLUIDA A 60FPS (SEM ENGASGOS NO MOBILE) */}
      <section className="relative w-full h-[85vh] sm:h-[90vh] bg-[#12100E] overflow-hidden flex items-center justify-center select-none">
        <video
          src="/midias/intro-fernanda.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.76] contrast-[1.08] pointer-events-none"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-black/40 to-black/60 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.50)_0%,transparent_75%)] pointer-events-none z-10" />

        <div className="relative z-20 flex flex-col items-center justify-center text-center px-5 max-w-4xl mx-auto mt-4">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#C99065]/40 shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C99065] animate-ping" />
            <span className="font-mono text-[9px] sm:text-xs tracking-[0.3em] uppercase text-white/95">
              ARQUITETURA FACIAL & ILUMINAÇÃO AUTORAL
            </span>
          </div>

          <h1 className="font-serif font-light tracking-tight text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white/95 leading-[1.12] [text-wrap:balance] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            Sua melhor versão com <span className="italic font-normal text-[#E0CEB5]">Morenas Iluminadas</span> e corte visagista sob medida.
          </h1>

          <p className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#E0CEB5]/90 mt-5 sm:mt-7 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
            FERNANDA GARRONI — ATELIÊ BOUTIQUE • PORTO ALEGRE (AV. NONOAI, 151)
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
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
              className="min-h-[48px] w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 font-sans font-semibold text-xs tracking-widest uppercase rounded-full transition-all inline-flex items-center justify-center active:scale-95"
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

          {/* CARD DA FERNANDA */}
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

      {/* 4. A TRÍADE DE MORENAS ILUMINADAS — COMPARADOR COM RITMO EDITORIAL */}
      <section id="triade" className="py-24 bg-[#141210] text-[#FAF6F0] relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C5A880] block mb-3">
                Carro-Chefe do Espaço
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white">
                A Tríade de Morenas Iluminadas
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md mt-4 md:mt-0 leading-relaxed">
              Arraste o divisor para comparar o resultado real de Antes e Depois de cada técnica desenvolvida por Fernanda Garroni.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
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
                  src="/midias/foto-fernanda-morena-iluminada-marrom-acobreado-depois.jpg" 
                  alt="Resultado final Morena Iluminada" 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
                
                <div 
                  className="absolute inset-0 overflow-hidden pointer-events-none" 
                  style={{ width: `${sliderPos}%` }}
                >
                  <img 
                    src="/midias/foto-fernanda-morena-iluminada-marrom-acobreado-antes.jpg" 
                    alt="Cabelo antes do procedimento" 
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

            <div className="lg:col-span-5 flex flex-col gap-5">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#C5A880]/50 transition-colors">
                <span className="font-mono text-[10px] text-[#C5A880] tracking-widest uppercase">Nuance 01</span>
                <h3 className="font-serif text-xl text-white mt-1 mb-2">Marrom Marcante & Acobreado</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Tons quentes de avelã e canela com profundidade elegante. Perfeito para bases escuras naturais sem abrir mão da harmonia da raiz.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#C5A880]/50 transition-colors">
                <span className="font-mono text-[10px] text-[#C5A880] tracking-widest uppercase">Nuance 02</span>
                <h3 className="font-serif text-xl text-white mt-1 mb-2">Dourado Solar no Fio Liso</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Reflexos multidimensionais que acompanham o alinhamento reto do cabelo, com transição suave e brilho espelhado.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#C5A880]/50 transition-colors">
                <span className="font-mono text-[10px] text-[#C5A880] tracking-widest uppercase">Nuance 03</span>
                <h3 className="font-serif text-xl text-white mt-1 mb-2">Cachos Mel & Caramelo</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Mechas esculpidas respeitando a trajetória natural da mola capilar, garantindo definição e elasticidade intactas.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. CORTES EM CURVATURAS — VISAGISMO E PROPORÇÃO */}
      <section id="curvaturas" className="py-24 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#6E501E] block">
              Curvaturas 2A a 4C
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1C1917] font-normal leading-[1.12]">
              Corte a seco estruturado: respeito absoluto à forma.
            </h2>
            <p className="text-sm text-[#59524A] leading-relaxed font-light">
              Cabelos com curvatura demandam arquitetura personalizada. Do fator de encolhimento à densidade do cacho, cada corte é desenhado a seco para valorizar o seu volume sem gerar o formato pirâmide.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="border-l-2 border-[#8F6E32] pl-4">
                <span className="font-serif text-base text-[#1C1917] block font-bold">Zero Efeito Pirâmide</span>
                <span className="text-xs text-[#7A7269] font-light">Distribuição equilibrada em camadas</span>
              </div>
              <div className="border-l-2 border-[#8F6E32] pl-4">
                <span className="font-serif text-base text-[#1C1917] block font-bold">Teste de Mecha</span>
                <span className="text-xs text-[#7A7269] font-light">Garantia da integridade da fibra</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-[4/5] border border-[#E8DFD5] shadow-sm">
              <img 
                src="/midias/foto-fernanda-morena-iluminada-ondas-mel-frente.jpg" 
                alt="Corte em ondas frontal" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/5] border border-[#E8DFD5] shadow-sm mt-8">
              <img 
                src="/midias/foto-fernanda-morena-iluminada-perfil-suave-finalizado.jpg" 
                alt="Perfil visagista finalizado" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 6. CRONOGRAMA CAPILAR E LAVATÓRIO SPA */}
      <section id="lavatorio" className="py-20 bg-[#F4EDE4] border-y border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#6E501E] block">
                Saúde da Fibra & Lavatório Spa
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal leading-tight">
                Cronograma Capilar & Rituais de Recuperação
              </h2>
              <p className="text-sm text-[#59524A] font-light leading-relaxed">
                Diagnóstico profundo com reposição de massa lipídica, reestruturação proteica e relaxamento terapêutico na Av. Nonoai, 151.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5]">
                  <strong className="text-xs font-bold uppercase tracking-wider text-[#8F6E32] block">Fase 01 — Acidificação Cuticular</strong>
                  <p className="text-xs text-[#59524A] mt-1">Reequilíbrio de pH pós-processos químicos para selar as cutículas e proporcionar brilho reflexivo.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5]">
                  <strong className="text-xs font-bold uppercase tracking-wider text-[#8F6E32] block">Fase 02 — Nutrição Lipídica</strong>
                  <p className="text-xs text-[#59524A] mt-1">Reposição da camada lipídica protetora, combatendo o ressecamento das pontas.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5]">
                  <strong className="text-xs font-bold uppercase tracking-wider text-[#8F6E32] block">Fase 03 — Reconstrução Proteica</strong>
                  <p className="text-xs text-[#59524A] mt-1">Devolução de aminoácidos ao córtex capilar para restaurar a elasticidade mecânica.</p>
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
                  <p className="text-xs text-neutral-300 font-light mt-1">Emulsão minuciosa mecha a mecha com massagem capilar relaxante.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. PILARES DO ATELIÊ BOUTIQUE (SUBSTITUINDO REVIEWS FALSAS) */}
      <section className="py-20 bg-[#FAF6F0] border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#6E501E] block mb-2">
              Atendimento Boutique
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal">
              A experiência privativa na Av. Nonoai, 151
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-[#E8DFD5] shadow-xs">
              <span className="font-serif text-2xl text-[#8F6E32] block mb-3">01</span>
              <h3 className="font-serif text-lg text-[#1E1B18] mb-2 font-bold">Hora Marcada Exclusiva</h3>
              <p className="text-xs text-[#59524A] leading-relaxed font-light">
                Atendimento individualizado sem o ritmo acelerado de salões convencionais. Dedicação integral ao seu diagnóstico capilar.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E8DFD5] shadow-xs">
              <span className="font-serif text-2xl text-[#8F6E32] block mb-3">02</span>
              <h3 className="font-serif text-lg text-[#1E1B18] mb-2 font-bold">Diagnóstico Visagista Prévio</h3>
              <p className="text-xs text-[#59524A] leading-relaxed font-light">
                Avaliação anatômica e teste de mecha obrigatório antes de qualquer procedimento para garantir segurança absoluta.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E8DFD5] shadow-xs">
              <span className="font-serif text-2xl text-[#8F6E32] block mb-3">03</span>
              <h3 className="font-serif text-lg text-[#1E1B18] mb-2 font-bold">Privacidade & Conforto</h3>
              <p className="text-xs text-[#59524A] leading-relaxed font-light">
                Ambiente climatizado, café especial, Wi-Fi e facilidade de estacionamento no bairro Nonoai (Sala 205).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. LOCALIZAÇÃO E CONTATO DIRETO */}
      <section id="atelie" className="py-20 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#6E501E]">Localização & Contato</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal">
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

      {/* 9. FOOTER EDITORIAL OFICIAL */}
      <footer className="bg-[#12100E] text-neutral-400 py-12 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#C99065]/40">
              <img src="/midias/foto-logo-fernanda.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-serif text-white tracking-wide text-sm">Fernanda Garroni • Visagista</span>
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
