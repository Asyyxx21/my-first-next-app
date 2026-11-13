import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { courses, getCourse } from "@/lib/courses";

export const dynamicParams = false;

export function generateStaticParams() {
  return courses.map((course) => ({ courseId: course.slug }));
}

type CoursePageProps = {
  params: Promise<{ courseId: string }>;
};

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { courseId } = await params;
  const course = getCourse(courseId);

  if (!course) {
    return { title: "Курс не найден" };
  }

  return {
    title: course.title,
    description: course.description,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  const course = getCourse(courseId);

  if (!course) {
    notFound();
  }

  return (
    <article className="course-detail">
      <Link className="back-link" href="/courses">
        <span aria-hidden="true">←</span> Все курсы
      </Link>

      <header className="course-detail-header">
        <div className="article-meta">
          <span className="tag">{course.level}</span>
          <span>{course.duration}</span>
          <span className="ssg-badge">SSG</span>
        </div>
        <h1>{course.title}</h1>
        <p className="page-lead">{course.description}</p>
      </header>

      <div className="course-detail-body">
        <section aria-labelledby="topics-title">
          <h2 id="topics-title">Что освоите</h2>
          <div className="course-topics">
            {course.topics.map((topic) => (
              <span className="course-topic" key={topic}>
                {topic}
              </span>
            ))}
          </div>
        </section>

        <section aria-labelledby="lessons-title">
          <h2 id="lessons-title">Программа</h2>
          <ol className="lesson-list">
            {course.lessons.map((lesson, index) => (
              <li key={lesson}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {lesson}
              </li>
            ))}
          </ol>
        </section>

        <div className="server-note">
          <strong>Динамический параметр:</strong>{" "}
          <code>courseId = &quot;{course.slug}&quot;</code>. Страница
          сгенерирована статически через <code>generateStaticParams</code>.
        </div>
      </div>

      <footer className="article-footer">
        <span>
          Маршрут: <code>/courses/{course.slug}</code>
        </span>
        <Link className="text-link" href="/courses">
          Другие курсы <span aria-hidden="true">→</span>
        </Link>
      </footer>
    </article>
  );
}
