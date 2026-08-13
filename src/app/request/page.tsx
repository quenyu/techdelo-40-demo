import type { Metadata } from "next";
import { RequestWizard } from "@/components/request-wizard";

export const metadata: Metadata = {
  title: "Подбор техники и расчёт · Demo",
  description: "Трёхшаговый демонстрационный flow подбора спецтехники по задаче, объекту и дате.",
};

export default async function RequestPage({ searchParams }: { searchParams: Promise<{ equipment?: string }> }) {
  const params = await searchParams;
  return (
    <section className="section-block">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <div className="section-kicker">Не знаете модель?</div>
          <h1 className="section-title">Соберите нормальное ТЗ за три шага</h1>
          <p className="body-lg mt-6">Интерфейс спрашивает только то, что влияет на подбор и расчёт: работу, объект, дату и условия площадки.</p>
          <div className="mt-8 rounded-lg border border-rust/25 bg-[#fff3ed] p-5 text-sm leading-6 text-ink-soft">
            <strong className="block text-ink">Безопасный demo-mode</strong>
            Контакты не уходят на сервер и исчезнут после обновления страницы.
          </div>
        </div>
        <RequestWizard initialEquipment={params.equipment} />
      </div>
    </section>
  );
}
