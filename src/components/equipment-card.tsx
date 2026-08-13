import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { Equipment, formatPrice } from "@/lib/equipment";

export function EquipmentCard({ item, priority = false }: { item: Equipment; priority?: boolean }) {
  return (
    <article className="group surface-card overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
      <Link href={`/catalog/${item.slug}`} className="block">
        <div className="relative aspect-[4/2.65] overflow-hidden bg-[#d4d7cf]">
          <Image
            src={item.image}
            alt={`${item.name} ${item.model} на строительной площадке — демонстрационное фото`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover saturate-[0.82] transition-transform duration-500 group-hover:scale-[1.025]"
            style={{ objectPosition: item.imagePosition ?? "center" }}
          />
          <div className="absolute left-3 top-3 rounded-md bg-ink/88 px-3 py-2 text-[11px] font-extrabold tracking-[0.08em] text-white uppercase backdrop-blur">
            {item.type}
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-extrabold tracking-[-0.035em]">{item.name}</h3>
              <p className="mt-1 text-sm font-bold text-muted">{item.model}</p>
            </div>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-line bg-white transition-colors group-hover:bg-signal">
              <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
            </span>
          </div>
          <p className="mt-4 min-h-[48px] text-sm leading-6 text-ink-soft">{item.short}</p>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-3 border-t border-line pt-5">
            <div>
              <p className="text-xs font-bold text-muted">от</p>
              <p className="text-2xl font-extrabold tracking-[-0.04em]">{formatPrice(item.priceHour)} ₽<span className="text-sm font-bold text-muted"> / час</span></p>
            </div>
            <span className="inline-flex items-center gap-2 text-xs font-bold text-muted">
              <Clock3 aria-hidden="true" className="h-4 w-4" /> от {item.minHours} ч
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
