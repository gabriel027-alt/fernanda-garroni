"use client";

import React, { useState, useEffect, useRef } from "react";

export default function Page() {
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 4;
      if (progress >= 100) {
        clearInterval(interval);
        setLoadingProgress(100);
        setTimeout(() => setLoaded(true), 350);
      } else {
        setLoadingProgress(progress);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1E1B18] font-sans antialiased selection:bg-[#C5A880]/30 selection:text-[#1E1B18] overflow-x-hidden">
      
      {/* 1. LOADER MINIMALISTA BOUTIQUE */}
      {!loaded && (
        <aside 
          aria-label="Carregando experiência" 
          className="fixed inset-0 z-50 bg-[#141210] flex flex-col items-center justify-center p-6 select-none transition-opacity duration-500"
        >
          <div className="flex flex-col items-center max-w-xs w-full">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border border-[#C5A880]/40 p-1 mb-5">
              <img 
                src="/midias/foto-logo-fernanda.jpg" 
                alt="Fernanda Garroni" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="font-serif italic text-2xl text-[#FAF3F0] mb-3 tracking-wide">Fernanda Garroni</span>
            <div className="w-36 h-[2px] bg-white/10 overflow-hidden rounded-full mb-3">
              <div 
                className="h-full bg-[#C5A880] transition-all duration-150 ease-out" 
                style={{ width: `${loadingProgress}%` }} 
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#E0CEB5]/70">
              {String(loadingProgress).padStart(3, "0")}%
            </span>
          </div>
        </aside>
      )}

      {/* 2. HEADER EDITORIAL COMPACTO */}
      <header className="sticky top-0 z-40 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#E8DFD5] transition-all">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-[#C5A880]/50 p-0.5 shrink-0 bg-[#141210]">
              <img 
                src="/midias/foto-logo-fernanda.jpg" 
                alt="Fernanda Garroni" 
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-tight font-medium text-[#1E1B18]">Fernanda Garroni</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#7A7269] font-mono">Visagismo & Terapia</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-xs tracking-wider uppercase font-medium text-[#59524A]">
            <a href="#triade" className="hover:text-[#1E1B18] transition-colors">Tríade Autoral</a>
            <a href="#curvaturas" className="hover:text-[#1E1B18] transition-colors">Curvaturas</a>
            <a href="#lavatorio" className="hover:text-[#1E1B18] transition-colors">Lavatório Spa</a>
            <a href="#atelie" className="hover:text-[#1E1B18] transition-colors">Ateliê Nonoai</a>
          </nav>

          <a 
            href="https://wa.me/5551999999999?text=Olá,%20Fernanda!%20Gostaria%20de%20agendar%20uma%20avaliação%20VIP."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-full bg-[#1E1B18] text-[#FAF3F0] text-xs font-medium tracking-wider uppercase hover:bg-[#8F6E32] transition-colors duration-300 shadow-sm"
          >
            Avaliação VIP
          </a>
        </div>
      </header>

      {/* 3. HERO ASSIMÉTRICA AUTORAL */}
      <section className="relative pt-12 pb-20 md:py-24 px-5 sm:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#C5A880]/40 bg-[#C5A880]/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#8F6E32] animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#6E501E]">
                Porto Alegre • Av. Nonoai, 151 (Sala 205)
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#1E1B18] mb-6">
              A arquitetura da sua expressão com <span className="italic font-normal text-[#944234]">Morenas Iluminadas</span> e corte sob medida.
            </h1>

            <p className="text-base text-[#59524A] font-light leading-relaxed max-w-xl mb-8">
              Técnicas autorais de iluminação personalizadas para a sua arquitetura facial e respeito absoluto à saúde da fibra. Do liso alinhado aos cachos e ondas com definição tridimensional.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a 
                href="https://wa.me/5551999999999?text=Olá,%20Fernanda!%20Gostaria%20de%20agendar%20minha%20avaliação%20visagista."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[50px] px-8 rounded-full bg-[#1E1B18] text-[#FAF6F0] text-xs uppercase tracking-widest font-semibold hover:bg-[#8F6E32] transition-colors duration-300 shadow-md"
              >
                Agendar Avaliação no WhatsApp →
              </a>
              <a 
                href="#triade" 
                className="inline-flex items-center justify-center min-h-[50px] px-7 rounded-full border border-[#D9CEBF] text-[#1E1B18] text-xs uppercase tracking-widest font-semibold hover:border-[#1E1B18] transition-colors"
              >
                Conhecer a Tríade
              </a>
            </div>
          </div>

          {/* Enquadramento Editorial da Fernanda com Arco Visagista */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[9/13] rounded-t-[160px] rounded-b-2xl overflow-hidden shadow-2xl border-2 border-[#C5A880]/50 bg-[#141210]">
              <img 
                src="/midias/frame1-fernanda.jpg" 
                alt="Fernanda Garroni" 
                className="w-full h-full object-cover object-top filter contrast-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 inset-x-6 text-white flex justify-between items-end">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#E6C99B] block mb-1">Visagista Titular</span>
                  <span className="font-serif text-2xl font-bold">Fernanda Garroni</span>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-[#E6C99B] bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  SALA 205
                </span>
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
              Arraste a divisória sobre o diagnóstico fotográfico para comparar o resultado real de Antes e Depois de cada nuance.
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
                  Tons quentes de avelã e canela com profundidade elegante. Perfeito para bases escuras sem perder a naturalidade da raiz.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#C5A880]/50 transition-colors">
                <span className="font-mono text-[10px] text-[#C5A880] tracking-widest uppercase">Nuance 02</span>
                <h3 className="font-serif text-xl text-white mt-1 mb-2">Dourado Solar no Fio Liso</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Reflexos de iluminação difusa que acompanham o alinhamento reto do cabelo, garantindo transição imperceptível e brilho espelhado.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#C5A880]/50 transition-colors">
                <span className="font-mono text-[10px] text-[#C5A880] tracking-widest uppercase">Nuance 03</span>
                <h3 className="font-serif text-xl text-white mt-1 mb-2">Cachos Mel & Caramelo</h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Mechas esculpidas no padrão natural da curvatura. Cria relevo e movimento nos cachos preservando 100% da elasticidade da mola capilar.
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
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1E1B18] font-normal leading-[1.12]">
              Corte a seco estruturado: respeito absoluto à forma.
            </h2>
            <p className="text-sm text-[#59524A] leading-relaxed font-light">
              Cabelos ondulados, cacheados e crespos exigem leitura técnica anatômica. Do fator de encolhimento à densidade do cacho, cada corte é desenhado a seco para valorizar o seu volume sem criar o indesejado formato pirâmide.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="border-l-2 border-[#8F6E32] pl-4">
                <span className="font-serif text-base text-[#1E1B18] block font-bold">Zero Efeito Pirâmide</span>
                <span className="text-xs text-[#7A7269] font-light">Distribuição de camadas em 360°</span>
              </div>
              <div className="border-l-2 border-[#8F6E32] pl-4">
                <span className="font-serif text-base text-[#1E1B18] block font-bold">Teste de Mecha</span>
                <span className="text-xs text-[#7A7269] font-light">Preservação rigorosa da fibra</span>
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
                O tratamento no lavatório é um diagnóstico profundo com reposição lipídica, reestruturação proteica e relaxamento terapêutico na Av. Nonoai, 151.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5]">
                  <strong className="text-xs font-bold uppercase tracking-wider text-[#8F6E32] block">Fase 01 — Acidificação Cuticular</strong>
                  <p className="text-xs text-[#59524A] mt-1">Reequilíbrio de pH pós-química para selar as cutículas e gerar brilho reflexivo instantâneo.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5]">
                  <strong className="text-xs font-bold uppercase tracking-wider text-[#8F6E32] block">Fase 02 — Nutrição Lipídica</strong>
                  <p className="text-xs text-[#59524A] mt-1">Reposição de óleos nobres para combater o ressecamento e o toque áspero das pontas.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD5]">
                  <strong className="text-xs font-bold uppercase tracking-wider text-[#8F6E32] block">Fase 03 — Reconstrução Proteica</strong>
                  <p className="text-xs text-[#59524A] mt-1">Devolução de aminoácidos ao córtex capilar, aumentando a resistência à quebra mecânica.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-xl border border-[#C5A880]/40 bg-[#141210] aspect-[9/13]">
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

      {/* 7. LOCALIZAÇÃO E CONTATO DIRETO */}
      <section id="atelie" className="py-20 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#6E501E]">Espaço Exclusivo</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal">
              Atendimento Personalizado em Porto Alegre
            </h2>
            <p className="text-xs sm:text-sm text-[#59524A] font-light leading-relaxed">
              Ambiente acolhedor, climatizado e preparado para atendimentos visagistas privativos com hora marcada. Av. Nonoai, nº 151, Sala 205 (Porto Alegre / RS).
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Av.+Nonoai,+151,+Sala+205+-+Porto+Alegre+-+RS" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full bg-[#1E1B18] text-white text-xs tracking-wider uppercase font-medium hover:bg-[#8F6E32] transition-colors"
              >
                Traçar Rota no Google Maps
              </a>
              <a 
                href="https://waze.com/ul?q=Av.+Nonoai,+151+Porto+Alegre" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full border border-[#D9CEBF] text-[#1E1B18] text-xs tracking-wider uppercase font-medium hover:border-[#1E1B18] transition-colors"
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

      {/* 8. FOOTER EDITORIAL OFICIAL */}
      <footer className="bg-[#141210] text-neutral-400 py-12 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#C5A880]/40">
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
