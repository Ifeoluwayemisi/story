import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Karla } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeInit } from "@/components/layout/theme-init";
import { SkipLink } from "@/components/primitives/skip-link";
import { cn } from "@/lib/cn";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Racheal — Product-Minded Full-Stack Software Engineer",
  description: "I build thoughtful, well-architected software, and I own outcomes end-to-end.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={cn(fraunces.variable, karla.variable, plexMono.variable, "h-full antialiased")}
    >
      <body className="flex min-h-full flex-col bg-paper font-body text-ink">
        <ThemeInit />
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
