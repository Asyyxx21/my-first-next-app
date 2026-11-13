import Link from "next/link";
import { courses } from "@/lib/courses";
import { posts } from "@/lib/posts";

const features = [
  {
    index: "01",
    title: "Файловая маршрутизация",
    text: "Структура папок в app автоматически становится картой сайта. Каждый page.tsx — отдельный маршрут.",
    code: "app/blog/[id]/page.tsx → /blog/1",
  },
  {
    index: "02",
    title: "Layouts и Templates",
    text: "layout сохраняет состояние при переходах, а template создаёт новый экземпляр и перезапускает анимацию.",
    code: "app/blog/layout.tsx + template.tsx",
  },
  {
    index: "03",
    title: "Динамические сегменты",
    text: "Папки [id] и [commentId] обслуживают множество URL, а params приходит асинхронно.",
    code: "params: Promise<{ id: string }>",
  },
];

export default function HomePage() {
  return (
    <div className="container">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="pulse-dot" aria-hidden="true" />
            Контрольная точка №1 · App Router
          </p>

          <h1 id="hero-title">
            Маршрутизация и{" "}
            <span className="gradient-text">Layouts</span>
          </h1>

          <p className="hero-lead">
            Многостраничный проект на Next.js: статические и динамические
            маршруты, клиентская навигация, вложенные layout’ы, template и
            раздел «Курсы».
          </p>

          <div className="hero-actions">
            <Link className="button button-primary" href="/blog">
              Открыть блог <span aria-hidden="true">→</span>
            </Link>
            <Link className="button button-ghost" href="/courses">
              Смотреть курсы
            </Link>
          </div>

          <ul className="hero-facts" aria-label="Ключевые особенности проекта">
            <li>3 статьи</li>
            <li>3 курса</li>
            <li>layout + template</li>
            <li>API Route</li>
          </ul>
        </div>

        <aside className="hero-card" aria-label="Структура проекта">
          <div className="window-bar" aria-hidden="true">
            <span className="window-dot" />
            <span className="window-dot" />
            <span className="window-dot" />
          </div>
          <pre className="file-tree">{`app/
├─ layout.tsx          # общий каркас
├─ page.tsx            # /
├─ about/page.tsx      # /about
├─ blog/
│  ├─ layout.tsx       # сохраняется
│  ├─ template.tsx     # перемонтируется
│  ├─ page.tsx         # /blog
│  └─ [id]/
│     ├─ page.tsx      # /blog/1
│     └─ comments/
│        └─ [commentId]/
│           └─ page.tsx
├─ courses/
│  ├─ layout.tsx
│  ├─ page.tsx         # /courses
│  └─ [courseId]/
│     └─ page.tsx
└─ api/hello/route.ts`}</pre>
          <div className="hero-card-footer">
            <span className="status-dot" aria-hidden="true" />
            File-based routing · App Router
          </div>
        </aside>
      </section>

      <section className="section" aria-labelledby="features-title">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Что внутри</p>
            <h2 id="features-title">Три базовые концепции</h2>
          </div>
          <p className="section-lead">
            Каждая идея контрольной точки — в отдельном маршруте.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.index}>
              <span className="feature-index">{feature.index}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
              <code className="feature-code">{feature.code}</code>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="articles-title">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Мини-блог</p>
            <h2 id="articles-title">Статьи</h2>
          </div>
          <Link className="text-link" href="/blog">
            Все статьи <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="post-list">
          {posts.map((post, index) => (
            <Link
              className="post-card"
              href={`/blog/${post.id}`}
              key={post.id}
            >
              <div className="post-card-top">
                <span className="tag">{post.tag}</span>
                <span className="post-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="post-meta">
                <span>
                  {post.readingTime} · {post.level}
                </span>
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="courses-title">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Раздел с layout</p>
            <h2 id="courses-title">Курсы</h2>
          </div>
          <Link className="text-link" href="/courses">
            Все курсы <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="course-grid">
          {courses.map((course, index) => (
            <Link
              className="course-card"
              href={`/courses/${course.slug}`}
              key={course.slug}
            >
              <div className="course-card-top">
                <span className="course-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="tag">{course.level}</span>
              </div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-card-footer">
                <span>{course.duration}</span>
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="api-title">
        <div className="api-banner">
          <div>
            <p className="section-kicker">Route Handler</p>
            <h2 id="api-title">API внутри проекта</h2>
            <p>
              Файл <code>app/api/hello/route.ts</code> экспортирует функцию
              GET и возвращает JSON. Отдельный сервер для этого не нужен.
            </p>
          </div>
          <a
            className="button button-ghost"
            href="/api/hello"
            target="_blank"
            rel="noreferrer"
          >
            Открыть JSON <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}
