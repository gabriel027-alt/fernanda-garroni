"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

export function HeroScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafIdRef = useRef<number | null>(null);

  // Estados do Loader e da Apresentação
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [textOpacity, setTextOpacity] = useState(1);

  // Sincronização do vídeo no scroll via requestAnimationFrame
  const syncVideoWithScroll = useCallback(() => {
    const video = videoRef.current;
    const container = containerRef.current || document.getElementById("hero-scroll-container");
    if (!video || !container) return;

    const containerRect = container.getBoundingClientRect();
    const totalScrollableDistance = container.offsetHeight - window.innerHeight;
    if (totalScrollableDistance <= 0) return;

    const progress = Math.min(Math.max(-containerRect.top / totalScrollableDistance, 0), 1);

    if (video.duration && !isNaN(video.duration) && isFinite(video.duration)) {
      video.currentTime = progress * video.duration;
    }

    // Fade-out suave do texto no final do scroll
    if (progress > 0.7) {
      setTextOpacity(Math.max(0, 1 - (progress - 0.7) * 3.5));
    } else {
      setTextOpacity(1);
    }
  }, []);

  // Gerenciamento de carregamento do vídeo e pré-loader
  useEffect(() => {
    const video = videoRef.current;
    let progress = 20;
    setLoadingProgress(progress);

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 12;
      if (progress >= 95) {
        progress = 95;
        clearInterval(interval);
      }
      setLoadingProgress(progress);
    }, 100);

    const handleReady = () => {
      clearInterval(interval);
      setLoadingProgress(100);
      setTimeout(() => {
        setLoaded(true);
      }, 300);
    };

    if (video) {
      video.pause();
      if (video.readyState >= 2) {
        handleReady();
      } else {
        video.addEventListener("loadeddata", handleReady, { once: true });
        video.addEventListener("canplay", handleReady, { once: true });
      }
    }

    // Fallback de segurança para redes com restrições
    const safetyTimer = setTimeout(() => {
      handleReady();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimer);
      if (video) {
        video.removeEventListener("loadeddata", handleReady);
        video.removeEventListener("canplay", handleReady);
      }
    };
  }, []);

  // Listener de Scroll acoplado ao requestAnimationFrame
  useEffect(() => {
    const handleScroll = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(() => {
        syncVideoWithScroll();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [syncVideoWithScroll]);

  return (
    <>
      {/* 2. LOADER INICIAL COM A LOGO OFICIAL (Z-50) */}
      <div
        className={`fixed inset-0 z-50 bg-[#141210] flex flex-col items-center justify-center p-6 text-center select-none transition-opacity duration-700 ${
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-hidden={loaded}
      >
        <div className="flex flex-col items-center max-w-xs w-full">
          {/* Avatar circular com a imagem oficial */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-[#C99065]/50 shadow-md bg-[#141210] mb-5 flex items-center justify-center shrink-0">
            <img
              src="/midias/foto-logo-fernanda.jpg"
              alt="Logo Fernanda Garroni"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-serif italic text-2xl text-[#FAF3F0] mb-4 tracking-wider">
            Fernanda Garroni • Ateliê Boutique
          </span>
          <div className="w-48 h-[2px] bg-white/10 overflow-hidden rounded-full mb-3">
            <div
              className="h-full bg-[#C99065] transition-all duration-150 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <div className="flex items-center justify-between w-48 text-xs font-mono tracking-widest text-[#E0CEB5]/70">
            <span>CARREGANDO</span>
            <span className="text-[#FAF3F0] font-semibold">
              {String(loadingProgress).padStart(3, "0")}%
            </span>
          </div>
        </div>
      </div>

      {/* 1. HERO SCROLL COM VÍDEO OFICIAL */}
      <div
        id="hero-scroll-container"
        ref={containerRef}
        className="relative h-[350vh] w-full bg-[#141210]"
        aria-label="Apresentação Interativa • Fernanda Garroni"
      >
        <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden flex items-center justify-center select-none">
          <video
            ref={videoRef}
            src="/midias/intro-fernanda.mp4"
            playsInline
            muted
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-[0.96] contrast-[1.02]"
          />

          {/* Máscaras de Contraste e Profundidade */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.45)_0%,transparent_70%)] pointer-events-none z-10" />

          {/* Conteúdo Editorial Central Fixo (z-20) com Fade no final */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 pointer-events-none text-center transition-opacity duration-300"
            style={{ opacity: textOpacity }}
          >
            <div className="w-full max-w-xl sm:max-w-3xl md:max-w-4xl mx-auto px-5 sm:px-6 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 mb-4 sm:mb-5 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-lg pointer-events-auto">
                <span className="text-[#C99065]">✨</span>
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.35em] uppercase text-white/90">
                  ARQUITETURA FACIAL & ILUMINAÇÃO AUTORAL
                </span>
              </div>

              <h1 className="font-light tracking-tighter text-3xl sm:text-5xl md:text-6xl text-white/95 text-center leading-[1.15] [text-wrap:balance] drop-shadow-[0_4px_16px_rgba(0,0,0,0.70)]">
                Sua melhor versão com{" "}
                <span className="font-serif italic font-normal text-[#E0CEB5] drop-shadow-[0_2px_12px_rgba(201,144,101,0.45)]">
                  Morenas Iluminadas
                </span>{" "}
                e corte visagista sob medida.
              </h1>

              <p className="font-mono text-[11px] sm:text-xs md:text-sm tracking-[0.2em] uppercase text-white/80 mt-4 sm:mt-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.70)]">
                FERNANDA GARRONI — ATELIÊ BOUTIQUE • PORTO ALEGRE (AV. NONOAI, 151)
              </p>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center w-full sm:w-auto gap-3 pointer-events-auto">
                <a
                  href="#triagem-inteligente"
                  className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 bg-[#C99065] hover:bg-[#b57f56] text-[#141210] font-sans font-bold text-xs sm:text-sm tracking-wider uppercase rounded-full shadow-2xl transition-all cursor-pointer inline-flex items-center justify-center gap-2 active:scale-95 text-center"
                >
                  <span>Agendar Avaliação VIP</span>
                  <span>→</span>
                </a>
                <a
                  href="#procedimentos"
                  className="w-full sm:w-auto min-h-[48px] px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/25 font-sans font-semibold text-xs tracking-wider uppercase rounded-full transition-all cursor-pointer active:scale-95 text-center flex items-center justify-center"
                >
                  <span>Explorar Procedimentos</span>
                </a>
              </div>

              {/* Indicador de Swipe */}
              <div className="mt-8 sm:mt-12 flex flex-col items-center justify-center gap-3 pointer-events-auto select-none">
                <div className="relative w-10 h-11 sm:h-12 flex items-center justify-center">
                  <div className="absolute w-[1.5px] h-7 rounded-full bg-gradient-to-t from-transparent via-[#C99065]/35 to-transparent pointer-events-none" />
                  <div className="text-[#E0CEB5] animate-bounce">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6 sm:w-7 sm:h-7 rotate-[-6deg]"
                    >
                      <path d="M22 14a8 8 0 0 1-8 8" />
                      <path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
                      <path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1" />
                      <path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10" />
                      <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                    </svg>
                  </div>
                </div>
                <span className="font-sans font-bold text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#E0CEB5]">
                  DESLIZE PARA BAIXO PARA EXPLORAR
                </span>
              </div>
            </div>
          </div>

          {/* Máscara de fusão com a próxima seção */}
          <div className="pointer-events-none absolute bottom-0 inset-x-0 h-40 sm:h-56 bg-gradient-to-t from-[#FAF3F0] via-[#FAF3F0]/40 to-transparent z-20" />
        </div>
      </div>
    </>
  );
}

export default HeroScrollCanvas;
