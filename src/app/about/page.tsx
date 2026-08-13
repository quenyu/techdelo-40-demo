import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, FileCheck2, Gauge, Repeat2 } from "lucide-react";
import { imageSources } from "@/lib/site";

export const metadata: Metadata = { title: "О demo-компании", description: "Fictional business brief и честная маркировка Concept / Demo Project." };

export default function AboutPage() {
  return (
    <>
      <section className="section-block"><div className="container-shell grid gap-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"><div><div className="section-kicker">Fictional business brief</div><h1 className="display-title">Региональный парк, а не выдуманный холдинг</h1><p className="body-lg mt-7">«ТЕХДЕЛО 40» придумано как реалистичный оператор среднего масштаба: 12 единиц, 8 категорий, Калуга и область, частные и B2B-заказы.</p></div><div className="relative aspect-[4/3] overflow-hidden rounded-xl"><Image src={imageSources.fleet} alt="Тяжёлая техника на строительной площадке — демонстрационная фотография" fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover saturate-[0.8]" /></div></div></section>
      <section className="section-block border-y border-line bg-white/55"><div className="container-shell"><div className="section-kicker">Операционная модель demo</div><h2 className="section-title max-w-4xl">Доверие строится на проверяемых условиях, а не на фальшивых отзывах</h2><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[
        { icon: Gauge, title: "Техника с экипажем", text: "Ставка включает работу оператора и топливо, если не указано иное." },
        { icon: Repeat2, title: "Резервная замена", text: "При неисправности fictional operator предлагает машину того же класса." },
        { icon: FileCheck2, title: "Документооборот", text: "Договор, заявка, путевой лист и закрывающие документы для B2B." },
        { icon: BadgeCheck, title: "Проверка до подачи", text: "Адрес, задача и ограничения согласуются до бронирования." },
      ].map(({ icon: Icon, title, text }) => <article key={title} className="surface-card p-6"><span className="grid h-12 w-12 place-items-center rounded-md bg-signal"><Icon aria-hidden="true" className="h-6 w-6" /></span><h3 className="mt-6 text-xl font-extrabold tracking-[-0.03em]">{title}</h3><p className="mt-3 text-sm leading-6 text-muted">{text}</p></article>)}</div></div></section>
      <section className="section-block"><div className="container-shell grid gap-8 lg:grid-cols-2"><div><div className="section-kicker">Честность кейса</div><h2 className="section-title">Что здесь настоящее, а что придумано</h2></div><div className="grid gap-4"><div className="surface-card p-6"><h3 className="font-extrabold text-success">Настоящее в проекте</h3><p className="mt-3 text-sm leading-7 text-muted">Исследование рынка, UX-сценарии, IA, дизайн-система, responsive frontend, фильтры, validation, QA и deployment.</p></div><div className="surface-card p-6"><h3 className="font-extrabold text-rust">Демонстрационные данные</h3><p className="mt-3 text-sm leading-7 text-muted">Компания, телефон, адрес, парк, цены, SLA и операционные преимущества. Проект не был заказан и не имеет измеренного коммерческого результата.</p></div><Link href="/catalog" className="btn-primary justify-self-start">Посмотреть продукт <ArrowRight aria-hidden="true" className="h-5 w-5" /></Link></div></div></section>
    </>
  );
}
