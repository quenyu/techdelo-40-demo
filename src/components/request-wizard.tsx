"use client";

import Link from "next/link";
import { Check, ChevronLeft, ChevronRight, CircleCheckBig } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { requestSchema, type RequestData } from "@/lib/request-schema";

type RequestFormState = Omit<RequestData, "consent"> & { consent: boolean };

const taskOptions = [
  "Копать траншею или котлован",
  "Погрузить и вывезти грунт",
  "Поднять или смонтировать груз",
  "Доставить и разгрузить материалы",
  "Выполнить работы на высоте",
  "Не знаю — нужен подбор",
];

const initialData: RequestFormState = {
  task: "",
  address: "",
  date: "",
  details: "",
  name: "",
  phone: "",
  consent: false,
};

export function RequestWizard({ initialEquipment }: { initialEquipment?: string }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<RequestFormState>({
    ...initialData,
    task: initialEquipment ? `Проверить технику: ${initialEquipment}` : "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const progress = useMemo(() => `${Math.round((step / 3) * 100)}%`, [step]);

  const update = <K extends keyof RequestFormState>(key: K, value: RequestFormState[K]) => {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const validateStep = () => {
    const nextErrors: Record<string, string> = {};
    if (step === 1 && data.task.trim().length < 2) nextErrors.task = "Выберите задачу";
    if (step === 2) {
      if (data.address.trim().length < 4) nextErrors.address = "Укажите район или адрес";
      if (!data.date) nextErrors.date = "Выберите дату";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep((value) => Math.min(3, value + 1));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const result = requestSchema.safeParse(data);
    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        nextErrors[String(issue.path[0])] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="surface-card grid min-h-[560px] place-items-center p-7 text-center sm:p-12" aria-live="polite">
        <div className="max-w-xl">
          <CircleCheckBig aria-hidden="true" className="mx-auto h-16 w-16 text-success" />
          <p className="mt-6 text-xs font-extrabold tracking-[0.12em] text-muted uppercase">Demo success state</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] sm:text-5xl">Заявка собрана, но никуда не отправлена</h2>
          <p className="mt-5 text-base leading-7 text-muted">
            Это безопасная демонстрация UX. В реальном проекте здесь появятся номер заявки, обещанный срок ответа и канал связи с диспетчером.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" className="btn-primary" onClick={() => { setSubmitted(false); setStep(1); setData(initialData); }}>
              Заполнить ещё раз
            </button>
            <Link href="/catalog" className="btn-secondary">Вернуться в каталог</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="surface-card overflow-hidden" noValidate>
      <div className="border-b border-line bg-white px-5 py-5 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-extrabold">Шаг {step} из 3</p>
          <p className="text-xs font-bold text-muted">Данные не отправляются</p>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-canvas" aria-hidden="true">
          <div className="h-full rounded-full bg-signal transition-[width]" style={{ width: progress }} />
        </div>
      </div>

      <div className="min-h-[440px] p-5 sm:p-8 lg:p-10">
        {step === 1 ? (
          <fieldset>
            <legend className="text-2xl font-extrabold tracking-[-0.035em] sm:text-4xl">Что нужно сделать на объекте?</legend>
            <p className="mt-3 text-sm leading-6 text-muted">Начните с результата — модель техники можно выбрать позже.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {taskOptions.map((option) => {
                const active = data.task === option;
                return (
                  <button
                    key={option}
                    type="button"
                    className={`flex min-h-[78px] items-center justify-between rounded-lg border p-4 text-left text-sm font-extrabold transition-colors ${active ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink"}`}
                    onClick={() => update("task", option)}
                  >
                    {option}
                    {active ? <Check aria-hidden="true" className="h-5 w-5 text-signal" /> : null}
                  </button>
                );
              })}
            </div>
            {errors.task ? <p className="mt-3 text-sm font-bold text-danger" role="alert">{errors.task}</p> : null}
          </fieldset>
        ) : null}

        {step === 2 ? (
          <fieldset>
            <legend className="text-2xl font-extrabold tracking-[-0.035em] sm:text-4xl">Где и когда нужна техника?</legend>
            <p className="mt-3 text-sm leading-6 text-muted">Адрес влияет на доставку, а условия площадки — на модель и установку.</p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="field-label sm:col-span-2">
                Район или адрес объекта
                <input className="field-control" aria-invalid={Boolean(errors.address)} value={data.address} onChange={(event) => update("address", event.target.value)} placeholder="Например, Калуга, Правобережье" />
                {errors.address ? <span className="text-sm text-danger" role="alert">{errors.address}</span> : null}
              </label>
              <label className="field-label">
                Желаемая дата
                <input className="field-control" type="date" aria-invalid={Boolean(errors.date)} value={data.date} onChange={(event) => update("date", event.target.value)} />
                {errors.date ? <span className="text-sm text-danger" role="alert">{errors.date}</span> : null}
              </label>
              <label className="field-label sm:col-span-2">
                Условия и объём работ <span className="font-medium text-muted">(необязательно)</span>
                <textarea className="field-control min-h-32 resize-y" value={data.details} onChange={(event) => update("details", event.target.value)} placeholder="Глубина траншеи, вес груза, ширина проезда, покрытие площадки…" />
              </label>
            </div>
          </fieldset>
        ) : null}

        {step === 3 ? (
          <fieldset>
            <legend className="text-2xl font-extrabold tracking-[-0.035em] sm:text-4xl">Куда вернуть расчёт?</legend>
            <p className="mt-3 text-sm leading-6 text-muted">В demo контакты валидируются только в браузере и не сохраняются.</p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="field-label">
                Имя
                <input className="field-control" autoComplete="name" aria-invalid={Boolean(errors.name)} value={data.name} onChange={(event) => update("name", event.target.value)} placeholder="Алексей" />
                {errors.name ? <span className="text-sm text-danger" role="alert">{errors.name}</span> : null}
              </label>
              <label className="field-label">
                Телефон
                <input className="field-control" inputMode="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} value={data.phone} onChange={(event) => update("phone", event.target.value)} placeholder="+7 900 000-00-00" />
                {errors.phone ? <span className="text-sm text-danger" role="alert">{errors.phone}</span> : null}
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line bg-white p-4 text-sm leading-6 sm:col-span-2">
                <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#141713]" checked={data.consent} onChange={(event) => update("consent", event.target.checked)} />
                <span>
                  Подтверждаю демонстрационное согласие. Понимаю, что форма не отправляет и не сохраняет данные. <Link href="/privacy" className="font-bold underline">Подробнее</Link>
                  {errors.consent ? <span className="mt-1 block font-bold text-danger" role="alert">{errors.consent}</span> : null}
                </span>
              </label>
            </div>
          </fieldset>
        ) : null}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <button type="button" className={`btn-secondary ${step === 1 ? "invisible" : ""}`} onClick={() => setStep((value) => Math.max(1, value - 1))}>
          <ChevronLeft aria-hidden="true" className="h-5 w-5" /> Назад
        </button>
        {step < 3 ? (
          <button type="button" className="btn-primary" onClick={next}>
            Продолжить <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        ) : (
          <button type="submit" className="btn-primary">Показать success state</button>
        )}
      </div>
    </form>
  );
}
