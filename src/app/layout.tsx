import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import { DemoNotice } from "@/components/demo-notice";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "ТЕХДЕЛО 40 — аренда спецтехники в Калуге · Demo",
    template: "%s | ТЕХДЕЛО 40",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "аренда спецтехники Калуга",
    "экскаватор-погрузчик",
    "автокран",
    "манипулятор",
    "demo project",
  ],
  authors: [{ name: "Concept / Demo Project" }],
  openGraph: {
    title: "ТЕХДЕЛО 40 — техника под задачу",
    description: "Commercial-grade concept/demo сайта регионального оператора спецтехники.",
    type: "website",
    locale: "ru_RU",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "ТЕХДЕЛО 40 — Concept / Demo Project",
    description: "UX, UI и адаптивная реализация сайта аренды спецтехники.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <a href="#main" className="fixed left-3 top-3 z-[100] -translate-y-24 rounded-md bg-signal px-4 py-3 font-bold text-ink focus:translate-y-0">
          Перейти к содержанию
        </a>
        <DemoNotice />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
