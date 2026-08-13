import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, TriangleAlert } from "lucide-react";

export const metadata: Metadata = { title: "Доставка и география · Demo", description: "Демонстрационные зоны подачи спецтехники по Калуге и области." };

const zones = [
  { zone: "A", title: "Калуга", distance: "в черте города", price: "от 2 500 ₽", places: "Правобережье, центр, Северный, промзоны" },
  { zone: "B", title: "Ближняя область", distance: "до 40 км", price: "от 4 500 ₽", places: "Воротынск, Кондрово, Бабынино, Детчино" },
  { zone: "C", title: "Регион", distance: "40–120 км", price: "по маршруту", places: "Обнинск, Малоярославец, Таруса, Козельск" },
];

export default function DeliveryPage() {
  return (
    <>
      <section className="border-b border-line bg-white/60 py-16 lg:py-24"><div className="container-shell"><div className="section-kicker">Калуга + 120 км</div><h1 className="display-title max-w-5xl">Подача считается по маршруту, а не прячется в мелком шрифте</h1><p className="body-lg mt-7 max-w-3xl">Тарифы ниже — демонстрационная модель. Реальный оператор должен подтвердить адрес, габариты, пропуска и способ перевозки машины.</p></div></section>
      <section className="section-block">
        <div className="container-shell grid gap-5 lg:grid-cols-3">
          {zones.map(({ zone, title, distance, price, places }) => (
            <article key={zone} className="surface-card p-6 sm:p-8">
              <div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-md bg-ink text-lg font-extrabold text-signal">{zone}</span><MapPin aria-hidden="true" className="h-6 w-6 text-muted" /></div>
              <h2 className="mt-8 text-3xl font-extrabold tracking-[-0.045em]">{title}</h2>
              <p className="mt-2 text-sm font-bold text-muted">{distance}</p>
              <p className="mt-7 text-3xl font-extrabold tracking-[-0.045em]">{price}</p>
              <p className="mt-4 border-t border-line pt-4 text-sm leading-6 text-muted">{places}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section-block border-y border-line bg-ink text-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div><div className="section-kicker !text-white/55">Что влияет</div><h2 className="section-title">До выезда проверяем четыре вещи</h2></div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Адрес и фактический километраж", "Габариты, масса и необходимость трала", "Пропуска и ограничения движения", "Возможность развернуться и установить опоры"].map((item, index) => <div key={item} className="rounded-lg border border-white/15 p-5"><span className="text-sm font-extrabold text-signal">0{index + 1}</span><p className="mt-4 font-extrabold leading-6">{item}</p></div>)}
          </div>
        </div>
      </section>
      <section className="section-block"><div className="container-shell"><div className="surface-card grid gap-7 bg-[#fff3ed] p-7 sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center"><TriangleAlert aria-hidden="true" className="h-10 w-10 text-rust" /><div><h2 className="text-2xl font-extrabold tracking-[-0.04em]">Гусеничная техника и крупные краны требуют отдельного расчёта</h2><p className="mt-2 text-sm leading-6 text-muted">Важны трал, согласование маршрута, опоры, схема подъёма и место разгрузки.</p></div><Link href="/request" className="btn-dark">Рассчитать подачу <ArrowRight aria-hidden="true" className="h-5 w-5" /></Link></div></div></section>
    </>
  );
}
