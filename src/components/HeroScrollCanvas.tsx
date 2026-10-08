"use client";

import React, { useRef, useEffect, useState } from "react";

export function HeroScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Estados do Loader e da Apresentação
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [textOpacity, setTextOpacity] = useState(1);

  // 1. CARREGAMENTO INICIAL CONTROLADO (SEM SPINNERS NATIVOS E SEM FLICKER)
  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += Math.floor(Math.random() * 12) + 8;
      if (p >= 95) {
        p = 95;
        clearInterval(interval);
      }
      setLoadingProgress(p);
    }, 50);

    const finishLoading = () => {
      clearInterval(interval);
      setLoadingProgress(100);

      // Fade-out suave de 500ms e desmontagem definitiva do componente
      setTimeout(() => {
        setIsLoaded(true);
        setTimeout(() => {
          setIsMounted(false);
        }, 500);
      }, 200);
    };

    // Fallback de segurança para redes lentas
    const fallbackTimer = setTimeout(finishLoading, 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // 2. ARQUITETURA DA HERO: CANVAS 2D COM BUFFER SUAVE A 60 FPS
  useEffect(() => {
    // Cria elemento de vídeo oculto em memória para decodificação suave e nativa por hardware
    const video = document.createElement("video");
    video.src = "/midias/intro-fernanda.mp4";
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("playsinline", "true");
    video.autoplay = true;
    video.loop = true;
    video.preload = "auto";
    video.style.display = "none";
    document.body.appendChild(video);
    videoRef.current = video;

    const playVideo = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    };

    playVideo();

    // Gestos de interação de fallback caso a política de autoplay do browser exija
    const handleUserInteraction = () => {
      if (video.paused) {
        playVideo();
      }
    };
    window.addEventListener("touchstart", handleUserInteraction, { once: true, passive: true });
    window.addEventListener("click", handleUserInteraction, { once: true, passive: true });

    // Referência reativa para o progresso de rolagem
    let progressRef = 0;

    const updateScrollMetrics = () => {
      const container = containerRef.current || document.getElementById("hero-scroll-container");
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const maxScroll = container.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.min(Math.max(-rect.top / maxScroll, 0), 1);
      progressRef = progress;

      // Controle estrito de fade-out do texto:
      // - De 0 a 60%: opacity = 1
      // - De 60% a 85%: fade progressivo até 0
      // - Acima de 85%: opacity = 0
      if (progress <= 0.60) {
        setTextOpacity(1);
      } else if (progress <= 0.85) {
        const fade = 1 - (progress - 0.60) / (0.85 - 0.60);
        setTextOpacity(Math.max(0, fade));
      } else {
        setTextOpacity(0);
      }
    };

    window.addEventListener("scroll", updateScrollMetrics, { passive: true });
    window.addEventListener("resize", updateScrollMetrics, { passive: true });
    updateScrollMetrics();

    // Redimensionamento matemático do Canvas com suporte a Retina / High-DPI
    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    };

    window.addEventListener("resize", resizeCanvas, { passive: true });
    resizeCanvas();

    // Loop contínuo a 60 FPS desenhando o vídeo em tempo real no Canvas (drawCover fullscreen)
    const renderLoop = () => {
      const canvas = canvasRef.current;
      const v = videoRef.current;

      if (canvas && v && v.readyState >= 2 && v.videoWidth > 0 && v.videoHeight > 0) {
        const ctx = canvas.getContext("2d", { alpha: false });
        if (ctx) {
          const w = canvas.width;
          const h = canvas.height;
          const imgRatio = v.videoWidth / v.videoHeight;
          const screenRatio = w / h;

          let renderW = w;
          let renderH = h;
          let x = 0;
          let y = 0;

          // Cálculo Cover exato sem faixas pretas
          if (screenRatio > imgRatio) {
            renderH = w / imgRatio;
            y = (h - renderH) / 2;
          } else {
            renderW = h * imgRatio;
            x = (w - renderW) / 2;
          }

          // Leve efeito de escala e paralaxe da cena acoplado ao scroll
          const scale = 1 + progressRef * 0.08;

          ctx.save();
          if (scale !== 1) {
            ctx.translate(w / 2, h / 2);
            ctx.scale(scale, scale);
            ctx.translate(-w / 2, -h / 2);
          }
          ctx.drawImage(v, x, y, renderW, renderH);
          ctx.restore();
        }
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", updateScrollMetrics);
      window.removeEventListener("resize", updateScrollMetrics);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("click", handleUserInteraction);

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }

      if (video && video.parentNode) {
        video.pause();
        video.parentNode.removeChild(video);
      }
    };
  }, []);

  const isHidden = textOpacity <= 0;

  return (
    <>
      {/* 1. LOADER INICIAL COM A LOGO OFICIAL (Z-50) - DESMONTAGEM TOTAL */}
      {isMounted && (
        <div
          className={`fixed inset-0 z-50 bg-[#141210] w-screen h-screen flex flex-col items-center justify-center p-6 text-center select-none transition-opacity duration-500 ${
            isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{ display: !isMounted ? "none" : "flex" }}
          aria-hidden={isLoaded}
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

      {/* 2. HERO SCROLL COM CANVAS 2D E BUFFER SUAVE A 60 FPS */}
      <div
        id="hero-scroll-container"
        ref={containerRef}
        className="relative h-[250vh] sm:h-[300vh] w-full bg-[#141210]"
        aria-label="Apresentação Interativa • Fernanda Garroni"
      >
        <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden flex items-center justify-center select-none">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-[0.94] contrast-[1.03]"
          />

          {/* Máscaras de Contraste e Profundidade */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.45)_0%,transparent_70%)] pointer-events-none z-10" />

          {/* 3. OVERLAY TEXTUAL EDITORIAL COM FADE-OUT SUAVE */}
          <div
            className={`absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 text-center transition-opacity duration-150 ${
              isHidden ? "opacity-0 pointer-events-none hidden invisible" : ""
            }`}
            style={{
              opacity: textOpacity,
              visibility: isHidden ? "hidden" : "visible",
              pointerEvents: isHidden ? "none" : "auto",
              display: isHidden ? "none" : "flex",
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
