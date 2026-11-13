import type { Metadata } from "next";
import Link from "next/link";
import Counter from "./Counter";

export const metadata: Metadata = {
  title: "О нас",
  description:
    "Страница о проекте: Server Component, Client Component и карта маршрутов контрольной точки №1.",
};

type ProjectInfo = {
  title: string;
  description: string;
  heading: string;
  body: string;
  notes: string[];
  stack: string[];
};

async function getInfo(): Promise<ProjectInfo> {
  return {
    title: "О нас",
    description:
      "Учебный проект по маршрутизации Next.js App Router: статические и динамические страницы, вложенные layout’ы, template и навигация.",
    heading: "Маршруты, которые можно потрогать",
    body: "Эта страница — Server Component. Она получает данные на сервере и может использовать async/await напрямую, без useEffect и клиентского fetch. Остальные разделы показывают разные приёмы маршрутизации.",
    notes: [
      "Файловая маршрутизация: папка в app становится сегментом URL.",
      "Layout сохраняет состояние, template создаёт новый экземпляр.",
      "Вложенные динамические сегменты получают типизированный params.",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "App Router"],
  };
}

const routes = [
  {
    href: "/blog",
    title: "/blog",
    text: "Статический маршрут с вложенным layout",
  },
  {
    href: "/blog/1",
    title: "/blog/1",
    text: "Динамический сегмент [id]",
  },
  {
    href: "/blog/1/comments/5",
    title: "/blog/1/comments/5",
    text: "Два динамических сегмента: [id] и [commentId]",
  },
  {
    href: "/courses",
    title: "/courses",
    text: "Раздел с собственным layout",
  },
  {
    href: "/courses/nextjs-start",
    title: "/courses/nextjs-start",
    text: "Динамическая страница [courseId]",
  },
];

export default async function AboutPage() {
  const info = await getInfo();

  return (
    <div className="container">
      <section className="page-hero" aria-labelledby="about-title">
        <p className="eyebrow">
          <span className="pulse-dot" aria-hidden="true" />
          Server Component · /about
        </p>
        <h1 id="about-title">{info.title}</h1>
        <p className="page-lead">{info.description}</p>
      </section>

      <div className="about-grid">
        <section className="info-panel" aria-labelledby="about-info-title">
          <h2 id="about-info-title">{info.heading}</h2>
          <p>{info.body}</p>

          <ul className="info-list">
            {info.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>

          <div className="stack-list" aria-label="Технологии проекта">
            {info.stack.map((item) => (
              <span className="stack-item" key={item}>
                {item}
              </span>
            ))}
          </div>
        </section>

        <aside className="side-stack" aria-label="Интерактивный пример">
          <div className="server-note">
            <strong>Рендеринг на сервере.</strong> Функция getInfo вызывается
            при генерации страницы. В браузере остаётся готовая разметка и
            интерактивный компонент ниже.
          </div>
          <Counter />
        </aside>
      </div>

      <section className="section" aria-labelledby="routes-title">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Карта проекта</p>
            <h2 id="routes-title">Маршруты контрольной точки</h2>
          </div>
          <p className="section-lead">
            По ссылкам можно проверить статические, динамические и вложенные
            сегменты.
          </p>
        </div>

        <div className="route-grid">
          {routes.map((route) => (
            <Link className="route-card" href={route.href} key={route.href}>
              <code>{route.title}</code>
              <span>{route.text}</span>
              <span className="route-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="how-title">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Под капотом</p>
            <h2 id="how-title">Два вида компонентов</h2>
          </div>
          <p className="section-lead">
            Серверный компонент получает данные, клиентский — реагирует на
            действия пользователя.
          </p>
        </div>

        <div className="code-grid">
          <div className="code-card">
            <div className="code-card-header">
              <span>app/about/page.tsx</span>
              <span>server</span>
            </div>
            <pre>{`async function getInfo() {
  return { title: "О нас" };
}

export default async function AboutPage() {
  const info = await getInfo();
  return <h1>{info.title}</h1>;
}`}</pre>
          </div>

          <div className="code-card">
            <div className="code-card-header">
              <span>app/about/Counter.tsx</span>
              <span>client</span>
            </div>
            <pre>{`"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Кликов: {count}
    </button>
  );
}`}</pre>
          </div>
        </div>
      </section>
    </div>
  );
}
