import React from "react";

interface SbLogoProps {
  className?: string;
  variant?: "dark" | "light" | "gold";
  showSubtitle?: boolean;
  showStamp?: boolean;
}

export function SbLogo({
  className = "h-10",
  variant = "dark",
  showSubtitle = true,
  showStamp = true,
}: SbLogoProps) {
  const isLight = variant === "light";
  const isGold = variant === "gold";

  // Cores dinâmicas de acordo com a paleta oficial:
  // Grafite Profundo (#1C1917), Ouro Champanhe (#C5A880 / #8F6E32) e Off-White (#FAF8F5)
  const primaryColor = isLight ? "#FFFFFF" : isGold ? "#C5A880" : "#1C1917";
  const accentColor = isLight ? "#E5D1B8" : "#C5A880";
  const subtitleColor = isLight ? "#D4CDC5" : isGold ? "#8F6E32" : "#5D5752";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Logotipo Oficial da Marca com Imagem Oficial */}
      <div className="relative h-full aspect-square rounded-full overflow-hidden border border-[#C5A880]/50 shrink-0 shadow-xs bg-[#141210] flex items-center justify-center">
        <img
          src="/midias/foto-logo-fernanda.jpg"
          alt="Logo Fernanda Garroni"
          className="w-full h-full object-cover"
        />
      </div>

      {/* TEXTO INSTITUCIONAL COMPLETO */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-1.5">
          <span
            className="font-serif font-bold tracking-tight text-base sm:text-lg md:text-xl leading-none"
            style={{ color: primaryColor }}
          >
            Fernanda Garroni
          </span>
        </div>

        {showSubtitle && (
          <span
            className="text-[10px] sm:text-xs font-sans font-medium tracking-[0.16em] uppercase mt-0.5 leading-tight"
            style={{ color: subtitleColor }}
          >
            Cabeleireira & Visagista
          </span>
        )}
      </div>
    </div>
  );
}

export default SbLogo;
