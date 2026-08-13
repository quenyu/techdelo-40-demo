import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Construction, Container, Pickaxe, Route, Truck, Wrench } from "lucide-react";
import { TaskLinks } from "@/components/task-links";

export const metadata: Metadata = { title: "Услуги · Demo", description: "Демонстрационная структура услуг аренды спецтехники по задачам клиента." };

const services = [
  { title: "Земляные работы", text: "Траншеи, котлованы, обратная засыпка, планировка участка.", icon: Pickaxe, task: "Копать и планировать" },
  { title: "Подъём и монтаж", text: "Разгрузка фур, монтаж конструкций, подача материалов на высоту.", icon: Construction, task: "Поднимать груз" },
  { title: "Перевозка с разгрузкой", text: "Манипулятор для блоков, плит, бытовок и оборудования.", icon: Truck, task: "Перевозить материалы" },
  { title: "Вывоз грунта и мусора", text: "Самосвалы и погрузка с расчётом по времени или рейсам.", icon: Container, task: "Грузить и вывозить" },
  { title: "Высотные работы", text: "Автовышки для фасадов, кровли, рекламы и электромонтажа.", icon: Wrench, task: "Работать на высоте" },
  { title: "Доставка техники", text: "Подача по Калуге и области; перевозка гусеничной техники тралом.", icon: Route, task: "Копать и планировать" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line bg-ink py-16 text-white lg:py-24">
        <div className="container-shell">
          <div className="section-kicker !text-white/55">Услуги по результату</div>
          <h1 className="display-title max-w-5xl">Сначала работа. Потом — конкретная машина.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/60">Структура не заставляет частного заказчика разбираться в моделях, а B2B-пользователю оставляет прямой путь в каталог.</p>
        </div>
      </section>
      <section className="section-block">
        <div className="container-shell grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map(({ title, text, icon: Icon, task }, index) => (
            <article key={title} className="surface-card flex min-h-[280px] flex-col p-6 sm:p-8">
              <div className="flex items-start justify-between"><span className="grid h-13 w-13 place-items-center rounded-md bg-signal"><Icon aria-hidden="true" className="h-6 w-6" /></span><span className="text-sm font-extrabold text-muted">0{index + 1}</span></div>
              <h2 className="mt-9 text-2xl font-extrabold tracking-[-0.04em]">{title}</h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted">{text}</p>
              <Link href={`/catalog?task=${encodeURIComponent(task)}`} className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-extrabold">Подобрать технику <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            </article>
          ))}
        </div>
      </section>
      <section className="section-block border-y border-line bg-white/55"><div className="container-shell"><div className="section-kicker">Быстрый вход</div><h2 className="section-title max-w-3xl">Что нужно сделать?</h2><div className="mt-9"><TaskLinks /></div></div></section>
    </>
  );
}
