import { imageSources } from "./site";

export const equipmentTypes = [
  "Экскаватор-погрузчик",
  "Гусеничный экскаватор",
  "Мини-экскаватор",
  "Погрузчик",
  "Автокран",
  "Манипулятор",
  "Автовышка",
  "Самосвал",
] as const;

export const taskTypes = [
  "Копать и планировать",
  "Работать в тесном месте",
  "Поднимать груз",
  "Работать на высоте",
  "Перевозить материалы",
  "Грузить и вывозить",
] as const;

export type EquipmentType = (typeof equipmentTypes)[number];
export type TaskType = (typeof taskTypes)[number];

export type Spec = {
  label: string;
  value: string;
};

export type Equipment = {
  slug: string;
  name: string;
  model: string;
  type: EquipmentType;
  short: string;
  priceHour: number;
  minHours: number;
  shiftPrice: number;
  image: string;
  imagePosition?: string;
  tasks: TaskType[];
  specs: Spec[];
  features: string[];
  delivery: string;
};

export const equipment: Equipment[] = [
  {
    slug: "jcb-3cx",
    name: "Экскаватор-погрузчик",
    model: "JCB 3CX",
    type: "Экскаватор-погрузчик",
    short: "Универсальная машина для траншей, планировки и погрузки.",
    priceHour: 3200,
    minHours: 4,
    shiftPrice: 25600,
    image: imageSources.foundation,
    tasks: ["Копать и планировать", "Грузить и вывозить"],
    specs: [
      { label: "Глубина копания", value: "до 5,46 м" },
      { label: "Погрузочный ковш", value: "1,0 м³" },
      { label: "Масса", value: "8,1 т" },
      { label: "Навесное", value: "ковши / гидромолот" },
    ],
    features: ["Оператор и топливо включены", "Ковши 30/40/60 см по задаче", "Можно заказать гидромолот"],
    delivery: "Подача по Калуге рассчитывается по зоне объекта.",
  },
  {
    slug: "cat-320",
    name: "Гусеничный экскаватор",
    model: "CAT 320",
    type: "Гусеничный экскаватор",
    short: "Котлованы, большие объёмы грунта и тяжёлые земляные работы.",
    priceHour: 4900,
    minHours: 8,
    shiftPrice: 39200,
    image: imageSources.excavator,
    tasks: ["Копать и планировать", "Грузить и вывозить"],
    specs: [
      { label: "Глубина копания", value: "до 6,72 м" },
      { label: "Ковш", value: "1,2 м³" },
      { label: "Масса", value: "22,5 т" },
      { label: "Ширина", value: "2,98 м" },
    ],
    features: ["Для больших объёмов", "Перевозка тралом", "Смена от 8 часов"],
    delivery: "Трал и маршрут согласуются отдельно до бронирования.",
  },
  {
    slug: "kubota-u55",
    name: "Мини-экскаватор",
    model: "Kubota U55-4",
    type: "Мини-экскаватор",
    short: "Для дворов, благоустройства и участков с ограниченным проездом.",
    priceHour: 2500,
    minHours: 4,
    shiftPrice: 20000,
    image: imageSources.mini,
    tasks: ["Работать в тесном месте", "Копать и планировать"],
    specs: [
      { label: "Глубина копания", value: "до 3,63 м" },
      { label: "Ширина", value: "1,96 м" },
      { label: "Масса", value: "5,4 т" },
      { label: "Ковши", value: "30 / 45 / 60 см" },
    ],
    features: ["Резиновые гусеницы", "Компактный поворот", "Перевозка эвакуатором"],
    delivery: "Доставка рассчитывается отдельно по километражу.",
  },
  {
    slug: "volvo-l90h",
    name: "Фронтальный погрузчик",
    model: "Volvo L90H",
    type: "Погрузчик",
    short: "Погрузка грунта и материалов, планировка площадки, уборка.",
    priceHour: 3900,
    minHours: 4,
    shiftPrice: 31200,
    image: imageSources.site,
    tasks: ["Грузить и вывозить", "Копать и планировать"],
    specs: [
      { label: "Объём ковша", value: "2,7 м³" },
      { label: "Грузоподъёмность", value: "5,5 т" },
      { label: "Масса", value: "15,5 т" },
      { label: "Высота выгрузки", value: "до 3,8 м" },
    ],
    features: ["Для сыпучих материалов", "Высокая производительность", "Работа на площадке"],
    delivery: "Подача и при необходимости трал — отдельной строкой.",
  },
  {
    slug: "galichanin-25",
    name: "Автокран 25 тонн",
    model: "Галичанин КС-55713",
    type: "Автокран",
    short: "Монтаж конструкций, разгрузка фур и подача материалов.",
    priceHour: 3600,
    minHours: 4,
    shiftPrice: 28800,
    image: imageSources.crane,
    tasks: ["Поднимать груз"],
    specs: [
      { label: "Грузоподъёмность", value: "25 т" },
      { label: "Длина стрелы", value: "28 м" },
      { label: "Вылет", value: "до 24 м" },
      { label: "Колёсная формула", value: "6×6" },
    ],
    features: ["Кран-вездеход", "Оператор включён", "ППР и стропальщик — по запросу"],
    delivery: "Подача зависит от района, пропусков и времени работ.",
  },
  {
    slug: "xcmg-32",
    name: "Автокран 32 тонны",
    model: "XCMG QY32K5",
    type: "Автокран",
    short: "Увеличенная стрела для монтажа и подъёма на высоту.",
    priceHour: 4400,
    minHours: 4,
    shiftPrice: 35200,
    image: imageSources.hero,
    tasks: ["Поднимать груз"],
    specs: [
      { label: "Грузоподъёмность", value: "32 т" },
      { label: "Длина стрелы", value: "40 м" },
      { label: "Высота подъёма", value: "до 42 м" },
      { label: "Масса", value: "32,4 т" },
    ],
    features: ["Телескопическая стрела", "Смена от 4 часов", "Расчёт по схеме груза"],
    delivery: "Нужны вес груза, радиус и условия установки опор.",
  },
  {
    slug: "kamaz-kanglim",
    name: "Кран-манипулятор",
    model: "КамАЗ 43118 + Kanglim",
    type: "Манипулятор",
    short: "Перевезти и разгрузить стройматериалы одной машиной.",
    priceHour: 3400,
    minHours: 4,
    shiftPrice: 27200,
    image: imageSources.fleet,
    tasks: ["Перевозить материалы", "Поднимать груз"],
    specs: [
      { label: "Грузоподъёмность борта", value: "10 т" },
      { label: "Стрела", value: "7 т" },
      { label: "Вылет стрелы", value: "до 19 м" },
      { label: "Длина борта", value: "6,8 м" },
    ],
    features: ["Полный привод", "Стропы в комплекте", "Погрузка и перевозка"],
    delivery: "При межгороде расчёт: километраж + работа на объекте.",
  },
  {
    slug: "isuzu-22",
    name: "Автовышка 22 метра",
    model: "Isuzu Elf АГП-22",
    type: "Автовышка",
    short: "Фасады, вывески, электромонтаж и обслуживание кровли.",
    priceHour: 2900,
    minHours: 4,
    shiftPrice: 23200,
    image: imageSources.crane,
    tasks: ["Работать на высоте"],
    specs: [
      { label: "Рабочая высота", value: "22 м" },
      { label: "Боковой вылет", value: "12 м" },
      { label: "Корзина", value: "до 250 кг" },
      { label: "Габарит по ширине", value: "2,2 м" },
    ],
    features: ["Изолированная люлька", "Компактное шасси", "Оператор включён"],
    delivery: "Для центра Калуги заранее уточняем место установки и ограничения.",
  },
  {
    slug: "daewoo-30",
    name: "Автовышка 30 метров",
    model: "Daewoo Novus АГП-30",
    type: "Автовышка",
    short: "Высотные работы на промышленных и многоэтажных объектах.",
    priceHour: 3600,
    minHours: 4,
    shiftPrice: 28800,
    image: imageSources.hero,
    tasks: ["Работать на высоте"],
    specs: [
      { label: "Рабочая высота", value: "30 м" },
      { label: "Боковой вылет", value: "16 м" },
      { label: "Корзина", value: "до 300 кг" },
      { label: "Опоры", value: "4 выносные" },
    ],
    features: ["Для фасадов и монтажа", "Работа с оператором", "Нужна площадка под опоры"],
    delivery: "Ограничения проезда и место установки проверяются до подачи.",
  },
  {
    slug: "kamaz-6520",
    name: "Самосвал 20 м³",
    model: "КамАЗ 6520",
    type: "Самосвал",
    short: "Вывоз грунта и мусора, доставка песка, щебня и ПГС.",
    priceHour: 3100,
    minHours: 4,
    shiftPrice: 24800,
    image: imageSources.site,
    tasks: ["Перевозить материалы", "Грузить и вывозить"],
    specs: [
      { label: "Объём кузова", value: "20 м³" },
      { label: "Грузоподъёмность", value: "20 т" },
      { label: "Тип разгрузки", value: "задняя" },
      { label: "Колёсная формула", value: "6×4" },
    ],
    features: ["Рейсы или почасовая работа", "Тент по запросу", "Документы на вывоз"],
    delivery: "Цена зависит от маршрута, материала и количества рейсов.",
  },
  {
    slug: "shacman-x3000",
    name: "Самосвал 25 м³",
    model: "Shacman X3000",
    type: "Самосвал",
    short: "Большие объёмы грунта и инертных материалов.",
    priceHour: 3400,
    minHours: 4,
    shiftPrice: 27200,
    image: imageSources.fleet,
    tasks: ["Перевозить материалы", "Грузить и вывозить"],
    specs: [
      { label: "Объём кузова", value: "25 м³" },
      { label: "Грузоподъёмность", value: "25 т" },
      { label: "Колёсная формула", value: "6×4" },
      { label: "Кузов", value: "обогреваемый" },
    ],
    features: ["Для крупных объёмов", "Почасово или по рейсам", "Безналичная оплата"],
    delivery: "Маршрут и полигон согласуются до расчёта.",
  },
  {
    slug: "bobcat-s650",
    name: "Мини-погрузчик",
    model: "Bobcat S650",
    type: "Погрузчик",
    short: "Компактная погрузка, расчистка и работа во дворах.",
    priceHour: 2600,
    minHours: 4,
    shiftPrice: 20800,
    image: imageSources.mini,
    imagePosition: "center 62%",
    tasks: ["Работать в тесном месте", "Грузить и вывозить"],
    specs: [
      { label: "Ширина", value: "1,83 м" },
      { label: "Ковш", value: "0,74 м³" },
      { label: "Грузоподъёмность", value: "1,2 т" },
      { label: "Навесное", value: "щётка / вилы / ковш" },
    ],
    features: ["Разворот на месте", "Для дворов и складов", "Навесное по задаче"],
    delivery: "Привозим эвакуатором; стоимость зависит от зоны.",
  },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value);

export const getEquipmentBySlug = (slug: string) =>
  equipment.find((item) => item.slug === slug);

export type CatalogFilters = {
  query?: string;
  type?: EquipmentType | "Все";
  task?: TaskType | "Все";
  maxPrice?: number;
  maxMinHours?: number;
};

export function filterEquipment(items: Equipment[], filters: CatalogFilters) {
  const query = filters.query?.trim().toLocaleLowerCase("ru-RU") ?? "";
  return items.filter((item) => {
    const matchesQuery =
      !query ||
      `${item.name} ${item.model} ${item.short} ${item.features.join(" ")} ${item.specs.map((spec) => `${spec.label} ${spec.value}`).join(" ")}`
        .toLocaleLowerCase("ru-RU")
        .includes(query);
    const matchesType =
      !filters.type || filters.type === "Все" || item.type === filters.type;
    const matchesTask =
      !filters.task || filters.task === "Все" || item.tasks.includes(filters.task);
    const matchesPrice = !filters.maxPrice || item.priceHour <= filters.maxPrice;
    const matchesMinHours =
      !filters.maxMinHours || item.minHours <= filters.maxMinHours;
    return (
      matchesQuery &&
      matchesType &&
      matchesTask &&
      matchesPrice &&
      matchesMinHours
    );
  });
}
