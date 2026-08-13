import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarCheck2, Check, Info, MapPinned } from "lucide-react";
import { EquipmentCard } from "@/components/equipment-card";
import { MobileCta } from "@/components/mobile-cta";
import { equipment, formatPrice, getEquipmentBySlug } from "@/lib/equipment";

export function generateStaticParams() {
  return equipment.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getEquipmentBySlug(slug);
  if (!item) return {};
  return {
    title: `${item.name} ${item.model} · Demo`,
    description: `${item.short} От ${formatPrice(item.priceHour)} ₽/час, минимальный заказ ${item.minHours} часа. Демонстрационные данные.`,
  };
}

export default async function EquipmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getEquipmentBySlug(slug);
  if (!item) notFound();
  const similar = equipment.filter((candidate) => candidate.type === item.type && candidate.slug !== item.slug).slice(0, 3);
  const fallbacks = equipment.filter((candidate) => candidate.slug !== item.slug && item.tasks.some((task) => candidate.tasks.includes(task))).slice(0, Math.max(0, 3 - similar.length));
  const related = [...similar, ...fallbacks].slice(0, 3);

  return (
    <>
      <section className="border-b border-line bg-white/55 py-4">
        <div className="container-shell flex items-center gap-2 text-sm font-bold text-muted">
          <Link href="/catalog" className="inline-flex min-h-11 items-center gap-2 hover:text-ink"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> Каталог</Link>
          <span aria-hidden="true">/</span><span className="truncate text-ink">{item.model}</span>
        </div>
      </section>
      <section className="section-block !pt-8">
        <div className="container-shell grid gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#d4d7cf] lg:aspect-[1.13/1]">
              <Image src={item.image} alt={`${item.name} ${item.model} — демонстрационное фото`} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover saturate-[0.82]" style={{ objectPosition: item.imagePosition ?? "center" }} />
              <span className="absolute left-4 top-4 rounded-md bg-ink/88 px-3 py-2 text-xs font-extrabold tracking-[0.08em] text-white uppercase">{item.type}</span>
            </div>
            <p className="image-credit mt-3">Фото используется как визуальный референс и не изображает парк реальной компании.</p>
          </div>
          <div className="surface-card p-5 sm:p-8 lg:sticky lg:top-24">
            <p className="text-sm font-extrabold text-muted">{item.model}</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-[-0.055em] sm:text-6xl">{item.name}</h1>
            <p className="mt-5 text-base leading-7 text-ink-soft">{item.short}</p>
            <div className="mt-7 grid gap-3 border-y border-line py-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-bold text-muted">Ставка от</p>
                <p className="mt-1 text-3xl font-extrabold tracking-[-0.04em]">{formatPrice(item.priceHour)} ₽<span className="text-sm text-muted"> / час</span></p>
              </div>
              <div>
                <p className="text-xs font-bold text-muted">Смена 8 часов</p>
                <p className="mt-1 text-3xl font-extrabold tracking-[-0.04em]">{formatPrice(item.shiftPrice)} ₽</p>
              </div>
            </div>
            <div className="mt-5 flex items-start gap-3 rounded-lg bg-canvas p-4">
              <Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
              <p className="text-sm leading-6">Минимальный заказ — <strong>{item.minHours} часа</strong>. Подача, навесное и условия площадки считаются отдельно.</p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link href={`/request?equipment=${encodeURIComponent(`${item.name} ${item.model}`)}`} className="btn-primary">Проверить доступность <CalendarCheck2 aria-hidden="true" className="h-5 w-5" /></Link>
              <Link href="/delivery" className="btn-secondary">Как считается подача</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block border-y border-line bg-white/55">
        <div className="container-shell grid gap-10 lg:grid-cols-2">
          <div>
            <div className="section-kicker">Характеристики</div>
            <h2 className="section-title">Достаточно данных для первичного выбора</h2>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {item.specs.map((spec) => (
              <div key={spec.label} className="grid grid-cols-[1fr_auto] gap-6 py-4 text-sm">
                <dt className="text-muted">{spec.label}</dt><dd className="text-right font-extrabold">{spec.value}</dd>
              </div>
            ))}
          </dl>
          <div className="surface-card p-6 sm:p-8">
            <h3 className="text-2xl font-extrabold tracking-[-0.035em]">Что входит и что уточнить</h3>
            <ul className="mt-6 grid gap-4">
              {item.features.map((feature) => <li key={feature} className="flex items-start gap-3 text-sm leading-6"><Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-success" />{feature}</li>)}
            </ul>
          </div>
          <div className="surface-card p-6 sm:p-8">
            <h3 className="flex items-center gap-3 text-2xl font-extrabold tracking-[-0.035em]"><MapPinned aria-hidden="true" className="h-6 w-6" /> Подача на объект</h3>
            <p className="mt-5 text-sm leading-7 text-muted">{item.delivery} Финальная стоимость фиксируется после адреса, даты и проверки условий объекта.</p>
            <Link href="/delivery" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-extrabold underline decoration-line underline-offset-4">Посмотреть зоны <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container-shell">
          <div className="flex items-end justify-between gap-5"><div><div className="section-kicker">Альтернативы</div><h2 className="section-title">Похожая техника</h2></div><div className="hidden sm:block"><Link href="/catalog" className="btn-secondary">Весь каталог</Link></div></div>
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{related.map((candidate) => <EquipmentCard key={candidate.slug} item={candidate} />)}</div>
        </div>
      </section>
      <MobileCta equipment={`${item.name} ${item.model}`} />
    </>
  );
}
