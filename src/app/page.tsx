import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  FileText,
  MapPinned,
  Route,
  ShieldCheck,
  Timer,
  Wrench,
} from "lucide-react";
import { EquipmentCard } from "@/components/equipment-card";
import { MobileCta } from "@/components/mobile-cta";
import { TaskLinks } from "@/components/task-links";
import { equipment } from "@/lib/equipment";
import { imageSources } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <section className="overflow-hidden border-b border-line bg-ink text-white">
        <div className="container-shell grid min-h-[760px] items-stretch lg:grid-cols-[1.08fr_0.92fr]">
          <div className="flex flex-col justify-between py-12 pr-0 sm:py-16 lg:py-20 lg:pr-12">
            <div>
              <div className="section-kicker !text-white/55">Калуга и область · до 120 км</div>
              <h1 className="display-title max-w-[900px]">
                Техника под задачу. <span className="text-signal">Цена и подача</span> — до выезда.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65 sm:text-xl">
                Сравните характеристики, минимальный заказ и стоимость смены.
                Если не знаете модель — опишите работу, подъезд и дату.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/catalog" className="btn-primary">
                  Выбрать технику <ArrowRight aria-hidden="true" className="h-5 w-5" />
                </Link>
                <Link href="/request" className="btn-secondary !border-white/25 !bg-white/5 !text-white hover:!border-white">
                  Подобрать по задаче
                </Link>
              </div>
            </div>
            <dl className="mt-14 grid grid-cols-3 gap-3 border-t border-white/15 pt-6">
              <div>
                <dt className="text-[11px] font-bold tracking-[0.08em] text-white/60 uppercase">Demo-парк</dt>
                <dd className="mt-2 text-xl font-extrabold sm:text-3xl">12 машин</dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold tracking-[0.08em] text-white/60 uppercase">Категории</dt>
                <dd className="mt-2 text-xl font-extrabold sm:text-3xl">8 типов</dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold tracking-[0.08em] text-white/60 uppercase">Заявка</dt>
                <dd className="mt-2 text-xl font-extrabold sm:text-3xl">3 шага</dd>
              </div>
            </dl>
          </div>
          <div className="relative min-h-[420px] overflow-hidden lg:min-h-full">
            <Image
              src={imageSources.hero}
              alt="Строительная площадка с тяжёлой техникой — демонстрационная фотография"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover saturate-[0.78]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/20 bg-ink/72 p-5 backdrop-blur-md sm:left-auto sm:w-[340px]">
              <div className="flex items-start gap-3">
                <CalendarCheck2 aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-signal" />
                <div>
                  <p className="font-extrabold">Сначала доступность, затем бронь</p>
                  <p className="mt-2 text-sm leading-6 text-white/60">Дата, адрес и условия площадки влияют на итоговый расчёт.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container-shell">
          <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <div className="section-kicker">Подбор от задачи</div>
              <h2 className="section-title">Не обязательно знать модель машины</h2>
            </div>
            <p className="body-lg max-w-2xl lg:justify-self-end">
              Выберите результат работы. Каталог покажет технику, для которой этот сценарий действительно предусмотрен.
            </p>
          </div>
          <div className="mt-10"><TaskLinks /></div>
        </div>
      </section>

      <section className="section-block border-y border-line bg-white/55">
        <div className="container-shell">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="section-kicker">Парк</div>
              <h2 className="section-title">Популярная техника</h2>
            </div>
            <Link href="/catalog" className="btn-secondary">Весь каталог <ArrowRight aria-hidden="true" className="h-5 w-5" /></Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {equipment.slice(0, 4).map((item, index) => <EquipmentCard key={item.slug} item={item} priority={index < 2} />)}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="section-kicker">Прозрачный расчёт</div>
            <h2 className="section-title">Не обещаем точность до осмотра. Показываем, из чего сложится цена.</h2>
            <p className="body-lg mt-6 max-w-xl">
              Почасовая ставка — только одна часть. На итог влияют минимум часов, зона подачи, навесное оборудование и условия площадки.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              { n: "01", title: "Работа и минимальный заказ", text: "В карточке видны ставка, минимальное время и ориентир за 8-часовую смену.", icon: Timer },
              { n: "02", title: "Подача по зоне", text: "Калуга, до 40 км и 40–120 км считаются отдельно. Для гусеничной техники учитывается трал.", icon: Route },
              { n: "03", title: "Оборудование и площадка", text: "Ковши, гидромолот, стропальщик, сложный подъезд и пропуска согласуются до брони.", icon: Wrench },
            ].map(({ n, title, text, icon: Icon }) => (
              <article key={n} className="surface-card grid gap-5 p-6 sm:grid-cols-[72px_1fr_48px] sm:items-start sm:p-8">
                <span className="text-3xl font-extrabold text-muted">{n}</span>
                <div>
                  <h3 className="text-2xl font-extrabold tracking-[-0.035em]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
                </div>
                <span className="grid h-12 w-12 place-items-center rounded-md bg-signal"><Icon aria-hidden="true" className="h-6 w-6" /></span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-ink text-white">
        <div className="container-shell grid lg:grid-cols-2">
          <div className="relative min-h-[460px] lg:min-h-[700px]">
            <Image src={imageSources.site} alt="Техника на строительной площадке — демонстрационная фотография" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover saturate-[0.78]" />
          </div>
          <div className="flex flex-col justify-center py-16 lg:p-16 xl:p-20">
            <div className="section-kicker !text-white/55">Условия fictional operator</div>
            <h2 className="section-title">Подходит и частной стройке, и снабжению B2B</h2>
            <div className="mt-9 grid gap-5">
              {[
                { title: "Договор и закрывающие документы", icon: FileText },
                { title: "Расчёт с НДС или без НДС", icon: ShieldCheck },
                { title: "Замена техники при неисправности", icon: Wrench },
                { title: "Маршрут и время подачи согласуются заранее", icon: MapPinned },
              ].map(({ title, icon: Icon }) => (
                <div key={title} className="flex items-center gap-4 border-b border-white/12 pb-5">
                  <Icon aria-hidden="true" className="h-6 w-6 shrink-0 text-signal" />
                  <p className="font-extrabold">{title}</p>
                </div>
              ))}
            </div>
            <p className="mt-7 text-sm leading-6 text-white/60">Все операционные характеристики в этом блоке — часть fictional business brief и не относятся к существующей компании.</p>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container-shell">
          <div className="surface-card overflow-hidden bg-signal !border-ink">
            <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_0.9fr] lg:p-14">
              <div>
                <div className="section-kicker !text-ink/75 before:!bg-ink">Подбор за 3 шага</div>
                <h2 className="section-title max-w-2xl">Опишите работу — интерфейс соберёт данные для расчёта</h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-ink-soft">Задача, адрес, дата и условия площадки. В demo заявка не отправляется и показывает только полноценное UI-состояние.</p>
                <Link href="/request" className="btn-dark mt-8">Подобрать технику <ArrowRight aria-hidden="true" className="h-5 w-5" /></Link>
              </div>
              <ol className="grid gap-3 self-center">
                {["Выберите тип работы", "Укажите объект и дату", "Получите рекомендованный следующий шаг"].map((text, index) => (
                  <li key={text} className="flex items-center gap-4 rounded-lg border border-ink/20 bg-white/45 p-4 font-extrabold">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-sm text-white">{index + 1}</span>
                    {text}
                    <CheckCircle2 aria-hidden="true" className="ml-auto h-5 w-5" />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
      <MobileCta />
    </>
  );
}
