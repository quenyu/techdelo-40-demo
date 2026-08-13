# QA report

Дата: 13 августа 2026 года.

## Автоматические проверки

| Проверка | Результат |
|---|---:|
| ESLint | Passed |
| TypeScript | Passed |
| Vitest | 6 / 6 passed |
| Next.js production build | Passed, 26 routes generated |
| Browser console / page errors | 0 |
| HTTP errors на проверенных маршрутах | 0 |
| axe WCAG A/AA blocking violations | 0 |

## Responsive matrix

Проверены Home на 360, 390, 768, 1440 и 1920 px; Catalog и Equipment detail — desktop/mobile. На всех точках `documentElement.scrollWidth` совпал с viewport: горизонтального overflow нет.

Интерактивные сценарии:

- mobile filter sheet открывается и закрывается;
- фильтр `Автокран` возвращает 2 из 12 единиц;
- трёхшаговая форма показывает ошибку пустого шага;
- задача, адрес, дата, имя, телефон и consent проходят validation;
- success-state явно сообщает, что заявка не отправлена.

Машиночитаемый отчёт: `artifacts/qa-report.json`.

## Lighthouse

| Form factor | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Mobile | 90 | 100 | 100 | 100 |
| Desktop | 100 | 100 | 100 | 100 |

Сырые отчёты: `artifacts/lighthouse/home-mobile.json`, `artifacts/lighthouse/home-desktop.json`.

## Screenshot set

- Home: 360 / 390 / 768 / 1440 / 1920;
- Catalog: desktop 1440, mobile 390, mobile filter sheet;
- Equipment detail: desktop 1440, mobile 390;
- Request flow: mobile error и success states.
