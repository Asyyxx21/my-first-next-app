import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getComment, getPost } from "@/lib/posts";

type CommentPageProps = {
  params: Promise<{ id: string; commentId: string }>;
};

export async function generateMetadata({
  params,
}: CommentPageProps): Promise<Metadata> {
  const { id, commentId } = await params;

  return {
    title: `Комментарий ${commentId} к посту ${id}`,
    description: "Вложенный динамический сегмент commentId.",
  };
}

export default async function CommentPage({ params }: CommentPageProps) {
  const { id, commentId } = await params;
  const post = getPost(id);

  if (!post) {
    notFound();
  }

  const comment = getComment(id, commentId);

  return (
    <article className="article comments-page">
      <Link className="back-link" href={`/blog/${id}`}>
        <span aria-hidden="true">←</span> К посту №{id}
      </Link>

      <p className="eyebrow">
        <span className="pulse-dot" aria-hidden="true" />
        /blog/[id]/comments/[commentId]
      </p>

      <h1>Комментарий {commentId}</h1>
      <p className="article-lead">
        К посту №{id}: «{post.title}»
      </p>

      <div className="comment-detail">
        <span className="comment-detail-label">
          {comment ? "Текст комментария" : "Комментарий без текста"}
        </span>
        {comment ? (
          <>
            <strong>{comment.author}</strong>
            <p>{comment.text}</p>
          </>
        ) : (
          <p>
            Для комментария с идентификатором {commentId} текст не сохранён.
            Маршрут всё равно работает и получает оба параметра.
          </p>
        )}
      </div>

      <div className="server-note">
        <strong>Параметры маршрута:</strong>{" "}
        <code>id = &quot;{id}&quot;</code>,{" "}
        <code>commentId = &quot;{commentId}&quot;</code>. Оба значения получены
        через <code>await params</code>.
      </div>

      <div className="check-actions">
        <Link className="button button-primary" href={`/blog/${id}`}>
          Вернуться к посту
        </Link>
        <Link className="button button-ghost" href="/blog/1/comments/5">
          Проверить /blog/1/comments/5
        </Link>
      </div>
    </article>
  );
}
