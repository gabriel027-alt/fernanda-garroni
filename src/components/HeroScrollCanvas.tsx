"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { ArrowDown, ChevronDown } from "lucide-react";

interface Chapter {
  id: number;
  tag: string;
  title: string;
  subtitle: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    tag: "ARQUITETURA FACIAL & VISAGISMO",
    title: "Fernanda Garroni",
    subtitle: "Cabeleireira & Visagista em Porto Alegre • Av. Nonoai, 151",
  },
  {
    id: 2,
    tag: "DIAGNÓSTICO & SEGURANÇA",
    title: "Consultoria Personalizada",
    subtitle: "Análise minuciosa de traços faciais e teste de mecha prévio",
  },
  {
    id: 3,
    tag: "COR CARRO-CHEFE",
    title: "Tríade de Morenas Iluminadas",
    subtitle: "Nuances Moça Mousse, avelã e caramelo com transição suave e zero marcas",
  },
  {
    id: 4,
    tag: "CURVATURAS EM MOVIMENTO",
    title: "Cortes & Cachos Definidos",
    subtitle: "Preservação da elasticidade da mola capilar e volume tridimensional",
  },
  {
    id: 5,
    tag: "RITUAL DE RECUPERAÇÃO",
    title: "Saúde da Fibra & Lavatório Spa",
    subtitle: "Tratamentos profundos e atmosfera relaxante na Sala 205 (Av. Nonoai, 151)",
  },
];

export function HeroScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [chapterProgresses, setChapterProgresses] = useState<number[]>([0, 0, 0, 0, 0]);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [textTranslateY, setTextTranslateY] = useState(0);

  // Rolagem suave e sem trancos direto para a seção principal de conteúdo
  const handleSkip = useCallback(() => {
    const target = document.getElementById("conteudo-principal");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      const container = containerRef.current || document.getElementById("hero-scroll-container");
      if (container) {
        window.scrollTo({
          top: container.offsetTop + container.offsetHeight,
          behavior: "smooth",
        });
      }
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Garante que o vídeo seja estritamente controlado pelo scroll (sem autoplay / sem loop)
    video.pause();

    let targetTime = 0;
    let isTicking = false;

    const updateScroll = () => {
      const container = containerRef.current || document.getElementById("hero-scroll-container");
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const maxScroll = container.offsetHeight - window.innerHeight;
      const currentScroll = Math.max(0, -rect.top);
      const progress = maxScroll > 0 ? Math.min(Math.max(currentScroll / maxScroll, 0), 1) : 0;

      if (video.duration && !isNaN(video.duration) && isFinite(video.duration)) {
        targetTime = progress * video.duration;
      }

      if (!isTicking) {
        isTicking = true;
        requestAnimationFrame(() => {
          // Atualização precisa do tempo do vídeo
          if (video && Math.abs(video.currentTime - targetTime) > 0.03) {
            video.currentTime = targetTime;
          }

          // Mapeamento dos 5 capítulos sincronizados com o scroll
          const chapterScrollRange = 0.85; // Capítulos cobrem até 85% do scroll
          const scaledProgress = Math.min(progress / chapterScrollRange, 1);
          const rawChapter = scaledProgress * CHAPTERS.length;
          const activeIdx = Math.min(CHAPTERS.length - 1, Math.floor(rawChapter));
          setCurrentChapterIndex(activeIdx);

          // Cálculo individual das barras de progresso superiores dos capítulos
          const newProgresses = CHAPTERS.map((_, idx) => {
            if (idx < activeIdx) return 100;
            if (idx === activeIdx) {
              const fraction = Math.min(Math.max(rawChapter - idx, 0), 1);
              return fraction * 100;
            }
            return 0;
          });
          setChapterProgresses(newProgresses);

          // Fade-out suave no final da rolagem (85% a 98%) para transição com o conteúdo oficial
          if (progress > 0.85) {
            const fadeFraction = Math.min((progress - 0.85) / (0.98 - 0.85), 1);
            setHeroOpacity(Math.max(0, 1 - fadeFraction));
            setTextTranslateY(fadeFraction * 35);
          } else {
            setHeroOpacity(1);
            setTextTranslateY(0);
          }

          isTicking = false;
        });
      }
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });
    video.addEventListener("loadedmetadata", updateScroll);
    video.addEventListener("canplay", updateScroll);

    if (video.readyState >= 1) {
      updateScroll();
    }

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      video.removeEventListener("loadedmetadata", updateScroll);
      video.removeEventListener("canplay", updateScroll);
    };
  }, []);

  const activeChapter = CHAPTERS[currentChapterIndex] || CHAPTERS[0];

  return (
    <div
      id="hero-scroll-container"
      ref={containerRef}
      className="relative h-[350vh] w-full bg-[#141210]"
      aria-label="Apresentação Cinemática Oficial • Fernanda Garroni"
    >
      {/* Viewport Fixo durante todo o percurso de Scroll Scrubbing */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden flex flex-col justify-between select-none">
        
        {/* ===================== VÍDEO CINEMÁTICO CONTROLADO POR SCROLL ===================== */}
        <video
          ref={videoRef}
          src="/midias/intro-fernanda.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none filter brightness-[0.90] contrast-[1.04]"
        />

        {/* Overlays de Contraste Profundo para Legibilidade Editorial */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/25 to-black/85 pointer-events-none z-10"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.50)_0%,transparent_75%)] pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* ===================== 1. BARRA SUPERIOR: PROGRESSO DOS CAPÍTULOS & PULAR INTRO ===================== */}
        <div
          style={{
            opacity: heroOpacity,
            pointerEvents: heroOpacity > 0.05 ? "auto" : "none",
          }}
          className="relative z-30 pt-4 sm:pt-6 px-4 sm:px-8 w-full max-w-5xl mx-auto flex flex-col gap-3 transition-opacity duration-150"
        >
          {/* 5 Barras de Progresso Horizontais Sincronizadas com o Scroll */}
          <div className="flex items-center gap-2 w-full">
            {CHAPTERS.map((chap, idx) => (
              <div
                key={chap.id}
                className="h-1 bg-white/20 rounded-full overflow-hidden flex-1 backdrop-blur-xs"
              >
                <div
                  className="h-full bg-[#C99065] transition-[width] duration-75 ease-out rounded-full"
                  style={{ width: `${chapterProgresses[idx]}%` }}
                />
              </div>
            ))}
          </div>

          {/* Monograma de Identidade e Botão "Pular Intro" */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 text-white/90">
              <span className="font-serif italic font-bold text-xl sm:text-2xl text-[#E0CEB5] drop-shadow-sm">
                FG
              </span>
              <span className="text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase text-white/75 hidden sm:inline">
                Ateliê Boutique • Porto Alegre
              </span>
            </div>

            <button
              type="button"
              onClick={handleSkip}
              className="bg-black/50 backdrop-blur-md border border-white/20 text-white/90 hover:text-white hover:bg-black/80 px-4 py-1.5 rounded-full text-xs font-sans font-medium tracking-wide transition-all cursor-pointer flex items-center gap-1.5 shadow-lg active:scale-95"
              aria-label="Pular apresentação cinemática e ir para o conteúdo principal"
            >
              <span>Pular Intro</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#E0CEB5]" />
            </button>
          </div>
        </div>

        {/* ===================== 2. CONTEÚDO EDITORIAL DO CAPÍTULO ATIVO ===================== */}
        <div
          style={{
            opacity: heroOpacity,
            transform: `translateY(${textTranslateY}px)`,
            pointerEvents: heroOpacity > 0.05 ? "auto" : "none",
          }}
          className="relative z-30 px-6 sm:px-10 pb-6 sm:pb-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center transition-opacity duration-150"
        >
          {/* Tag de Posicionamento do Capítulo */}
          <span className="text-[10px] sm:text-xs text-[#E0CEB5] tracking-[0.32em] font-mono uppercase mb-2.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {activeChapter.tag}
          </span>

          {/* Título Principal Editorial do Capítulo */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-medium tracking-tight mb-3 leading-[1.12] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] [text-wrap:balance]">
            {activeChapter.title}
          </h1>

          {/* Subtítulo Narrativo */}
          <p className="text-white/85 text-xs sm:text-base font-sans font-light max-w-xl leading-relaxed mb-6 sm:mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] [text-wrap:pretty]">
            {activeChapter.subtitle}
          </p>

          {/* Indicador Interativo de Scroll (Role para Explorar) */}
          <button
            type="button"
            onClick={handleSkip}
            className="pointer-events-auto flex flex-col items-center gap-2 group cursor-pointer transition-transform hover:scale-105 active:scale-95"
            aria-label="Rolar para explorar o espaço da Fernanda Garroni"
          >
            <div className="w-5 h-8 rounded-full border border-white/40 flex items-start justify-center p-1 bg-black/20 backdrop-blur-xs">
              <span className="w-1.5 h-2 rounded-full bg-[#E0CEB5] animate-bounce" />
            </div>

            <span className="text-[10px] tracking-[0.28em] text-white/70 uppercase font-mono flex items-center gap-1 group-hover:text-white transition-colors">
              ROLE PARA EXPLORAR O ESPAÇO
              <ChevronDown className="w-3.5 h-3.5 text-[#E0CEB5]" />
            </span>
          </button>
        </div>

        {/* ===================== 3. NÉVOA INFERIOR DE TRANSIÇÃO SUAVE (Z-20) ===================== */}
        <div
          className="pointer-events-none absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#FAF3F0] via-[#FAF3F0]/40 to-transparent z-20"
          aria-hidden="true"
        />

      </div>
    </div>
  );
}

export default HeroScrollCanvas;
