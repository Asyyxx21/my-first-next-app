import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import NavBar from "./components/NavBar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Next.js: маршрутизация и Layouts",
    template: "%s · Next.js: маршрутизация и Layouts",
  },
  description:
    "Учебный проект по App Router: статические и динамические маршруты, Link, layout.tsx, template.tsx и раздел «Курсы».",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <Link className="brand" href="/" aria-label="На главную">
              <span className="brand-mark" aria-hidden="true">
                N
              </span>
              <span>
                next<span className="brand-accent">.first</span>
              </span>
            </Link>

            <NavBar />
          </div>
        </header>

        <main className="site-main">{children}</main>

        <footer className="site-footer">
          <div className="container footer-inner">
            <span>Контрольная точка №1 · Маршрутизация и Layouts</span>
            <span>App Router · layout.tsx · template.tsx</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
