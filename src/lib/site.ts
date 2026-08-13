export const siteConfig = {
  name: "ТЕХДЕЛО 40",
  shortName: "ТЕХДЕЛО",
  description:
    "Демонстрационный сайт регионального оператора аренды спецтехники в Калуге и Калужской области.",
  url: "https://techdelo-40-demo-malafarida78755z0x-6859s-projects.vercel.app",
  phoneDisplay: "+7 (4842) 000-00-00 · demo",
  phoneHref: "/request",
  email: "request@techdelo40.demo",
  workHours: "Ежедневно, 07:00–21:00",
  address: "Калуга, Правобережный проезд, 12 — демонстрационный адрес",
  radius: "Калуга и область, до 120 км",
} as const;

export const navItems = [
  { href: "/catalog", label: "Каталог" },
  { href: "/services", label: "Услуги" },
  { href: "/delivery", label: "Доставка" },
  { href: "/about", label: "О компании" },
  { href: "/contacts", label: "Контакты" },
] as const;

export const imageSources = {
  hero:
    "https://images.unsplash.com/photo-1783753444846-26548b5f3a2a?auto=format&fit=crop&q=82&w=2400",
  foundation:
    "https://images.unsplash.com/photo-1783753444935-9df439c6b9af?auto=format&fit=crop&q=82&w=1800",
  mini:
    "https://images.unsplash.com/photo-1783753444858-1770d34fb833?auto=format&fit=crop&q=82&w=1600",
  crane:
    "https://images.unsplash.com/photo-1783753445010-649fd2340834?auto=format&fit=crop&q=82&w=1800",
  site:
    "https://images.unsplash.com/photo-1783753445192-c06e11b38b54?auto=format&fit=crop&q=82&w=1800",
  fleet:
    "https://images.unsplash.com/photo-1783753445287-4ce8ef207492?auto=format&fit=crop&q=82&w=1800",
  excavator:
    "https://images.unsplash.com/photo-1751054770504-c69daeec4721?auto=format&fit=crop&q=82&w=1800",
} as const;
