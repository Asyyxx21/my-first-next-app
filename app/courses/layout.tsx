import type { ReactNode } from "react";
import Link from "next/link";
import MountStamp from "@/app/components/MountStamp";
import { courses } from "@/lib/courses";

interface CoursesLayoutProps {
  children: ReactNode;
}

export default function CoursesLayout({ children }: CoursesLayoutProps) {
  return (
    <div className="container courses-shell">
      <aside className="courses-sidebar" aria-label="Навигация по курсам">
        <p className="section-kicker">Вложенный layout</p>
        <h2>Раздел «Курсы»</h2>
        <p className="sidebar-text">
          Этот сайдбар общий для /courses и /courses/[courseId]. Он сохраняется
          при переходе к карточке курса.
        </p>

        <div className="layout-proof">
          <MountStamp label="courses layout" />
          <span className="proof-note">сохраняется</span>
        </div>

        <nav className="sidebar-nav" aria-label="Курсы">
          <Link href="/courses">Все курсы</Link>
          {courses.map((course) => (
            <Link href={`/courses/${course.slug}`} key={course.slug}>
              {course.title}
            </Link>
          ))}
        </nav>

        <Link className="sidebar-cta" href="/blog">
          Перейти в блог <span aria-hidden="true">→</span>
        </Link>
      </aside>

      <div className="courses-content">{children}</div>
    </div>
  );
}
