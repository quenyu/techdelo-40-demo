"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { EquipmentCard } from "@/components/equipment-card";
import {
  Equipment,
  EquipmentType,
  TaskType,
  equipmentTypes,
  filterEquipment,
  taskTypes,
} from "@/lib/equipment";

type CatalogClientProps = {
  items: Equipment[];
  initialTask?: string;
};

export function CatalogClient({ items, initialTask }: CatalogClientProps) {
  const validInitialTask = taskTypes.includes(initialTask as TaskType)
    ? (initialTask as TaskType)
    : "Все";
  const [query, setQuery] = useState("");
  const [type, setType] = useState<EquipmentType | "Все">("Все");
  const [task, setTask] = useState<TaskType | "Все">(validInitialTask);
  const [maxPrice, setMaxPrice] = useState(6000);
  const [maxMinHours, setMaxMinHours] = useState(8);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(
    () => filterEquipment(items, { query, type, task, maxPrice, maxMinHours }),
    [items, query, type, task, maxPrice, maxMinHours],
  );

  const reset = () => {
    setQuery("");
    setType("Все");
    setTask("Все");
    setMaxPrice(6000);
    setMaxMinHours(8);
  };

  const filterFields = (
    <>
      <label className="field-label">
        Тип техники
        <select
          className="field-control"
          value={type}
          onChange={(event) => setType(event.target.value as EquipmentType | "Все")}
        >
          <option>Все</option>
          {equipmentTypes.map((value) => <option key={value}>{value}</option>)}
        </select>
      </label>
      <label className="field-label">
        Задача
        <select
          className="field-control"
          value={task}
          onChange={(event) => setTask(event.target.value as TaskType | "Все")}
        >
          <option>Все</option>
          {taskTypes.map((value) => <option key={value}>{value}</option>)}
        </select>
      </label>
      <label className="field-label">
        Цена до {new Intl.NumberFormat("ru-RU").format(maxPrice)} ₽/час
        <input
          type="range"
          min="2500"
          max="6000"
          step="100"
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
          className="h-12 w-full accent-[#141713]"
        />
      </label>
      <fieldset>
        <legend className="mb-2 text-sm font-bold">Минимальный заказ</legend>
        <div className="grid grid-cols-2 gap-2">
          {[4, 8].map((hours) => (
            <button
              key={hours}
              type="button"
              className={`min-h-12 rounded-md border px-3 text-sm font-bold ${maxMinHours === hours ? "border-ink bg-ink text-white" : "border-line bg-white"}`}
              onClick={() => setMaxMinHours(hours)}
            >
              до {hours} ч
            </button>
          ))}
        </div>
      </fieldset>
      <button type="button" className="btn-secondary w-full" onClick={reset}>
        Сбросить фильтры
      </button>
    </>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[290px_1fr]">
      <aside className="hidden self-start rounded-xl border border-line bg-surface p-5 lg:sticky lg:top-24 lg:grid lg:gap-5" aria-label="Фильтры каталога">
        <div className="flex items-center gap-2 border-b border-line pb-4">
          <SlidersHorizontal aria-hidden="true" className="h-5 w-5" />
          <h2 className="font-extrabold">Фильтры</h2>
        </div>
        {filterFields}
      </aside>

      <div>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Поиск по каталогу</span>
            <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <input
              className="field-control pl-12"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Например, JCB, кран или траншея"
            />
          </label>
          <div className="lg:hidden">
            <button type="button" className="btn-secondary w-full" onClick={() => setFiltersOpen(true)}>
              <SlidersHorizontal aria-hidden="true" className="h-5 w-5" />
              Фильтры
            </button>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="text-sm font-bold text-muted" aria-live="polite">
            Найдено: {filtered.length} из {items.length}
          </p>
          {task !== "Все" ? (
            <button type="button" className="inline-flex min-h-10 items-center gap-2 text-sm font-bold underline decoration-line underline-offset-4" onClick={() => setTask("Все")}>
              {task} <X aria-hidden="true" className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        {filtered.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((item) => <EquipmentCard key={item.slug} item={item} />)}
          </div>
        ) : (
          <div className="surface-card grid min-h-[340px] place-items-center p-8 text-center">
            <div>
              <p className="text-2xl font-extrabold tracking-[-0.04em]">По этим условиям ничего не найдено</p>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted">
                Снимите часть фильтров или опишите задачу — в реальном проекте диспетчер предложил бы подходящую замену.
              </p>
              <button type="button" className="btn-primary mt-6" onClick={reset}>Показать весь парк</button>
            </div>
          </div>
        )}
      </div>

      {filtersOpen ? (
        <div className="fixed inset-0 z-[70] bg-ink/45 lg:hidden" role="dialog" aria-modal="true" aria-labelledby="filter-title">
          <div className="absolute inset-x-0 bottom-0 max-h-[88dvh] overflow-y-auto rounded-t-[24px] bg-surface p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
              <h2 id="filter-title" className="text-xl font-extrabold">Фильтры каталога</h2>
              <button type="button" className="grid h-12 w-12 place-items-center rounded-md border border-line bg-white" aria-label="Закрыть фильтры" onClick={() => setFiltersOpen(false)}>
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="grid gap-5">{filterFields}</div>
            <button type="button" className="btn-primary sticky bottom-0 mt-5 w-full" onClick={() => setFiltersOpen(false)}>
              Показать {filtered.length}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
