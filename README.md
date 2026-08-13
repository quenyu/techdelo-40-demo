# ТЕХДЕЛО 40

Commercial-grade concept/demo сайта вымышленного регионального оператора аренды спецтехники в Калуге.

Production deployment: [techdelo-40-demo](https://techdelo-40-demo-malafarida78755z0x-6859s-projects.vercel.app). На момент handoff URL находится под account-level Vercel Deployment Protection; это отмечено как внешний deployment blocker.

> **Concept / Demo Project.** Это не сайт реальной компании и не оплаченный клиентский кейс. Контакты, парк, цены и условия демонстрационные. Формы валидируются только в браузере и ничего не отправляют.

## Что реализовано

- каталог из 12 демонстрационных единиц техники;
- фильтры по типу машины, задаче, цене и минимальному заказу;
- полноценные detail pages с характеристиками, условиями и доставкой;
- альтернативный flow «не знаю, какая техника нужна»;
- desktop и mobile navigation, mobile filter sheet и sticky CTA;
- локальная form validation и честные error/success states;
- metadata, OpenGraph image, favicon, sitemap и robots;
- reduced-motion, keyboard focus и семантическая разметка;
- unit tests бизнес-логики каталога и формы.

## Стек

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Zod, Vitest, Lucide.

## Локальный запуск

```bash
npm install
npm run dev
```

Полный quality gate и production browser-QA:

```bash
npm run qa
npm run qa:browser
```

`qa:browser` самостоятельно поднимает production build и проверяет ключевые страницы, формы, responsive-состояния и WCAG через axe. Для проверки уже развёрнутого сайта можно передать `QA_BASE_URL`.

Те же проверки автоматически выполняются в GitHub Actions для pull request и каждого push в `main`.

## Документация

- [Конкурентное исследование](docs/competitive-research.md)
- [Product brief](docs/product-brief.md)
- [Sitemap и UX-flow](docs/sitemap-ux.md)
- [Portfolio case draft](docs/portfolio-case.md)
- [QA и Lighthouse](docs/qa-report.md)

Portfolio-ready screenshots лежат в `artifacts/screenshots`. Сырые Lighthouse JSON-отчёты — в `artifacts/lighthouse`.

## Изображения

Фотографии использованы по [Unsplash License](https://unsplash.com/license). Основной cohesive set — [Vadym Alyekseyenko](https://unsplash.com/@vadymalyekseyenko); дополнительный кадр — [John Kakuk](https://unsplash.com/@jkakuk). Ссылки на авторов также сохранены в футере сайта.

## Ограничения

- backend и отправка заявок намеренно отсутствуют;
- editable Figma-файл создан, но запись design system остановлена внешним MCP-лимитом Starter-плана и поэтому не заявляется как готовая;
- текущий проект не имеет open-source лицензии;
- любые показатели бизнеса или роста конверсии не заявляются.
