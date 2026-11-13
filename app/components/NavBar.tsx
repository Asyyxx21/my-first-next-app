"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О нас" },
  { href: "/blog", label: "Блог" },
  { href: "/courses", label: "Курсы" },
];

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="site-nav" aria-label="Основная навигация">
      {links.map((link) => {
        const active = isActive(link.href);

        return (
          <Link
            className={active ? "nav-link is-active" : "nav-link"}
            href={link.href}
            key={link.href}
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}

      <a
        className="nav-link"
        href="/api/hello"
        target="_blank"
        rel="noreferrer"
      >
        API ↗
      </a>

      <button
        className="nav-button"
        type="button"
        onClick={() => router.push("/about")}
      >
        К «О нас»
      </button>
    </nav>
  );
}
