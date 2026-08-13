import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/logo";
import { navItems, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-shell grid gap-12 py-14 lg:grid-cols-[1.3fr_1fr_1fr] lg:py-20">
        <div>
          <Logo inverse />
          <p className="mt-6 max-w-md text-sm leading-7 text-white/60">
            Концепт сайта регионального оператора аренды спецтехники. Компания,
            цены, контакты и операционные показатели созданы исключительно для
            демонстрации дизайна и разработки.
          </p>
        </div>
        <div>
          <p className="mb-4 text-xs font-extrabold tracking-[0.12em] text-signal uppercase">Разделы</p>
          <nav className="grid gap-2" aria-label="Навигация в подвале">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="flex min-h-10 items-center text-sm font-bold text-white/75 hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link href="/privacy" className="flex min-h-10 items-center text-sm font-bold text-white/75 hover:text-white">
              Политика demo-формы
            </Link>
          </nav>
        </div>
        <div>
          <p className="mb-4 text-xs font-extrabold tracking-[0.12em] text-signal uppercase">Демо-контакты</p>
          <a href={siteConfig.phoneHref} className="inline-flex min-h-11 items-center gap-2 text-lg font-extrabold hover:text-signal">
            {siteConfig.phoneDisplay} <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
          <p className="mt-3 text-sm leading-6 text-white/60">{siteConfig.workHours}</p>
          <p className="mt-2 text-sm leading-6 text-white/60">{siteConfig.radius}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col gap-3 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ТЕХДЕЛО 40 · Concept / Demo project</p>
          <p>Фото: Vadym Alyekseyenko и John Kakuk, Unsplash License</p>
        </div>
      </div>
    </footer>
  );
}
