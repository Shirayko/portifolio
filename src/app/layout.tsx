import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Bebas_Neue, Playfair_Display, Noto_Sans_JP, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation/Navigation";
import ChannelTuner from "@/components/ChannelTuner/ChannelTuner";
import Footer from "@/components/Footer/Footer";

const Particles = dynamic(
  () => import("@/components/Particles/Particles")
);

const MusicPlayer = dynamic(
  () => import("@/components/MusicPlayer/MusicPlayer")
);

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-title",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-jp",
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PORTFOLIO // P4",
  description:
    "Portfólio de desenvolvedor full stack especializado em React, Node.js e TypeScript. Tema inspirado em Persona 4.",
  keywords: [
    "desenvolvedor",
    "full stack",
    "React",
    "Node.js",
    "TypeScript",
    "portfolio",
    "Persona 4",
  ],
  authors: [{ name: "Shirayko" }],
  openGraph: {
    title: "PORTFOLIO // P4",
    description:
      "Portfólio de desenvolvedor full stack — Transformando ideias em experiências digitais.",
    type: "website",
    locale: "pt_BR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${bebasNeue.variable} ${playfairDisplay.variable} ${notoSansJP.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Shirayko",
              jobTitle: "Desenvolvedor Full Stack",
              knowsAbout: ["React", "Node.js", "TypeScript", "Next.js"],
            }),
          }}
        />
      </head>
      <body>
        <div className="tv-frame" aria-hidden="true">
          <div className="tv-frame-corner tl" />
          <div className="tv-frame-corner tr" />
          <div className="tv-frame-corner bl" />
          <div className="tv-frame-corner br" />
        </div>
        <div className="scanlines" aria-hidden="true" />
        <div className="noise-overlay" aria-hidden="true" />

        <ChannelTuner />
        <Particles />
        <Navigation />

        <main id="main-content">{children}</main>

        <Footer />
        <MusicPlayer />
      </body>
    </html>
  );
}
