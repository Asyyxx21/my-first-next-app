import type { ReactNode } from "react";
import Link from "next/link";
import MountStamp from "@/app/components/MountStamp";
import { posts } from "@/lib/posts";

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="container blog-shell">
      <aside className="blog-sidebar" aria-label="Навигация по блогу">
        <p className="section-kicker">Вложенный layout</p>
        <h2>Раздел «Блог»</h2>
        <p className="sidebar-text">
          Сайдбар относится к layout.tsx и сохраняется при переходах между
          статьями.
        </p>

        <div className="layout-proof">
          <MountStamp label="layout" />
          <span className="proof-note">не перемонтируется</span>
        </div>

        <nav className="sidebar-nav" aria-label="Статьи">
          <Link href="/blog">Все статьи</Link>
          {posts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id}>
              {post.id}. {post.title}
            </Link>
          ))}
        </nav>

        <Link className="sidebar-cta" href="/courses">
          Перейти к курсам <span aria-hidden="true">→</span>
        </Link>
      </aside>

      <div className="blog-content">{children}</div>
    </div>
  );
}
