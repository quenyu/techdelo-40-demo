import type { Metadata } from "next";
import { CatalogClient } from "@/components/catalog-client";
import { MobileCta } from "@/components/mobile-cta";
import { equipment } from "@/lib/equipment";

export const metadata: Metadata = {
  title: "Каталог спецтехники · Demo",
  description: "Демонстрационный каталог спецтехники с реальными UX-фильтрами по типу работ, цене и минимальному заказу.",
};

export default async function CatalogPage({ searchParams }: { searchParams: Promise<{ task?: string }> }) {
  const params = await searchParams;
  return (
    <>
      <section className="border-b border-line bg-white/60 py-12 sm:py-16 lg:py-20">
        <div className="container-shell">
          <div className="section-kicker">12 демонстрационных единиц</div>
          <h1 className="section-title max-w-4xl">Каталог, в котором можно принять следующее решение</h1>
          <p className="body-lg mt-6 max-w-3xl">Фильтруйте по задаче, типу, ставке и минимальному заказу. Цена за смену и технические ограничения — в карточке машины.</p>
        </div>
      </section>
      <section className="section-block !pt-10">
        <div className="container-shell">
          <CatalogClient items={equipment} initialTask={params.task} />
        </div>
      </section>
      <MobileCta />
    </>
  );
}
