import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ id: post.id }));
}

type BlogPostProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  const { id } = await params;
  const post = getPost(id);

  if (!post) {
    return { title: "Статья не найдена" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { id } = await params;
  const post = getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <article className="article blog-article">
      <Link className="back-link" href="/blog">
        <span aria-hidden="true">←</span> Все статьи
      </Link>

      <header className="article-header">
        <div className="article-meta">
          <span className="tag">{post.tag}</span>
          <span>ID: {post.id}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime}</span>
          <span aria-hidden="true">·</span>
          <span>{post.level}</span>
          <span className="ssg-badge">SSG</span>
        </div>
        <h1>{post.title}</h1>
        <p className="article-lead">{post.excerpt}</p>
      </header>

      <div className="article-body">
        {post.content.map((block, index) => {
          if (block.type === "heading") {
            return <h2 key={index}>{block.text}</h2>;
          }

          if (block.type === "list") {
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          }

          return <p key={index}>{block.text}</p>;
        })}
      </div>

      <section className="comments-block" aria-labelledby="comments-title">
        <div className="comments-head">
          <div>
            <p className="section-kicker">Вложенный динамический маршрут</p>
            <h2 id="comments-title">Комментарии</h2>
          </div>
          <span className="comments-route">
            /blog/{post.id}/comments/[commentId]
          </span>
        </div>

        <div className="comment-links">
          {post.comments.map((comment) => (
            <Link
              className="comment-link"
              href={`/blog/${post.id}/comments/${comment.id}`}
              key={comment.id}
            >
              <span className="comment-avatar" aria-hidden="true">
                {comment.author.slice(0, 1)}
              </span>
              <span className="comment-body">
                <span className="comment-author">{comment.author}</span>
                <span className="comment-text">{comment.text}</span>
              </span>
              <span className="comment-id">#{comment.id}</span>
            </Link>
          ))}
        </div>

        <Link className="text-link" href={`/blog/${post.id}/comments/5`}>
          Открыть комментарий 5 <span aria-hidden="true">→</span>
        </Link>
      </section>

      <footer className="article-footer">
        <span>
          Динамический сегмент <code>[id]</code>, параметр получен через{" "}
          <code>await params</code>
        </span>
        <Link className="text-link" href="/blog">
          Другие статьи <span aria-hidden="true">→</span>
        </Link>
      </footer>
    </article>
  );
}
