import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import chromiumBundle from "@sparticuz/chromium";
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright-core";

const qaPort = process.env.QA_PORT ?? "3000";
const baseUrl = process.env.QA_BASE_URL ?? `http://127.0.0.1:${qaPort}`;
const outputDir = path.resolve("artifacts/screenshots");
await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir("/tmp/techdelo-font-cache", { recursive: true });
process.env.XDG_CACHE_HOME = "/tmp/techdelo-font-cache";
chromiumBundle.setGraphicsMode = false;

let server;

function stopServer() {
  if (server && !server.killed) server.kill("SIGTERM");
}

async function waitForServer() {
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      if ((await fetch(baseUrl)).ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Production server did not become ready at ${baseUrl}`);
}

if (!process.env.QA_BASE_URL) {
  server = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", qaPort],
    {
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  let serverError = "";
  server.stderr.on("data", (chunk) => {
    serverError += chunk.toString();
  });

  await Promise.race([
    waitForServer(),
    new Promise((_, reject) => {
      server.once("exit", (code, signal) => {
        reject(new Error(`Production server exited before QA (code ${code}, signal ${signal})\n${serverError}`));
      });
    }),
  ]);
}

process.once("exit", stopServer);

async function resolveChromiumExecutable() {
  const originalGetuid = process.getuid;

  try {
    // tar-fs preserves archive ownership when Node runs as root. Some CI and
    // container filesystems reject chown even for root, so extract as the
    // current user instead; file permissions remain suitable for headless QA.
    if (typeof originalGetuid === "function" && originalGetuid() === 0) {
      process.getuid = () => -1;
    }
    return await chromiumBundle.executablePath();
  } finally {
    process.getuid = originalGetuid;
  }
}

const browser = await chromium.launch({
  executablePath: await resolveChromiumExecutable(),
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-dev-shm-usage",
    "--disable-gpu",
    "--disable-software-rasterizer",
    "--disable-background-networking",
  ],
  headless: true,
});

const issues = [];
const checks = [];

async function openPage(route, viewport) {
  const context = await browser.newContext({ viewport, locale: "ru-RU" });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") issues.push(`console ${route} ${viewport.width}: ${message.text()}`);
  });
  page.on("pageerror", (error) => issues.push(`pageerror ${route} ${viewport.width}: ${error.message}`));
  page.on("response", (response) => {
    if (response.status() >= 400 && response.url().startsWith(baseUrl)) {
      issues.push(`http ${response.status()} ${response.url()}`);
    }
  });
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
  if (!response?.ok()) issues.push(`navigation ${route}: ${response?.status() ?? "no response"}`);
  return { context, page };
}

async function screenshotPage(route, name, viewport) {
  const { context, page } = await openPage(route, viewport);
  const layout = await page.evaluate(() => ({
    viewport: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    title: document.title,
    h1: document.querySelector("h1")?.textContent?.trim() ?? "",
  }));
  if (layout.scrollWidth > layout.viewport + 1) {
    issues.push(`horizontal overflow ${route} ${viewport.width}: ${layout.scrollWidth}px`);
  }
  if (viewport.width === 390 || viewport.width === 1440) {
    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const blocking = accessibility.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    );
    for (const violation of blocking) {
      const samples = violation.nodes
        .slice(0, 4)
        .map((node) => `${node.target.join(" ")} (${node.failureSummary ?? "no summary"})`)
        .join("; ");
      issues.push(`a11y ${route} ${viewport.width}: ${violation.id} — ${violation.help}: ${samples}`);
    }
    checks.push({ route, name: `${name}-a11y`, violations: accessibility.violations.length, blocking: blocking.length });
  }
  await page.screenshot({ path: path.join(outputDir, `${name}.png`), fullPage: true });
  checks.push({ route, name, width: viewport.width, ...layout });
  await context.close();
}

for (const width of [360, 390, 768, 1440, 1920]) {
  await screenshotPage("/", `home-${width}`, { width, height: width < 768 ? 844 : 1000 });
}

await screenshotPage("/catalog", "catalog-desktop-1440", { width: 1440, height: 1000 });
await screenshotPage("/catalog/jcb-3cx", "equipment-desktop-1440", { width: 1440, height: 1000 });
await screenshotPage("/catalog/jcb-3cx", "equipment-mobile-390", { width: 390, height: 844 });

{
  const { context, page } = await openPage("/catalog", { width: 390, height: 844 });
  await page.getByRole("button", { name: "Фильтры", exact: true }).click();
  const filterDialog = page.getByRole("dialog");
  await filterDialog.waitFor();
  await page.screenshot({ path: path.join(outputDir, "mobile-filters-390.png"), fullPage: true });
  await filterDialog.getByLabel("Тип техники").selectOption("Автокран");
  await filterDialog.getByRole("button", { name: /Показать \d+/ }).click();
  const resultText = await page.getByText(/Найдено:/).textContent();
  if (!resultText?.includes("2 из 12")) issues.push(`catalog filter result: ${resultText}`);
  await page.screenshot({ path: path.join(outputDir, "catalog-mobile-390.png"), fullPage: true });
  checks.push({ route: "/catalog", name: "catalog-filter-flow", resultText });
  await context.close();
}

{
  const { context, page } = await openPage("/request", { width: 390, height: 844 });
  await page.getByRole("button", { name: /Продолжить/ }).click();
  await page.getByText("Выберите задачу").waitFor();
  await page.screenshot({ path: path.join(outputDir, "form-error-390.png"), fullPage: true });
  await page.getByRole("button", { name: "Не знаю — нужен подбор" }).click();
  await page.getByRole("button", { name: /Продолжить/ }).click();
  await page.getByLabel("Район или адрес объекта").fill("Калуга, Правобережье");
  await page.getByLabel("Желаемая дата").fill("2026-09-12");
  await page.getByRole("button", { name: /Продолжить/ }).click();
  await page.getByLabel("Имя").fill("Алексей");
  await page.getByLabel("Телефон").fill("+7 900 000-00-00");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Показать success state" }).click();
  await page.getByRole("heading", { name: "Заявка собрана, но никуда не отправлена" }).waitFor();
  await page.evaluate(() => (document.activeElement instanceof HTMLElement ? document.activeElement.blur() : undefined));
  await page.screenshot({ path: path.join(outputDir, "form-success-390.png"), fullPage: true });
  checks.push({ route: "/request", name: "validated-three-step-flow", passed: true });
  await context.close();
}

await browser.close();
stopServer();

const report = { baseUrl, generatedAt: new Date().toISOString(), checks, issues };
await fs.writeFile(path.resolve("artifacts/qa-report.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
if (issues.length) process.exitCode = 1;
