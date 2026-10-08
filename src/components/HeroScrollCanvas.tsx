"use client";

import React, { useRef, useEffect, useState } from "react";

export function HeroScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Estados do Loader e da Apresentação
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [textOpacity, setTextOpacity] = useState(1);

  // 1. ELIMINAR O SPINNER AZUL E O REINÍCIO DO LOADER
  useEffect(() => {
    const video = videoRef.current;
    let currentProgress = 0;
    let isFinished = false;

    // Leitura contínua de 0% a 100% sem reiniciar
    const interval = setInterval(() => {
      if (isFinished) return;
      currentProgress += Math.floor(Math.random() * 8) + 6;
      if (currentProgress >= 90) {
        currentProgress = 90;
        clearInterval(interval);
      }
      setLoadingProgress(currentProgress);
    }, 50);

    const finishLoading = () => {
      if (isFinished) return;
      isFinished = true;
      clearInterval(interval);
      setLoadingProgress(100);

      // Fade-out suave (transition-opacity duration-500 opacity-0 pointer-events-none) e desmontagem
      setTimeout(() => {
        setLoaded(true);
        setTimeout(() => {
          setIsUnmounted(true);
        }, 550);
      }, 200);
    };

    if (video) {
      video.pause();
      video.setAttribute("webkit-playsinline", "true");
      video.setAttribute("playsinline", "true");

      if (video.readyState >= 3) {
        finishLoading();
      } else {
        video.addEventListener("canplaythrough", finishLoading, { once: true });
        video.addEventListener("canplay", finishLoading, { once: true });
        video.addEventListener("loadeddata", finishLoading, { once: true });
      }
    }

    // Fallback de segurança para redes com restrições
    const fallbackTimer = setTimeout(() => {
      finishLoading();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimer);
      if (video) {
        video.removeEventListener("canplaythrough", finishLoading);
        video.removeEventListener("canplay", finishLoading);
        video.removeEventListener("loadeddata", finishLoading);
      }
    };
  }, []);

  // 2. CORREÇÃO DA DECODIFICAÇÃO DO VÍDEO (SEM PULOS DE FRAMES)
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current || document.getElementById("hero-scroll-container");
    if (!video) return;

    let isSeeking = false;
    let targetTime = 0;

    const onScroll = () => {
      const activeContainer = container || document.getElementById("hero-scroll-container");
      if (!activeContainer || !video.duration || isNaN(video.duration)) return;

      const rect = activeContainer.getBoundingClientRect();
      const maxScroll = activeContainer.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.min(Math.max(-rect.top / maxScroll, 0), 1);

      targetTime = progress * video.duration;

      if (!isSeeking && Math.abs(video.currentTime - targetTime) > 0.03) {
        isSeeking = true;
        requestAnimationFrame(() => {
          video.currentTime = targetTime;
        });
      }

      // Fade-out rigoroso do texto entre 60% e 80% do scroll
      if (progress > 0.60) {
        const newOpacity = Math.max(0, 1 - (progress - 0.60) * 5);
        setTextOpacity(newOpacity);
      } else {
        setTextOpacity(1);
      }
    };

    const onSeeked = () => {
      isSeeking = false;
      if (Math.abs(video.currentTime - targetTime) > 0.03) {
        isSeeking = true;
        requestAnimationFrame(() => {
          video.currentTime = targetTime;
        });
      }
    };

    video.addEventListener("seeked", onSeeked);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const onLoadedMetadata = () => {
      onScroll();
    };
    video.addEventListener("loadedmetadata", onLoadedMetadata, { once: true });
    if (video.duration) {
      onScroll();
    }

    return () => {
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* 1. LOADER INICIAL COM A LOGO OFICIAL (Z-50) */}
      {!isUnmounted && (
        <div
          className={`fixed inset-0 z-50 bg-[#141210] w-screen h-screen flex flex-col items-center justify-center p-6 text-center select-none transition-opacity duration-500 ${
            loaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          aria-hidden={loaded}
        >
          <div className="flex flex-col items-center max-w-xs w-full">
            {/* Logo Oficial Centralizada */}
            <img
              src="/midias/foto-logo-fernanda.jpg"
              alt="Fernanda Garroni"
              className="w-20 h-20 rounded-full object-cover border border-[#C99065]/50 shadow-md mb-4"
            />
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
      )}

      {/* 2. HERO SCROLL COM VÍDEO OFICIAL */}
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
            muted
            playsInline
            {...({ "webkit-playsinline": "true" } as any)}
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none filter brightness-[0.92] contrast-[1.03]"
          />

          {/* Máscaras de Contraste e Profundidade */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.45)_0%,transparent_70%)] pointer-events-none z-10" />

          {/* 3. REMOÇÃO COMPLETA DA CAIXA DE TEXTO NO FIM DO SCROLL */}
          <div
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 text-center transition-opacity duration-150"
            style={{
              opacity: textOpacity,
              visibility: textOpacity <= 0 ? "hidden" : "visible",
              pointerEvents: textOpacity <= 0 ? "none" : "auto",
            }}
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
