"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import LocationAndFooter from "@/components/LocationAndFooter";
import StickyConversionBar from "@/components/StickyConversionBar";
import WhatsAppTriageDrawer, { ServiceCategory } from "@/components/WhatsAppTriageDrawer";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import HeroScrollCanvas from "@/components/HeroScrollCanvas";
import { 
  Sparkles, 
  Waves, 
  HeartPulse, 
  Scissors, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  MessageCircle, 
  Eye, 
  Check,
  Maximize2
} from "lucide-react";

const WHATSAPP_PHONE = "5551999999999";

const getWhatsAppUrl = (message?: string) => {
  const defaultText = "Olá, Fernanda! Gostaria de agendar uma avaliação para Morena Iluminada / Cabelos com Curvaturas na Av. Nonoai, nº 151 (Porto Alegre).";
  const text = encodeURIComponent(message || defaultText);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
};

export default function HomePage() {
  const [isTriageOpen, setIsTriageOpen] = useState(false);
  const [initialService, setInitialService] = useState<ServiceCategory | null>(null);

  // Controle dos players de vídeo com som
  const [isMutedMocha, setIsMutedMocha] = useState(true);
  const [isMutedLavatorio, setIsMutedLavatorio] = useState(true);

  // Otimização de reprodução via IntersectionObserver: só reproduz vídeos quando estiverem na viewport
  useEffect(() => {
    const lazyVideos = document.querySelectorAll<HTMLVideoElement>("video[data-lazy-video]");
    
    if ("IntersectionObserver" in window) {
      const videoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target as HTMLVideoElement;
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.25 }
      );

      lazyVideos.forEach((v) => videoObserver.observe(v));
      return () => videoObserver.disconnect();
    }
  }, []);

  // Abertura geral da triagem no WhatsApp
  const handleOpenGeneralTriage = () => {
    setInitialService(null);
    setIsTriageOpen(true);
  };

  // Abertura contextual por serviço
  const handleSelectService = (serviceId: ServiceCategory) => {
    setInitialService(serviceId);
    setIsTriageOpen(true);
  };

  const handleDirectWhatsApp = (text?: string) => {
    window.open(getWhatsAppUrl(text), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#FAF3F0] text-[#1C1917] font-sans selection:bg-[#C5A880]/30 selection:text-[#1C1917]">
      
      {/* ===================== APRESENTAÇÃO INTERATIVA OFICIAL (CANVAS 350vh COM PRELOADER) ===================== */}
      <HeroScrollCanvas />

      {/* ===================== CABEÇALHO CONDENSADO COM MONOGRAMA FG (STICKY) ===================== */}
      <Header onOpenTriage={handleOpenGeneralTriage} />

      <main id="conteudo-principal">
        
        {/* ===================== 1. HERO SECTION: BRANDING & IDENTIDADE ===================== */}
        <section 
          className="relative z-10 pt-10 sm:pt-16 pb-16 sm:pb-24 overflow-hidden border-b border-[#E8D0C8]"
          aria-labelledby="hero-title"
        >
          {/* Luz ambiente de fundo sutil */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#C5A880]/15 blur-[120px] rounded-full pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Coluna de Texto & Posicionamento Editorial */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Badge Oficial de Posicionamento */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E8D0C8] shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#8F6E32] animate-pulse" />
                  <span className="text-xs sm:text-sm font-sans font-bold tracking-[0.16em] uppercase text-[#6E501E]">
                    Fernanda Garroni • Cabeleireira & Visagista
                  </span>
                </div>

                {/* Headline Principal de Alta Autoridade */}
                <h1 
                  id="hero-title"
                  className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1C1917] tracking-tight leading-[1.12] [text-wrap:balance]"
                >
                  Especialista em{" "}
                  <span className="italic font-normal font-serif text-[#944234] block sm:inline">
                    Morenas Iluminadas
                  </span>{" "}
                  & Cabelos com Curvaturas.
                </h1>

                {/* Proposta de Valor e Posicionamento em Porto Alegre */}
                <p className="text-base sm:text-lg text-[#44403C] leading-relaxed max-w-2xl font-sans [text-wrap:pretty]">
                  Técnicas autorais de iluminação personalizadas para a sua arquitetura facial e respeito absoluto à saúde da fibra. Do liso alinhado aos cachos e ondas com definição tridimensional.
                </p>

                {/* Selos de Confiança e Localização */}
                <div className="pt-1 flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-[#44403C]">
                  <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-xl border border-[#E8D0C8]">
                    <MapPin className="w-4 h-4 text-[#8F6E32] shrink-0" />
                    <span className="font-medium text-[#1C1917]">Av. Nonoai, nº 151, Sala 205</span>
                    <span className="text-[#8F6E32] font-semibold">• Porto Alegre / RS</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-xl border border-[#E8D0C8]">
                    <span className="text-amber-500 font-bold">★★★★★</span>
                    <span className="font-semibold text-[#1C1917]">5.0</span>
                    <span className="text-[#6E501E]">Atendimento Individual</span>
                  </div>
                </div>

                {/* Botões de Ação Imediata (CTAs) */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => handleDirectWhatsApp("Olá Fernanda! Gostaria de agendar uma avaliação para Morena Iluminada / Cabelos com Curvaturas na Av. Nonoai, nº 151.")}
                    className="min-h-[50px] px-8 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32]"
                    aria-label="Agendar avaliação de Morena Iluminada no WhatsApp"
                  >
                    <Calendar className="w-4 h-4 text-[#E6C99B]" />
                    <span>Agendar Avaliação no WhatsApp</span>
                    <ArrowRight className="w-4 h-4 text-[#E6C99B]" />
                  </button>

                  <a
                    href="#triade"
                    className="min-h-[50px] px-6 py-3.5 rounded-full bg-white hover:bg-neutral-50 text-[#1C1917] border border-[#E8D0C8] hover:border-[#8F6E32] font-sans font-semibold text-sm tracking-wide shadow-xs transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8F6E32]"
                  >
                    <span>Conhecer a Tríade</span>
                    <span className="text-[#8F6E32]">↓</span>
                  </a>
                </div>

                {/* 3 Garantias Técnicas da Fernanda */}
                <div className="pt-4 border-t border-[#E8D0C8] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans text-[#44403C]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8F6E32] shrink-0" />
                    <span>Teste de mecha obrigatório</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8F6E32] shrink-0" />
                    <span>Preservação de curvatura</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#8F6E32] shrink-0" />
                    <span>Consultoria visagista</span>
                  </div>
                </div>

              </div>

              {/* Coluna Visual: Imagem Editorial de Autoridade da Especialista Fernanda Garroni */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-[#C5A880]/40 bg-[#1C1917] group">
                  
                  {/* Fotografia Editorial de Alta Resolução da Especialista */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900">
                    <img
                      src="/midias/frame1-fernanda.jpg"
                      alt="Fernanda Garroni — Cabeleireira & Visagista em Porto Alegre"
                      loading="eager"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    />

                    {/* Gradiente Inferior para legibilidade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                    {/* Selo no Topo */}
                    <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-[#C5A880]/40 text-[10px] font-sans font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-lg">
                      <Sparkles className="w-3 h-3 text-[#E6C99B]" />
                      <span>VISAGISTA TITULAR • SALA 205</span>
                    </div>

                    {/* Badge de Qualidade */}
                    <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-[#1C1917]/80 backdrop-blur-md border border-[#C5A880]/40 text-[#E6C99B] text-[10px] font-sans font-bold uppercase tracking-wider">
                      Porto Alegre
                    </div>

                    {/* Rodapé com Informações da Especialista e CTA */}
                    <div className="absolute bottom-5 left-5 right-5 z-20 space-y-2 text-white">
                      <span className="text-[11px] font-sans font-bold tracking-wider uppercase text-[#E6C99B] block">
                        Visagismo & Terapia Capilar
                      </span>
                      <h3 className="font-serif font-bold text-2xl leading-tight">
                        Fernanda Garroni
                      </h3>
                      <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                        Especialista em Morenas Iluminadas &amp; Cabelos com Curvaturas. Diagnóstico visagista personalizado e teste de mecha prévio na Av. Nonoai, 151.
                      </p>

                      <a
                        href="#triade"
                        className="w-full mt-3 py-3 px-4 rounded-xl bg-white hover:bg-[#FAF3F0] text-[#1C1917] font-sans font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
                      >
                        <span>Conhecer Metodologia de Atendimento</span>
                        <ArrowRight className="w-4 h-4 text-[#8F6E32]" />
                      </a>
                    </div>

                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ===================== 2. CARRO-CHEFE: TRÍADE DE MORENAS ILUMINADAS (ANTES & DEPOIS) ===================== */}
        <section 
          id="triade"
          aria-labelledby="triade-heading"
          className="py-20 sm:py-28 bg-[#FAF3F0] border-b border-[#E8D0C8] scroll-mt-20 sm:scroll-mt-24 relative"
        >
          {/* Âncoras compatíveis com navegação */}
          <div id="procedimentos" className="absolute -top-24 pointer-events-none" />
          <div id="triagem-inteligente" className="absolute -top-24 pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            
            {/* Cabeçalho da Seção */}
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-14 sm:mb-18">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8D0C8] text-xs font-bold uppercase tracking-[0.2em] text-[#6E501E]">
                <Sparkles className="w-3.5 h-3.5 text-[#8F6E32]" />
                <span>Carro-Chefe do Espaço</span>
              </div>
              <h2 
                id="triade-heading"
                className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] tracking-tight leading-tight [text-wrap:balance]"
              >
                A Tríade de Morenas Iluminadas
              </h2>
              <p className="text-base sm:text-lg text-[#44403C] font-sans leading-relaxed [text-wrap:pretty]">
                Conheça os três pilares de luminosidade autoral desenvolvidos por Fernanda Garroni. Arraste os controles abaixo para comparar o resultado real de Antes e Depois de cada técnica.
              </p>
            </div>

            {/* Grid Interativo com a Tríade: 3 Cards com Sliders de Antes e Depois */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
              
              {/* 1. Marrom Marcante / Acobreado */}
              <div className="flex flex-col">
                <BeforeAfterSlider
                  beforeSrc="/midias/foto-fernanda-morena-iluminada-marrom-acobreado-antes.jpg"
                  afterSrc="/midias/foto-fernanda-morena-iluminada-marrom-acobreado-depois.jpg"
                  beforeAlt="Cabelo castanho escuro antes da iluminação marrom marcante"
                  afterAlt="Cabelo finalizado com Morena Iluminada Marrom Marcante e reflexos acobreados"
                  title="Marrom Marcante & Acobreado"
                  subtitle="Tons quentes de avelã e canela com profundidade elegante. Perfeito para bases escuras sem perder a naturalidade."
                  tag="Tom Quente Sofisticado"
                  aspectRatio="aspect-[4/5]"
                />
                <div className="mt-4 p-4 rounded-xl bg-white border border-[#E8D0C8] flex flex-col justify-between flex-1 space-y-3">
                  <div className="space-y-1 text-xs text-[#44403C]">
                    <div className="flex items-center gap-1.5 font-semibold text-[#1C1917]">
                      <Check className="w-3.5 h-3.5 text-[#8F6E32]" />
                      <span>Harmonia para contraste médio e alto</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#8F6E32]" />
                      <span>Preserva a profundidade da raiz natural</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDirectWhatsApp("Olá Fernanda! Gostaria de agendar avaliação para a Morena Iluminada Marrom Marcante / Acobreada.")}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FAF3F0] hover:bg-[#1C1917] hover:text-white text-[#1C1917] border border-[#E8D0C8] font-sans font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Avaliar Meu Cabelo Neste Tom</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 2. Dourado Solar no Fio Liso (Centro da Tríade em Destaque) */}
              <div className="flex flex-col relative md:-translate-y-2">
                <div className="mb-2 text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#1C1917] text-[#E6C99B] text-[10px] font-sans font-bold uppercase tracking-widest shadow-xs">
                    ★ Centro da Tríade • Fio Liso
                  </span>
                </div>
                <BeforeAfterSlider
                  beforeSrc="/midias/foto-fernanda-morena-iluminada-dourada-liso-antes.jpg"
                  afterSrc="/midias/foto-fernanda-morena-iluminada-dourada-liso-depois.jpg"
                  beforeAlt="Fio liso antes da iluminação dourada"
                  afterAlt="Fio liso depois com Morena Iluminada Dourado Solar e alinhamento impecável"
                  title="Dourado Solar no Fio Liso"
                  subtitle="Pontos de luz dourada que refletem o sol sem criar marcas de divisão. Alinhamento disciplinado e brilho espelhado."
                  tag="Luminosidade Solar"
                  aspectRatio="aspect-[4/5]"
                  className="ring-2 ring-[#C5A880]/60 shadow-lg"
                />
                <div className="mt-4 p-4 rounded-xl bg-white border-2 border-[#C5A880]/40 flex flex-col justify-between flex-1 space-y-3">
                  <div className="space-y-1 text-xs text-[#44403C]">
                    <div className="flex items-center gap-1.5 font-semibold text-[#1C1917]">
                      <Check className="w-3.5 h-3.5 text-[#8F6E32]" />
                      <span>Transição imperceptível em fios lisos</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#8F6E32]" />
                      <span>Reflexos multidimensionais de brilho solar</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDirectWhatsApp("Olá Fernanda! Gostaria de agendar avaliação para a Morena Iluminada Dourado Solar no fio liso.")}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Avaliar Meu Fio Liso</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E6C99B]" />
                  </button>
                </div>
              </div>

              {/* 3. Cachos Mel / Caramelo (Curvaturas) */}
              <div className="flex flex-col">
                <BeforeAfterSlider
                  beforeSrc="/midias/foto-fernanda-morena-iluminada-caramelo-costas-antes.jpg"
                  afterSrc="/midias/foto-fernanda-morena-iluminada-caramelo-costas-depois.jpg"
                  beforeAlt="Cabelo cacheado e volumoso antes da iluminação"
                  afterAlt="Cabelo cacheado com Morena Iluminada Cachos Mel Caramelo e definição intacta"
                  title="Cachos Mel & Caramelo"
                  subtitle="Mechas esculpidas no padrão natural da curvatura. Cria relevo e movimento nos cachos preservando a elasticidade da mola."
                  tag="Curvatura & Definição"
                  aspectRatio="aspect-[4/5]"
                />
                <div className="mt-4 p-4 rounded-xl bg-white border border-[#E8D0C8] flex flex-col justify-between flex-1 space-y-3">
                  <div className="space-y-1 text-xs text-[#44403C]">
                    <div className="flex items-center gap-1.5 font-semibold text-[#1C1917]">
                      <Check className="w-3.5 h-3.5 text-[#8F6E32]" />
                      <span>100% de respeito à curvatura e hidratação</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#8F6E32]" />
                      <span>Efeito tridimensional mecha a mecha no cacho</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDirectWhatsApp("Olá Fernanda! Meu cabelo é cacheado/ondulado e gostaria de agendar uma avaliação para Cachos Mel & Caramelo.")}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FAF3F0] hover:bg-[#1C1917] hover:text-white text-[#1C1917] border border-[#E8D0C8] font-sans font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Avaliar Meus Cachos</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Banner Complementar da Tríade */}
            <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-[#E8D0C8] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FAF3F0] border border-[#C5A880]/50 flex items-center justify-center text-[#8F6E32] shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C1917]">
                    Não tem certeza de qual tom da Tríade combina com você?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#44403C] font-sans mt-0.5">
                    No atendimento na Av. Nonoai, realizamos a consultoria visagista e o teste de mecha prévio para escolher a nuance ideal para o seu tom de pele e saúde capilar.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSelectService("morenailuminada")}
                className="shrink-0 min-h-[46px] px-6 py-3 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-xs sm:text-sm tracking-wide shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#E6C99B]" />
                <span>Agendar Avaliação Visagista</span>
              </button>
            </div>

          </div>
        </section>

        {/* ===================== 3. TRANSFORMAÇÃO EM VÍDEO: O EFEITO MOÇA MOUSSE (PLAYER EXCLUSIVO) ===================== */}
        <section 
          id="video-transformacao"
          aria-labelledby="video-section-heading"
          className="py-20 sm:py-28 bg-[#1C1917] text-white border-b border-neutral-800 overflow-hidden relative"
        >
          {/* Efeito sutil de brilho no fundo escuro */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#C5A880]/10 blur-[130px] rounded-full pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Coluna Editorial Explicativa da Técnica Moça Mousse */}
              <div className="lg:col-span-6 space-y-6">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-[#E6C99B] text-xs font-bold uppercase tracking-widest">
                  <Play className="w-3.5 h-3.5 fill-current text-[#E6C99B]" />
                  <span>Transformação em Vídeo Real</span>
                </div>

                <h2 
                  id="video-section-heading"
                  className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] [text-wrap:balance]"
                >
                  O Efeito Moça Mousse:{" "}
                  <span className="italic font-normal font-serif text-[#E6C99B]">
                    Luminosidade com Toque Aveludado.
                  </span>
                </h2>

                <p className="text-neutral-300 text-base sm:text-lg font-sans leading-relaxed [text-wrap:pretty]">
                  Assista à fluidez e ao caimento real da transformação. A técnica autoral Moça Mousse combina nuances aveludadas de avelã e caramelo com transição suave na raiz, garantindo um crescimento limpo sem necessidade de retoques frequentes.
                </p>

                {/* 3 Diferenciais Práticos do Método */}
                <div className="space-y-3 pt-2 text-sm font-sans">
                  <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#E6C99B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-semibold">Zero Demarcação:</strong>
                      <span className="text-neutral-300 text-xs">Esfumado preciso que se integra perfeitamente à base escura original.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#E6C99B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-semibold">Fibra Capilar Selada:</strong>
                      <span className="text-neutral-300 text-xs">Clareamento consciente sem abrir mão da maleabilidade e da hidratação.</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#E6C99B] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block font-semibold">Praticidade no Dia a Dia:</strong>
                      <span className="text-neutral-300 text-xs">Manutenção sem escravidão de retoques mensais.</span>
                    </div>
                  </div>
                </div>

                {/* CTA Direto */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleDirectWhatsApp("Olá Fernanda! Assisti ao vídeo do Moça Mousse e quero agendar uma avaliação para essa técnica autoral.")}
                    className="min-h-[48px] px-8 py-3.5 rounded-full bg-[#E6C99B] hover:bg-white text-[#1C1917] font-sans font-bold text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 text-[#1C1917]" />
                    <span>Quero Agendar a Técnica Moça Mousse</span>
                  </button>
                </div>

              </div>

              {/* Coluna do Player do Vídeo Moça Mousse (Exclusivo) */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-[#C5A880]/50 bg-neutral-950 group">
                  
                  <div className="relative aspect-[9/14] w-full overflow-hidden">
                    <video
                      id="mocha-mousse-player"
                      data-lazy-video
                      src="/midias/video-fernanda-transformacao-morena-iluminada-moca-mousse.mp4"
                      loop
                      muted={isMutedMocha}
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Controles Flutuantes do Player */}
                    <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsMutedMocha(!isMutedMocha)}
                        className="w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
                        aria-label={isMutedMocha ? "Ativar som" : "Desativar som"}
                      >
                        {isMutedMocha ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#E6C99B]" />}
                      </button>
                    </div>

                    {/* Badge de Destaque no Rodapé */}
                    <div className="absolute bottom-4 left-4 right-4 z-20 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-xs">
                      <div className="flex items-center justify-between text-[#E6C99B] font-bold text-[11px] uppercase tracking-wider mb-1">
                        <span>Vídeo Oficial do Espaço</span>
                        <span>Porto Alegre / RS</span>
                      </div>
                      <p className="text-white font-medium">
                        Transformação real gravada sem filtros excessivos para exibir a fidelidade da cor e o brilho autêntico.
                      </p>
                    </div>

                  </div>

                </div>
              </div>

            </div>

            {/* Vídeos Adicionais de Resultado em Grid Condensado (Preload="none" otimizado) */}
            <div className="mt-16 pt-12 border-t border-neutral-800">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E6C99B] font-sans">
                    Mais Registros de Movimento
                  </span>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                    Resultados & Retoques em Movimento
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {/* Vídeo 2: Retoque de Cor */}
                <div className="rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 p-4 space-y-3">
                  <div className="relative aspect-[9/12] rounded-xl overflow-hidden bg-black">
                    <video
                      data-lazy-video
                      src="/midias/video-fernanda-morena-iluminada-antes-e-depois-retoque-de-cor2.mp4"
                      loop
                      muted
                      playsInline
                      preload="none"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-[10px] font-bold text-white uppercase tracking-wider">
                      Antes & Depois Retoque
                    </div>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-white">Retoque de Cor & Preservação</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">Revitalização da nuance e selagem das pontas com brilho radiante.</p>
                  </div>
                </div>

                {/* Vídeo 3: Movimento & Balanço Finalizado */}
                <div className="rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 p-4 space-y-3">
                  <div className="relative aspect-[9/12] rounded-xl overflow-hidden bg-black">
                    <video
                      data-lazy-video
                      src="/midias/video-fernanda-morena-iluminada-depois1.mp4"
                      loop
                      muted
                      playsInline
                      preload="none"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-[10px] font-bold text-white uppercase tracking-wider">
                      Caimento Finalizado
                    </div>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-white">Balanço Natural dos Fios</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">Corte e iluminação fluida em harmonia com a luz do ambiente.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ===================== 4. CORTES FEMININOS & ESPECIALIZAÇÃO EM CURVATURAS ===================== */}
        <section 
          id="curvaturas"
          aria-labelledby="curvaturas-heading"
          className="py-20 sm:py-28 bg-[#FAF3F0] border-b border-[#E8D0C8] scroll-mt-20 sm:scroll-mt-24"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Coluna Visual: Acervo de Cabelos com Curvaturas da Fernanda */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden border border-[#E8D0C8] shadow-xs group bg-white">
                      <img
                        src="/midias/foto-fernanda-morena-iluminada-ondas-mel-frente.jpg"
                        alt="Cabelo ondulado com mechas mel e corte em camadas feito por Fernanda Garroni"
                        loading="lazy"
                        decoding="async"
                        className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="p-3 text-center">
                        <span className="text-[11px] font-bold text-[#1C1917] block">Ondas Mel Frontal</span>
                        <span className="text-[10px] text-[#6E501E]">Definição & Camadas</span>
                      </div>
                    </div>

                    <div className="rounded-2xl overflow-hidden border border-[#E8D0C8] shadow-xs group bg-white">
                      <img
                        src="/midias/foto-fernanda-morena-iluminada-perfil-suave-finalizado.jpg"
                        alt="Perfil suave e corte em curvaturas por Fernanda Garroni"
                        loading="lazy"
                        decoding="async"
                        className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="p-3 text-center">
                        <span className="text-[11px] font-bold text-[#1C1917] block">Visagismo de Perfil</span>
                        <span className="text-[10px] text-[#6E501E]">Harmonização Facial</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6">
                    <div className="rounded-2xl overflow-hidden border border-[#E8D0C8] shadow-xs group bg-white">
                      <img
                        src="/midias/foto-fernanda-morena-iluminada-ondas-avela-costas-finalizado.jpg"
                        alt="Corte e ondas avelã costas finalizado por Fernanda Garroni"
                        loading="lazy"
                        decoding="async"
                        className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="p-3 text-center">
                        <span className="text-[11px] font-bold text-[#1C1917] block">Ondas Avelã Costas</span>
                        <span className="text-[10px] text-[#6E501E]">Movimento Tridimensional</span>
                      </div>
                    </div>

                    <div className="rounded-2xl overflow-hidden border border-[#E8D0C8] shadow-xs group bg-white">
                      <img
                        src="/midias/foto-fernanda-morena-iluminada-contour-avela-frente-finalizado.jpg"
                        alt="Contour avelã e corte visagista frontal por Fernanda Garroni"
                        loading="lazy"
                        decoding="async"
                        className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="p-3 text-center">
                        <span className="text-[11px] font-bold text-[#1C1917] block">Contour Avelã Frente</span>
                        <span className="text-[10px] text-[#6E501E]">Moldura do Rosto</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coluna Textual: Filosofia de Corte & Curvaturas */}
              <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8D0C8] text-[#6E501E] text-xs font-bold uppercase tracking-widest shadow-xs">
                  <Waves className="w-3.5 h-3.5 text-[#8F6E32]" />
                  <span>Cortes Femininos & Curvaturas</span>
                </div>

                <h2 
                  id="curvaturas-heading"
                  className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1917] tracking-tight leading-[1.14] [text-wrap:balance]"
                >
                  Respeito Absoluto à Forma:{" "}
                  <span className="italic font-normal font-serif text-[#944234]">
                    Ondas, Cachos & Crespos.
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-[#44403C] font-sans leading-relaxed [text-wrap:pretty]">
                  Cabelos com curvatura exigem leitura técnica diferenciada. Do fator encolhimento à densidade do cacho, cada corte é desenhado a seco ou com arquitetura anatômica para valorizar o seu volume sem triangularizar o formato.
                </p>

                {/* 3 Pilares do Corte Visagista */}
                <div className="space-y-3 pt-1 text-sm font-sans">
                  <div className="p-4 rounded-xl bg-white border border-[#E8D0C8] shadow-xs flex items-start gap-3.5">
                    <div className="p-2 rounded-lg bg-[#FAF3F0] text-[#8F6E32] shrink-0">
                      <Scissors className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-[#1C1917] block font-bold text-sm">Corte a Seco Estruturado:</strong>
                      <p className="text-xs text-[#44403C] mt-0.5 leading-relaxed">
                        Visualização imediata do caimento real da mola, evitando surpresas com o fator de encolhimento pós-secagem.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#E8D0C8] shadow-xs flex items-start gap-3.5">
                    <div className="p-2 rounded-lg bg-[#FAF3F0] text-[#8F6E32] shrink-0">
                      <Waves className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-[#1C1917] block font-bold text-sm">Distribuição de Volume em Camadas:</strong>
                      <p className="text-xs text-[#44403C] mt-0.5 leading-relaxed">
                        Leveza e definição estratégica para evitar o efeito pirâmide e permitir movimento 360°.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#E8D0C8] shadow-xs flex items-start gap-3.5">
                    <div className="p-2 rounded-lg bg-[#FAF3F0] text-[#8F6E32] shrink-0">
                      <Eye className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="text-[#1C1917] block font-bold text-sm">Visagismo & Estilo de Vida:</strong>
                      <p className="text-xs text-[#44403C] mt-0.5 leading-relaxed">
                        Análise de formato facial, hábitos de finalização e rotina real da cliente antes de passar a tesoura.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleDirectWhatsApp("Olá Fernanda! Gostaria de agendar um corte a seco visagista e consultoria para cabelos com curvaturas.")}
                    className="min-h-[48px] px-8 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-sm tracking-wide shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-[#E6C99B]" />
                    <span>Agendar Corte & Consultoria Visagista</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ===================== 5. CRONOGRAMA CAPILAR / TRATAMENTOS DE RECUPERAÇÃO (LAVATÓRIO SPA CORRIGIDO) ===================== */}
        <section 
          id="tratamentos"
          aria-labelledby="tratamentos-heading"
          className="py-20 sm:py-28 bg-[#FAF3F0] border-b border-[#E8D0C8] scroll-mt-20 sm:scroll-mt-24"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Coluna Editorial de Tratamento */}
              <div className="lg:col-span-6 space-y-6">
                
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8D0C8] text-[#6E501E] text-xs font-bold uppercase tracking-widest shadow-xs">
                  <HeartPulse className="w-3.5 h-3.5 text-[#8F6E32]" />
                  <span>Saúde da Fibra & Lavatório Spa</span>
                </div>

                <h2 
                  id="tratamentos-heading"
                  className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1917] tracking-tight leading-[1.15] [text-wrap:balance]"
                >
                  Cronograma Capilar &{" "}
                  <span className="italic font-normal font-serif text-[#944234]">
                    Rituais de Recuperação.
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-[#44403C] font-sans leading-relaxed [text-wrap:pretty]">
                  Cabelo bonito é cabelo saudável por dentro e por fora. O tratamento no lavatório vai além de uma simples hidratação: é um diagnóstico profundo com reposição de massa lipídica, reestruturação proteica e relaxamento terapêutico.
                </p>

                {/* As 3 Fases do Cronograma Personalizado */}
                <div className="space-y-3 pt-2 text-sm font-sans">
                  <div className="p-4 rounded-xl bg-white border border-[#E8D0C8] shadow-xs">
                    <span className="text-[10px] font-bold uppercase text-[#8F6E32] tracking-wider block">Fase 01</span>
                    <h4 className="font-serif font-bold text-[#1C1917] text-base">Acidificação & Selagem Cuticular</h4>
                    <p className="text-xs text-[#44403C] mt-1 leading-relaxed">
                      Reequilíbrio de pH pós-processos químicos, blindagem das cutículas abertas e devolução de brilho reflexivo instantâneo.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#E8D0C8] shadow-xs">
                    <span className="text-[10px] font-bold uppercase text-[#8F6E32] tracking-wider block">Fase 02</span>
                    <h4 className="font-serif font-bold text-[#1C1917] text-base">Nutrição Lipídica com Óleos Nobres</h4>
                    <p className="text-xs text-[#44403C] mt-1 leading-relaxed">
                      Reposição da camada lipídica protetora dos fios. Combate imediato ao ressecamento e às pontas ásperas.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[#E8D0C8] shadow-xs">
                    <span className="text-[10px] font-bold uppercase text-[#8F6E32] tracking-wider block">Fase 03</span>
                    <h4 className="font-serif font-bold text-[#1C1917] text-base">Reconstrução & Reposição de Aminoácidos</h4>
                    <p className="text-xs text-[#44403C] mt-1 leading-relaxed">
                      Devolução de matéria ao córtex capilar, aumentando a elasticidade e a resistência à quebra mecânica ou térmica.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleDirectWhatsApp("Olá Fernanda! Gostaria de agendar um tratamento de cronograma capilar de recuperação no lavatório spa.")}
                    className="min-h-[48px] px-8 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-sm tracking-wide shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-[#E6C99B]" />
                    <span>Agendar Sessão de Cronograma Capilar</span>
                  </button>
                </div>

              </div>

              {/* Coluna Visual: Vídeo Real do Lavatório Spa (Com Extensão e Caminho Limpo) */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C5A880]/50 bg-[#1C1917] group">
                  
                  <div className="relative aspect-[9/13] w-full overflow-hidden bg-neutral-900">
                    <video
                      id="lavatorio-video-player"
                      data-lazy-video
                      src="/midias/video-fernanda-cronograma-capilar-lavatorio.mp4"
                      loop
                      muted={isMutedLavatorio}
                      playsInline
                      preload="none"
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Gradiente sutil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                    {/* Botão de Som */}
                    <button
                      type="button"
                      onClick={() => setIsMutedLavatorio(!isMutedLavatorio)}
                      className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-md"
                      aria-label={isMutedLavatorio ? "Ativar som do lavatório" : "Desativar som do lavatório"}
                    >
                      {isMutedLavatorio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#E6C99B]" />}
                    </button>

                    {/* Selo superior */}
                    <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-[#C5A880]/40 text-[10px] font-sans font-bold tracking-wider uppercase flex items-center gap-1.5">
                      <HeartPulse className="w-3 h-3 text-[#E6C99B]" />
                      <span>Lavatório Spa • Porto Alegre</span>
                    </div>

                    {/* Legenda inferior */}
                    <div className="absolute bottom-5 left-5 right-5 z-20 space-y-1.5 text-white">
                      <span className="text-[11px] font-sans font-bold tracking-wider uppercase text-[#E6C99B] block">
                        Tratamento Profundo
                      </span>
                      <h3 className="font-serif font-bold text-xl leading-tight">
                        Nutrição & Reconstrução na Prática
                      </h3>
                      <p className="text-xs text-neutral-300 font-sans">
                        Emulsão minuciosa mecha a mecha com massagem capilar para potencializar a absorção dos ativos na fibra.
                      </p>
                    </div>

                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ===================== 6. GALERIA EDITORIAL DE MAIS ANTES & DEPOIS DA FERNANDA ===================== */}
        <section 
          id="transformacoes"
          aria-labelledby="transformacoes-heading"
          className="py-20 sm:py-28 bg-[#FAF3F0] border-b border-[#E8D0C8] scroll-mt-20 sm:scroll-mt-24"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-14 sm:mb-18">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6E501E] bg-white px-3.5 py-1.5 rounded-full border border-[#E8D0C8]">
                Portfólio de Resultados
              </span>
              <h2 
                id="transformacoes-heading"
                className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] tracking-tight [text-wrap:balance]"
              >
                Mais Casos de Sucesso & Transformações
              </h2>
              <p className="text-base sm:text-lg text-[#44403C] font-sans leading-relaxed [text-wrap:pretty]">
                Cada cabelo tem uma história e uma necessidade única. Veja como a técnica de Fernanda Garroni valoriza diferentes curvaturas, tonalidades e objetivos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Card 1: Contour Avelã */}
              <BeforeAfterSlider
                beforeSrc="/midias/foto-fernanda-morena-iluminada-contour-avela-frente-antes.jpg"
                afterSrc="/midias/foto-fernanda-morena-iluminada-contour-avela-frente-finalizado.jpg"
                beforeAlt="Contour frontal antes da iluminação"
                afterAlt="Contour avelã frontal finalizado iluminando o rosto"
                title="Contour Avelã Frontal"
                subtitle="Mechas estratégicas no contorno facial para iluminar a expressão com elegância discreta."
                tag="Contorno Facial"
              />

              {/* Card 2: Chocolate Profundo */}
              <BeforeAfterSlider
                beforeSrc="/midias/foto-fernanda-morena-iluminada-chocolate-profundo-costas-antes.jpg"
                afterSrc="/midias/foto-fernanda-morena-iluminada-chocolate-profundo-costas-depois.jpg"
                beforeAlt="Cabelo escuro opaco antes"
                afterAlt="Morena iluminada chocolate profundo costas com brilho intenso"
                title="Chocolate Profundo"
                subtitle="Reflexos discretos em tom de chocolate nobre para quem deseja iluminar sem clarear em excesso."
                tag="Sutileza & Brilho"
              />

              {/* Card 3: Ondas Avelã Costas */}
              <BeforeAfterSlider
                beforeSrc="/midias/foto-fernanda-morena-iluminada-ondas-avela-costas-antes.jpg"
                afterSrc="/midias/foto-fernanda-morena-iluminada-ondas-avela-costas-finalizado.jpg"
                beforeAlt="Cabelo com ondas antes da personalização"
                afterAlt="Ondas avelã costas finalizado com relevo e luminosidade fluida"
                title="Ondas Avelã Costas"
                subtitle="Efeito de luz difusa que acompanha o movimento natural das ondas nas costas."
                tag="Movimento Fluido"
              />

              {/* Card 4: Retoque de Cor & Revitalização */}
              <BeforeAfterSlider
                beforeSrc="/midias/foto-fernanda-morena-iluminada-antes-retoque-de-cor3.jpg"
                afterSrc="/midias/foto-fernanda-morena-iluminada-depois-retoque-de-cor-finalizado3.jpg"
                beforeAlt="Cabelo antes do retoque de cor com pontas desbotadas"
                afterAlt="Cabelo com retoque de cor finalizado com brilho e uniformidade"
                title="Retoque de Cor & Correção"
                subtitle="Alinhamento e revitalização de mechas antigas com proteção da raiz e do comprimento."
                tag="Correção & Brilho"
              />

              {/* Card 5: Marrom Pinhão */}
              <BeforeAfterSlider
                beforeSrc="/midias/foto-fernanda-Morena-iluminada-marrom-pinhão-antes1.jpg"
                afterSrc="/midias/foto-fernanda-Morena-iluminada-marrom-pinhão-depois1.jpg"
                beforeAlt="Cabelo antes da morena iluminada marrom pinhão"
                afterAlt="Morena iluminada marrom pinhão finalizado com riqueza de reflexos"
                title="Marrom Pinhão Marcante"
                subtitle="Nuance rica e envolvente inspirada no calor do pinhão, ideal para a estação mais fria ou climas amenos."
                tag="Nuance Exclusiva"
              />

              {/* Card 6: Perfil Suave */}
              <BeforeAfterSlider
                beforeSrc="/midias/foto-fernanda-morena-iluminada-perfil-suave-antes.jpg"
                afterSrc="/midias/foto-fernanda-morena-iluminada-perfil-suave-finalizado.jpg"
                beforeAlt="Perfil antes da iluminação e corte"
                afterAlt="Perfil suave finalizado com iluminação harmônica"
                title="Perfil Suave & Harmonia"
                subtitle="Leitura visagista completa unindo iluminação personalizada e corte com caimento sob medida."
                tag="Visagismo Completo"
              />

            </div>

          </div>
        </section>

        {/* ===================== 7. SEÇÃO DE AUTORIDADE & ATENDIMENTO EXCLUSIVO ===================== */}
        <section 
          id="atendimento-exclusivo"
          aria-labelledby="autoridade-heading"
          className="py-20 sm:py-28 bg-[#FAF3F0] border-b border-[#E8D0C8] scroll-mt-20 sm:scroll-mt-24"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-14 sm:mb-18">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#6E501E] bg-white px-3.5 py-1.5 rounded-full border border-[#E8D0C8] shadow-2xs">
                EXCLUSIVIDADE • ATELIÊ BOUTIQUE
              </span>
              <h2 
                id="autoridade-heading"
                className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] tracking-tight [text-wrap:balance]"
              >
                Atendimento Individual e Personalizado na Sala 205
              </h2>
              <p className="text-base sm:text-lg text-[#44403C] font-sans leading-relaxed [text-wrap:pretty]">
                Um ambiente acolhedor, privativo e com hora marcada na Av. Nonoai, 151, onde cada mecha e formato são desenhados exclusivamente para a sua harmonia visual.
              </p>
            </div>

            {/* Grid dos 3 Pilares Fundamentais de Autoridade */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Pilar 1: Diagnóstico Visagista Prévio */}
              <div className="p-8 rounded-2xl bg-white border border-[#E8D0C8] shadow-xs hover:border-[#C5A880]/60 transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF3F0] border border-[#E8D0C8] flex items-center justify-center text-[#8F6E32] group-hover:scale-105 transition-transform">
                    <Sparkles className="w-6 h-6 text-[#C99065]" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#1C1917]">
                    Diagnóstico Visagista Prévio
                  </h3>
                  <p className="text-sm text-[#44403C] font-sans leading-relaxed">
                    Análise aprofundada da sua arquitetura facial, subtom de pele, rotina e estilo de vida. A cor e o corte são concebidos para valorizar quem você é por completo.
                  </p>
                </div>
                <div className="pt-5 mt-6 border-t border-[#F0E4DE] flex items-center gap-2 text-xs font-sans font-bold text-[#6E501E] uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-[#8F6E32]" />
                  <span>Personalização Total</span>
                </div>
              </div>

              {/* Pilar 2: Teste de Mecha Obrigatório */}
              <div className="p-8 rounded-2xl bg-white border border-[#E8D0C8] shadow-xs hover:border-[#C5A880]/60 transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF3F0] border border-[#E8D0C8] flex items-center justify-center text-[#8F6E32] group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-6 h-6 text-[#C99065]" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#1C1917]">
                    Teste de Mecha Obrigatório
                  </h3>
                  <p className="text-sm text-[#44403C] font-sans leading-relaxed">
                    Compromisso inegociável com a integridade capilar. Avaliamos a elasticidade, força e compatibilidade química da fibra antes de qualquer processo de iluminação.
                  </p>
                </div>
                <div className="pt-5 mt-6 border-t border-[#F0E4DE] flex items-center gap-2 text-xs font-sans font-bold text-[#6E501E] uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-[#8F6E32]" />
                  <span>Segurança da Fibra</span>
                </div>
              </div>

              {/* Pilar 3: Ambiente Privativo com Hora Marcada */}
              <div className="p-8 rounded-2xl bg-white border border-[#E8D0C8] shadow-xs hover:border-[#C5A880]/60 transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF3F0] border border-[#E8D0C8] flex items-center justify-center text-[#8F6E32] group-hover:scale-105 transition-transform">
                    <Calendar className="w-6 h-6 text-[#C99065]" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#1C1917]">
                    Ambiente Privativo com Hora Marcada
                  </h3>
                  <p className="text-sm text-[#44403C] font-sans leading-relaxed">
                    Sem o barulho ou agitação de salões tradicionais. Na Sala 205 da Av. Nonoai, o foco é 100% individual, garantindo tranquilidade, café especial e atendimento dedicado.
                  </p>
                </div>
                <div className="pt-5 mt-6 border-t border-[#F0E4DE] flex items-center gap-2 text-xs font-sans font-bold text-[#6E501E] uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-[#8F6E32]" />
                  <span>Atendimento One-on-One</span>
                </div>
              </div>

            </div>

            {/* CTA Direto para Triagem de Horário no WhatsApp */}
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => handleDirectWhatsApp("Olá, Fernanda! Gostaria de agendar uma avaliação e triagem de horário para atendimento exclusivo na Sala 205.")}
                className="inline-flex items-center gap-2.5 min-h-[50px] px-8 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#8F6E32] text-white font-sans font-semibold text-sm tracking-wide shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#E6C99B]" />
                <span>Agendar Horário Exclusivo no WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-[#E6C99B]" />
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* ===================== LOCALIZAÇÃO & FOOTER INSTITUCIONAL ===================== */}
      <LocationAndFooter onOpenTriage={handleOpenGeneralTriage} />

      {/* ===================== BARRA DE CONVERSÃO FLUTUANTE PERSISTENTE ===================== */}
      <StickyConversionBar 
        onOpenTriage={handleOpenGeneralTriage} 
        isTriageOpen={isTriageOpen} 
      />

      {/* ===================== GAVETA DE TRIAGEM PRÉVIA PARA WHATSAPP ===================== */}
      <WhatsAppTriageDrawer
        isOpen={isTriageOpen}
        initialServiceId={initialService}
        onClose={() => setIsTriageOpen(false)}
        whatsappPhone={WHATSAPP_PHONE}
      />

    </div>
  );
}
