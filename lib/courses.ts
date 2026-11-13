export type Course = {
  slug: string;
  title: string;
  level: string;
  duration: string;
  description: string;
  topics: string[];
  lessons: string[];
};

export const courses: Course[] = [
  {
    slug: "nextjs-start",
    title: "Next.js с нуля",
    level: "Начальный",
    duration: "8 уроков",
    description:
      "Первый проект на App Router: страницы, вложенные layout’ы, динамические маршруты и навигация через Link.",
    topics: ["App Router", "Layouts", "Dynamic routes", "Link"],
    lessons: [
      "Структура проекта и page.tsx",
      "Общий layout и навигация",
      "Статические маршруты",
      "Динамические сегменты",
      "Вложенные layout’ы",
      "Link и клиентская навигация",
    ],
  },
  {
    slug: "react-base",
    title: "React: компоненты и состояние",
    level: "Начальный",
    duration: "6 уроков",
    description:
      "Компоненты, JSX, props и useState — база, без которой сложно двигаться дальше в Next.js.",
    topics: ["JSX", "Props", "State", "Events"],
    lessons: [
      "Компоненты и JSX",
      "Передача props",
      "Состояние через useState",
      "Обработчики событий",
      "Списки и ключи",
    ],
  },
  {
    slug: "typescript",
    title: "TypeScript для React",
    level: "Средний",
    duration: "5 уроков",
    description:
      "Типизация props, children и params. Практика на компонентах и маршрутах Next.js.",
    topics: ["Types", "Interfaces", "Generics", "Params"],
    lessons: [
      "Базовые типы",
      "Интерфейсы props",
      "Типизация children",
      "Generics в компонентах",
      "Типизация params",
    ],
  },
];

export function getCourse(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}
