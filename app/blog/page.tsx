import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Блог",
  description:
    "Раздел блога с вложенным layout, template и динамическими маршрутами /blog/[id].",
};

export default function BlogPage() {
  return (
    <>
      <section className="page-hero blog-page-hero" aria-labelledby="blog-title">
        <p className="eyebrow">
          <span className="pulse-dot" aria-hidden="true" />
          Статический маршрут · /blog
        </p>
        <h1 id="blog-title">Блог</h1>
        <p className="page-lead">
          Три статьи доступны по адресу <code>/blog/&lt;id&gt;</code>. Раздел
          обёрнут вложенным <code>layout.tsx</code>, а <code>template.tsx</code>{" "}
          создаёт новый экземпляр при каждом переходе.
        </p>
      </section>

      <div className="blog-list">
        {posts.map((post, index) => (
          <Link
            className="blog-row"
            href={`/blog/${post.id}`}
            key={post.id}
          >
            <span className="blog-number">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="blog-copy">
              <span className="tag">{post.tag}</span>
              <span className="blog-title">{post.title}</span>
              <span className="blog-excerpt">{post.excerpt}</span>
            </span>
            <span className="blog-meta">
              {post.readingTime}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </span>
          </Link>
        ))}
      </div>

      <section className="check-panel" aria-labelledby="check-title">
        <p className="section-kicker">Проверка работы</p>
        <h2 id="check-title">Как увидеть разницу layout и template</h2>
        <ol className="check-list">
          <li>
            Запомните значение метки <strong>layout</strong> в сайдбаре.
          </li>
          <li>
            Перейдите в статью, например{" "}
            <Link href="/blog/1">/blog/1</Link>.
          </li>
          <li>
            Метка layout останется прежней, а метка template и её случайный
            идентификатор изменятся.
          </li>
          <li>
            В консоли браузера появится запись{" "}
            <code>BlogTemplate смонтирован заново</code>.
          </li>
        </ol>

        <div className="check-actions">
          <Link className="button button-primary" href="/blog/1">
            Открыть /blog/1 <span aria-hidden="true">→</span>
          </Link>
          <Link className="button button-ghost" href="/blog/1/comments/5">
            Вложенный комментарий
          </Link>
        </div>
      </section>
    </>
  );
}
