import type { Metadata } from "next";

export const metadata: Metadata = { title: "Политика demo-формы", description: "Объяснение безопасного режима демонстрационной формы." };

export default function PrivacyPage() {
  return (
    <article className="section-block"><div className="container-shell max-w-4xl"><div className="section-kicker">Demo only</div><h1 className="section-title">Политика демонстрационной формы</h1><div className="mt-10 grid gap-7 text-base leading-8 text-ink-soft"><p><strong className="text-ink">Проект не является сайтом действующей компании.</strong> Поля имени, телефона, адреса и даты созданы для демонстрации UX, validation и success state.</p><p>Введённые значения остаются только в памяти текущей вкладки браузера. Сайт не отправляет их на сервер, в CRM, аналитику, email или сторонние сервисы. После обновления страницы данные исчезают.</p><p>В коммерческом проекте до запуска формы потребовались бы реальный оператор персональных данных, юридически корректные документы, согласованный маршрут данных, российская инфраструктура хранения там, где это требуется, и проверка специалистом.</p><p>Используйте вымышленные значения при тестировании.</p></div></div></article>
  );
}
