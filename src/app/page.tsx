"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Page() {
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<"triade" | "curvaturas" | "terapia">("triade");
  const [sliderPos, setSliderPos] = useState<number>(50);
  const isDragging = useRef(false);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      if (progress >= 100) {
        clearInterval(interval);
        setLoadingProgress(100);
        setTimeout(() => setLoaded(true), 400);
      } else {
        setLoadingProgress(progress);
      }
    }, 25);
    return () => clearInterval(interval);
  }, []);

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleSliderKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPos((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1816] font-sans selection:bg-[#C99065]/25 selection:text-[#1A1816] antialiased overflow-x-hidden">
      
      {/* 1. LOADER MINIMALISTA DE ALTA FIDELIDADE */}
      {!loaded && (
        <aside 
          aria-label="Carregando experiência" 
          className={`fixed inset-0 z-50 bg-[#12100E] flex flex-col items-center justify-center p-6 select-none transition-opacity duration-700 ${
            loadingProgress === 100 ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="flex flex-col items-center max-w-xs w-full">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border border-[#C99065]/40 p-1 mb-6">
              <img 
                src="/midias/foto-logo-fernanda.jpg" 
                alt="Logo Fernanda Garroni" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="font-serif italic text-xl tracking-wider text-[#FAF3F0] mb-4">Fernanda Garroni</span>
            <div className="w-36 h-[1.5px] bg-white/10 overflow-hidden rounded-full mb-3">
              <div 
                className="h-full bg-gradient-to-r from-[#C99065] to-[#E6C99B] transition-all duration-150" 
                style={{ width: `${loadingProgress}%` }} 
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#E0CEB5]/70">
              {String(loadingProgress).padStart(3, "0")}%
            </span>
          </div>
        </aside>
      )}

      {/* 2. HEADER ASSIMÉTRICO BOUTIQUE */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E8DFD8]">
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
              <span className="font-serif text-lg tracking-tight font-medium text-[#1A1816]">Fernanda Garroni</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#736B63] font-mono">Visagismo Autoral</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-xs tracking-wider uppercase font-medium text-[#524B43]">
            <a href="#metodologia" className="hover:text-[#1A1816] transition-colors">Visagismo</a>
            <a href="#triade" className="hover:text-[#1A1816] transition-colors">Tríade de Iluminação</a>
            <a href="#curvaturas" className="hover:text-[#1A1816] transition-colors">Curvaturas</a>
            <a href="#espaco" className="hover:text-[#1A1816] transition-colors">Ateliê Nonoai</a>
          </nav>

          <a 
            href="https://wa.me/5551999999999?text=Olá,%20Fernanda!%20Gostaria%20de%20agendar%20uma%20avaliação%20visagista."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-full bg-[#1A1816] text-[#FAF3F0] text-xs font-medium tracking-wider uppercase hover:bg-[#C99065] transition-colors duration-300"
          >
            Avaliação VIP
          </a>
        </div>
      </header>

      {/* 3. HERO EDITORIAL COM RECORTE ARQUITETÔNICO */}
      <section id="metodologia" className="relative pt-12 pb-20 md:py-28 px-5 sm:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#C99065]/40 bg-[#C99065]/5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C99065] animate-ping" />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#5C3F22]">
                Porto Alegre • Av. Nonoai, 151
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#1A1816] mb-6">
              A arquitetura da sua <span className="italic font-normal text-[#8A5A36]">expressão facial</span> através da luz e do corte.
            </h1>

            <p className="text-sm sm:text-base text-[#59524B] font-light leading-relaxed max-w-xl mb-8">
              Desenho visagista autoral que respeita a saúde integral da fibra capilar. Iluminação sem marcas e arquitetura a seco desenhada sob medida para a sua curvatura.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a 
                href="https://wa.me/5551999999999?text=Olá,%20Fernanda!%20Desejo%20agendar%20minha%20avaliação."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[50px] px-8 rounded-full bg-[#1A1816] text-[#FDFBF7] text-xs uppercase tracking-widest font-medium hover:bg-[#8A5A36] transition-colors duration-300 shadow-md"
              >
                Agendar Consultoria Exclusiva
              </a>
              <a 
                href="#triade" 
                className="inline-flex items-center justify-center min-h-[50px] px-7 rounded-full border border-[#D9CFC4] text-[#1A1816] text-xs uppercase tracking-widest font-medium hover:border-[#1A1816] transition-colors"
              >
                Explorar a Tríade
              </a>
            </div>
          </div>

          {/* Composição Fotográfica Assimétrica */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-t-[140px] rounded-b-2xl overflow-hidden shadow-2xl border border-[#E0D5CA] bg-[#12100E]">
              <img 
                src="/midias/frame1-fernanda.jpg" 
                alt="Fernanda Garroni - Visagista Titular" 
                className="w-full h-full object-cover object-center filter contrast-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 inset-x-6 text-white flex justify-between items-end">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#E6C99B] block mb-1">Especialista Titular</span>
                  <span className="font-serif text-xl">Fernanda Garroni</span>
                </div>
                <span className="text-[11px] font-mono tracking-widest text-white/70">SALA 205</span>
              </div>
            </div>

            {/* Elemento de Tensão Visual Geométrico */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full border border-[#C99065]/40 pointer-events-none -z-0" />
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#C99065]/10 blur-xl pointer-events-none -z-0" />
          </div>

        </div>
      </section>

      {/* 4. A TRÍADE DE MORENAS ILUMINADAS — COMPARADOR COM RITMO EDITORIAL */}
      <section id="triade" className="py-24 bg-[#141210] text-[#FDFBF7] relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C99065] block mb-3">
                Assinatura Técnica
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white">
                A Tríade de Morenas Iluminadas
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-md mt-4 md:mt-0 leading-relaxed">
              Arraste a linha divisória sobre o diagnóstico fotográfico para analisar o contraste, a integridade da raiz e a preservação do cacho.
            </p>
          </div>

          {/* Comparador Interativo de Antes e Depois Central */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7">
              <div 
                role="slider"
                aria-label="Comparador de antes e depois da Morena Iluminada"
                aria-valuenow={Math.round(sliderPos)}
                aria-valuemin={0}
                aria-valuemax={100}
                tabIndex={0}
                onKeyDown={handleSliderKeyDown}
                className="relative w-full aspect-[4/5] sm:aspect-[16/11] rounded-2xl overflow-hidden select-none shadow-2xl cursor-ew-resize border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#C99065]"
                onMouseDown={() => (isDragging.current = true)}
                onMouseUp={() => (isDragging.current = false)}
                onMouseLeave={() => (isDragging.current = false)}
                onMouseMove={(e) => isDragging.current && handleSliderMove(e.clientX, e.currentTarget.getBoundingClientRect())}
                onTouchStart={(e) => handleSliderMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect())}
                onTouchMove={(e) => handleSliderMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect())}
              >
                {/* Imagem Depois */}
                <img 
                  src="/midias/foto-fernanda-morena-iluminada-marrom-acobreado-depois.jpg" 
                  alt="Resultado final Morena Iluminada" 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
                
                {/* Imagem Antes */}
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
                    Base Inicial
                  </span>
                </div>

                <span className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-[0.2em] bg-black/70 px-3 py-1 rounded-full text-[#E0CEB5]">
                  Resultado Autoral
                </span>

                {/* Divisor */}
                <div 
                  className="absolute top-0 bottom-0 w-[1.5px] bg-[#E0CEB5] pointer-events-none" 
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -left-3.5 -translate-y-1/2 w-7 h-7 rounded-full bg-[#141210] border border-[#E0CEB5] flex items-center justify-center text-[10px] text-[#E0CEB5] shadow-lg">
                    ⇄
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna Editorial de Diagnóstico dos 3 Tons */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#C99065]/40 transition-colors">
                <span className="font-mono text-[10px] text-[#C99065] tracking-widest uppercase">Pilar 01</span>
                <h3 className="font-serif text-xl text-white mt-1 mb-2">Marrom Marcante & Acobreado</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Reflexos de avelã e canela com profundidade elegante. Perfeito para bases escuras naturais que buscam calor sem clareamento excessivo.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#C99065]/40 transition-colors">
                <span className="font-mono text-[10px] text-[#C99065] tracking-widest uppercase">Pilar 02</span>
                <h3 className="font-serif text-xl text-white mt-1 mb-2">Dourado Solar no Fio Liso</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Pontos de luz difusos que acompanham o caimento vertical, garantindo crescimento limpo sem linhas de demarcação na raiz.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#C99065]/40 transition-colors">
                <span className="font-mono text-[10px] text-[#C99065] tracking-widest uppercase">Pilar 03</span>
                <h3 className="font-serif text-xl text-white mt-1 mb-2">Cachos Mel & Caramelo</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Iluminação mecha a mecha respeitando a elasticidade do fio espiralado. Definição tridimensional com textura intacta.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. ARQUITETURA DE CORTES E VISAGISMO EM CURVATURAS */}
      <section id="curvaturas" className="py-24 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#735A42] block">
              Curvaturas 2A a 4C
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1A1816] font-normal leading-[1.12]">
              Corte a seco estruturado: respeito absoluto à elasticidade.
            </h2>
            <p className="text-sm text-[#59524B] leading-relaxed font-light">
              Cabelos ondulados, cacheados e crespos exigem leitura anatômica antes do corte. Cada camada é desenhada para distribuir o volume em 360°, evitando a triangularização da base e respeitando o fator de encolhimento pós-secagem.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="border-l border-[#8A5A36] pl-4">
                <span className="font-serif text-lg text-[#1A1816] block">Zero Efeito Pirâmide</span>
                <span className="text-xs text-[#736B63] font-light">Leveza e definição harmônica</span>
              </div>
              <div className="border-l border-[#8A5A36] pl-4">
                <span className="font-serif text-lg text-[#1A1816] block">Teste de Mecha Prévio</span>
                <span className="text-xs text-[#736B63] font-light">Avaliação da integridade da fibra</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-[3/4] border border-[#E0D5CA] shadow-sm">
              <img 
                src="/midias/foto-fernanda-morena-iluminada-ondas-mel-frente.jpg" 
                alt="Corte em ondas frontal" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[3/4] border border-[#E0D5CA] shadow-sm mt-8">
              <img 
                src="/midias/foto-fernanda-morena-iluminada-perfil-suave-finalizado.jpg" 
                alt="Perfil visagista finalizado" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 6. ATELIÊ PRIVATIVO — PILARES DE AUTORIDADE NA SALA 205 */}
      <section id="espaco" className="py-20 bg-[#F4EFEA] border-y border-[#E5DDD4]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#735A42] block mb-2">
              Atendimento Boutique
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1816] font-normal">
              A experiência privativa na Av. Nonoai, 151
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#FDFBF7] border border-[#E5DDD4] shadow-sm">
              <span className="font-serif text-2xl text-[#8A5A36] block mb-3">01</span>
              <h3 className="font-serif text-lg text-[#1A1816] mb-2">Hora Marcada Exclusiva</h3>
              <p className="text-xs text-[#59524B] leading-relaxed font-light">
                Atendimento individualizado sem o ritmo acelerado de salões convencionais. Dedicação integral ao seu diagnóstico capilar.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#FDFBF7] border border-[#E5DDD4] shadow-sm">
              <span className="font-serif text-2xl text-[#8A5A36] block mb-3">02</span>
              <h3 className="font-serif text-lg text-[#1A1816] mb-2">Lavatório Spa Terapêutico</h3>
              <p className="text-xs text-[#59524B] leading-relaxed font-light">
                Acidificação, reposição lipídica e reestruturação proteica mecha a mecha com massagem craniana relaxante.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#FDFBF7] border border-[#E5DDD4] shadow-sm">
              <span className="font-serif text-2xl text-[#8A5A36] block mb-3">03</span>
              <h3 className="font-serif text-lg text-[#1A1816] mb-2">Acesso & Privacidade</h3>
              <p className="text-xs text-[#59524B] leading-relaxed font-light">
                Ambiente climatizado, café especial, Wi-Fi e facilidade de estacionamento no bairro Nonoai (Sala 205).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LOCALIZAÇÃO E CONTATO DIRETO */}
      <section className="py-20 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#735A42]">Agendamento Prévio</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1816] font-normal">
              Pronta para revelar a sua nuance autoral?
            </h2>
            <p className="text-xs sm:text-sm text-[#59524B] font-light leading-relaxed">
              As avaliações visagistas ocorrem com horário agendado de terça a sábado. Inicie o contato via WhatsApp para triagem de data e horário.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a 
                href="https://wa.me/5551999999999?text=Olá,%20Fernanda!%20Gostaria%20de%20consultar%20a%20disponibilidade%20para%20avaliação."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-[#1A1816] text-white text-xs tracking-widest uppercase hover:bg-[#8A5A36] transition-colors"
              >
                Conversar pelo WhatsApp
              </a>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Av.+Nonoai,+151,+Porto+Alegre+-+RS"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[48px] px-5 rounded-full border border-[#D9CFC4] text-[#1A1816] text-xs tracking-wider uppercase hover:border-[#1A1816] transition-colors"
              >
                Google Maps
              </a>
              <a 
                href="https://waze.com/ul?q=Av.+Nonoai,+151,+Porto+Alegre"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[48px] px-5 rounded-full border border-[#D9CFC4] text-[#1A1816] text-xs tracking-wider uppercase hover:border-[#1A1816] transition-colors"
              >
                Waze
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#E5DDD4] h-[340px] shadow-sm">
            <iframe
              title="Localização Fernanda Garroni na Av. Nonoai, 151"
              src="https://maps.google.com/maps?q=Av.+Nonoai,+151+-+Porto+Alegre+-+RS&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 8. FOOTER EDITORIAL */}
      <footer className="bg-[#12100E] text-neutral-400 py-12 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#C99065]/40">
              <img src="/midias/foto-logo-fernanda.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-serif text-white tracking-wide text-sm">Fernanda Garroni • Visagista</span>
          </div>

          <span className="text-[11px] font-mono text-neutral-500">
            Av. Nonoai, nº 151, Sala 205 • Porto Alegre - RS
          </span>

          <span className="text-[11px] text-neutral-600">
            © 2026 Fernanda Garroni. Todos os direitos reservados.
          </span>
        </div>
      </footer>

    </div>
  );
}
