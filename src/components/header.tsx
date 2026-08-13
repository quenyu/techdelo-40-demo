"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { navItems, siteConfig } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/95 backdrop-blur-md">
      <div className="container-shell flex h-[74px] items-center justify-between gap-5">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 items-center rounded-md px-3 text-sm font-bold transition-colors ${
                  active ? "bg-white text-ink" : "text-ink-soft hover:bg-white/70"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={siteConfig.phoneHref} className="flex min-h-11 items-center gap-2 px-2 text-sm font-extrabold">
            <Phone aria-hidden="true" className="h-4 w-4" />
            {siteConfig.phoneDisplay}
          </a>
          <Link href="/request" className="btn-primary">
            Проверить доступность
          </Link>
        </div>
        <button
          type="button"
          className="grid h-12 w-12 place-items-center rounded-md border border-line bg-surface lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      {open ? (
        <div id="mobile-menu" className="border-t border-line bg-surface lg:hidden">
          <div className="container-shell grid gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-between rounded-md px-3 text-base font-bold hover:bg-canvas"
              >
                {item.label}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
            <Link href={siteConfig.phoneHref} onClick={() => setOpen(false)} className="mt-2 flex min-h-12 items-center gap-3 rounded-md border border-line px-3 font-extrabold">
              <Phone aria-hidden="true" className="h-5 w-5" />
              {siteConfig.phoneDisplay}
            </Link>
            <Link href="/request" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
              Проверить доступность
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
