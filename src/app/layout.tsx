import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fernanda Garroni — Cabeleireira & Visagista | Especialista em Morenas Iluminadas & Curvaturas em Porto Alegre",
  description: "Especialista em Morenas Iluminadas & Cabelos com Curvaturas em Porto Alegre (RS). Tríade de Morenas Iluminadas, Cortes Visagistas e Cronograma Capilar na Av. Nonoai, nº 151, Sala 205.",
  keywords: [
    "Fernanda Garroni",
    "Cabeleireira Porto Alegre",
    "Visagista Porto Alegre",
    "Morenas Iluminadas Porto Alegre",
    "Cabelos com Curvaturas Porto Alegre",
    "Corte Cacheado Porto Alegre",
    "Cronograma Capilar Porto Alegre"
  ],
  authors: [{ name: "Fernanda Garroni" }],
  openGraph: {
    title: "Fernanda Garroni — Cabeleireira & Visagista | Especialista em Morenas Iluminadas & Curvaturas em Porto Alegre",
    description: "Especialista em Morenas Iluminadas & Cabelos com Curvaturas. Agende sua avaliação personalizada na Av. Nonoai, 151, Sala 205.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth font-sans">
      <head>
        <meta name="theme-color" content="#FAF3F0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#FAF3F0] text-[#1C1917] antialiased selection:bg-[#C5A880]/30 selection:text-[#1C1917] font-sans">
        {children}
      </body>
    </html>
  );
}
