import type { Metadata } from "next";
import Link from "next/link";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Контакты · Demo", description: "Демонстрационные контакты fictional company." };

export default function ContactsPage() {
  return (
    <section className="section-block">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div><div className="section-kicker">Демо-контакты</div><h1 className="display-title">Связь без тупика</h1><p className="body-lg mt-7">Телефон остаётся быстрым каналом, но пользователь может сначала собрать задачу и не объяснять всё с нуля.</p></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <a href={siteConfig.phoneHref} className="surface-card min-h-[190px] p-6 hover:border-ink"><Phone aria-hidden="true" className="h-7 w-7" /><p className="mt-8 text-xs font-bold tracking-[0.1em] text-muted uppercase">Телефон</p><p className="mt-2 text-xl font-extrabold">{siteConfig.phoneDisplay}</p></a>
          <a href={`mailto:${siteConfig.email}`} className="surface-card min-h-[190px] p-6 hover:border-ink"><Mail aria-hidden="true" className="h-7 w-7" /><p className="mt-8 text-xs font-bold tracking-[0.1em] text-muted uppercase">Email</p><p className="mt-2 break-all text-lg font-extrabold">{siteConfig.email}</p></a>
          <div className="surface-card min-h-[190px] p-6"><MapPin aria-hidden="true" className="h-7 w-7" /><p className="mt-8 text-xs font-bold tracking-[0.1em] text-muted uppercase">Адрес</p><p className="mt-2 text-base font-extrabold leading-6">{siteConfig.address}</p></div>
          <div className="surface-card min-h-[190px] p-6"><Clock3 aria-hidden="true" className="h-7 w-7" /><p className="mt-8 text-xs font-bold tracking-[0.1em] text-muted uppercase">Диспетчерская</p><p className="mt-2 text-lg font-extrabold">{siteConfig.workHours}</p></div>
          <div className="surface-card bg-signal p-7 sm:col-span-2"><p className="text-sm font-bold">Предпочитаете не звонить?</p><h2 className="mt-3 text-3xl font-extrabold tracking-[-0.045em]">Соберите задачу в форме, которая ничего не отправляет</h2><Link href="/request" className="btn-dark mt-6">Открыть demo-заявку</Link></div>
        </div>
      </div>
    </section>
  );
}
