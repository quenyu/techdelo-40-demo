import Link from "next/link";
import { ArrowRight, Construction, Container, Pickaxe, Ruler, Truck, Warehouse } from "lucide-react";
import type { TaskType } from "@/lib/equipment";

const tasks: { task: TaskType; label: string; help: string; icon: typeof Pickaxe }[] = [
  { task: "Копать и планировать", label: "Копать и планировать", help: "Траншея, котлован, участок", icon: Pickaxe },
  { task: "Работать в тесном месте", label: "Нужен узкий проезд", help: "Двор, склад, благоустройство", icon: Warehouse },
  { task: "Поднимать груз", label: "Поднять тяжёлый груз", help: "Монтаж, разгрузка, конструкции", icon: Construction },
  { task: "Работать на высоте", label: "Работать на высоте", help: "Фасад, кровля, электрика", icon: Ruler },
  { task: "Перевозить материалы", label: "Перевезти материалы", help: "Песок, щебень, оборудование", icon: Truck },
  { task: "Грузить и вывозить", label: "Погрузить и вывезти", help: "Грунт, мусор, расчистка", icon: Container },
];

export function TaskLinks() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map(({ task, label, help, icon: Icon }) => (
        <Link
          key={task}
          href={`/catalog?task=${encodeURIComponent(task)}`}
          className="group surface-card flex min-h-[128px] items-center gap-4 p-5 transition-colors hover:border-ink hover:bg-white"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-signal">
            <Icon aria-hidden="true" className="h-6 w-6" />
          </span>
          <span className="min-w-0 flex-1">
            <strong className="block text-base tracking-[-0.02em]">{label}</strong>
            <span className="mt-1 block text-sm leading-5 text-muted">{help}</span>
          </span>
          <ArrowRight aria-hidden="true" className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
        </Link>
      ))}
    </div>
  );
}
