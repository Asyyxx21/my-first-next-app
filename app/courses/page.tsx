import type { Metadata } from "next";
import Link from "next/link";
import { courses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Курсы",
  description:
    "Раздел «Курсы» с общим layout и динамическими страницами /courses/[courseId].",
};

export default function CoursesPage() {
  return (
    <>
      <section className="page-hero course-page-hero" aria-labelledby="courses-title">
        <p className="eyebrow">
          <span className="pulse-dot" aria-hidden="true" />
          Статический маршрут · /courses
        </p>
        <h1 id="courses-title">Курсы</h1>
        <p className="page-lead">
          Учебные направления проекта. У раздела есть собственный{" "}
          <code>layout.tsx</code>, а каждый курс открывается по динамическому
          адресу <code>/courses/[courseId]</code>.
        </p>
      </section>

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
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <div className="course-topics">
              {course.topics.map((topic) => (
                <span className="course-topic" key={topic}>
                  {topic}
                </span>
              ))}
            </div>
            <div className="course-card-footer">
              <span>{course.duration}</span>
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
