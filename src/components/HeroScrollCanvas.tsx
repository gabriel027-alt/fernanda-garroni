"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

const FRAMES = [
  "/midias/frame1-fernanda.jpg",
  "/midias/frame2-fernanda.jpg",
  "/midias/frame3-fernanda.jpg",
  "/midias/frame4-fernanda.jpg",
  "/midias/frame5-fernanda.jpg",
];

export function HeroScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafIdRef = useRef<number | null>(null);

  // Estados do Loader e da Apresentação
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [textOpacity, setTextOpacity] = useState(1);

  // Função para desenhar a imagem no Canvas garantindo proporção matemática cover real sem faixas pretas
  const drawCover = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      img: HTMLImageElement | undefined,
      w: number,
      h: number,
      alpha = 1
    ) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const screenRatio = w / h;
      let renderW = w;
      let renderH = h;
      let x = 0;
      let y = 0;

      if (screenRatio > imgRatio) {
        renderH = w / imgRatio;
        y = (h - renderH) / 2;
      } else {
        renderW = h * imgRatio;
        x = (w - renderW) / 2;
      }

      ctx.drawImage(img, x, y, renderW, renderH);
      ctx.restore();
    },
    []
  );

  // Renderização contínua no Canvas a 60fps interpolando os frames pelo scroll
  const render = useCallback(() => {
    const container = containerRef.current || document.getElementById("hero-scroll-container");
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const maxScroll = container.offsetHeight - window.innerHeight;
    const currentScroll = Math.max(0, -rect.top);
    const progress = maxScroll > 0 ? Math.min(Math.max(currentScroll / maxScroll, 0), 1) : 0;

    const w = canvas.width;
    const h = canvas.height;

    // Fundo base ébano profundo
    ctx.fillStyle = "#141210";
    ctx.fillRect(0, 0, w, h);

    // Interpolação suave de frames
    const frameIndex = progress * (FRAMES.length - 1);
    const currentIdx = Math.floor(frameIndex);
    const nextIdx = Math.min(currentIdx + 1, FRAMES.length - 1);
    const blend = frameIndex - currentIdx;

    const images = imagesRef.current;
    if (images[currentIdx]) {
      drawCover(ctx, images[currentIdx], w, h, 1);
    }
    if (blend > 0 && images[nextIdx]) {
      drawCover(ctx, images[nextIdx], w, h, blend);
    }

    // Fade-out do texto no final do scroll
    if (progress > 0.7) {
      setTextOpacity(Math.max(0, 1 - (progress - 0.7) * 3.5));
    } else {
      setTextOpacity(1);
    }
  }, [drawCover]);

  // Redimensionamento estrito com suporte a Retina / High-DPI
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    render();
  }, [render]);

  // Pré-carregamento dos 5 frames autorais com tela cheia de loading
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(FRAMES.length);

    FRAMES.forEach((src, i) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        loadedCount += 1;
        const percent = Math.round((loadedCount / FRAMES.length) * 100);
        setLoadingProgress(percent);

        // Se for o primeiro frame, renderiza imediatamente para evitar flash
        if (i === 0) {
          resizeCanvas();
        }

        if (loadedCount === FRAMES.length) {
          resizeCanvas();
          setTimeout(() => {
            setLoaded(true);
          }, 300);
        }
      };

      img.onerror = () => {
        loadedCount += 1;
        const percent = Math.round((loadedCount / FRAMES.length) * 100);
        setLoadingProgress(percent);
        if (loadedCount === FRAMES.length) {
          resizeCanvas();
          setTimeout(() => {
            setLoaded(true);
          }, 300);
        }
      };

      images[i] = img;
    });

    imagesRef.current = images;

    window.addEventListener("resize", resizeCanvas, { passive: true });
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [resizeCanvas]);

  // Listener de Scroll acoplado ao RequestAnimationFrame a 60fps
  useEffect(() => {
    const handleScroll = () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(() => {
        render();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [render]);

  return (
    <>
      {/* 2. LOADER INICIAL IDÊNTICO AO DA DAYANE (Z-50) */}
      <div
        className={`fixed inset-0 z-50 bg-[#141210] flex flex-col items-center justify-center p-6 text-center select-none transition-opacity duration-700 ${
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-hidden={loaded}
      >
        <div className="flex flex-col items-center max-w-xs w-full">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-[#C99065]/50 shadow-md bg-[#1C1917] mb-5 flex items-center justify-center shrink-0">
            <span className="font-serif italic font-bold text-2xl text-[#E0CEB5]">FG</span>
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-[#C99065]/20 pointer-events-none" />
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

      {/* 3. IMPLEMENTAÇÃO DO HERO SCROLL COM CANVAS (ESTRUTURA DAYANE) */}
      <div
        id="hero-scroll-container"
        ref={containerRef}
        className="relative h-[350vh] w-full bg-[#141210]"
        aria-label="Apresentação Interativa • Fernanda Garroni"
      >
        <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden flex items-center justify-center select-none">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-[0.96] contrast-[1.02] transform-gpu"
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
