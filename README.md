# Контрольная точка №1 — Маршрутизация. Layout

Учебный проект на **Next.js 16 (App Router) + TypeScript**, в котором реализованы статические и динамические маршруты, вложенные layout’ы, template, клиентская навигация и раздел «Курсы».

## Что реализовано

- Статические страницы `/about` и `/blog`.
- Динамический маршрут `/blog/[id]` с типизацией асинхронного `params`.
- Вложенный динамический маршрут `/blog/[id]/comments/[commentId]`.
- Вложенный `app/blog/layout.tsx`, который сохраняется при переходах.
- `app/blog/template.tsx`, который перемонтируется при каждом переходе.
- Клиентский `NavBar` с `usePathname`, подсветкой активной ссылки и кнопкой `useRouter`.
- Раздел `/courses` с собственным layout’ом и динамической страницей `/courses/[courseId]`.
- Перенаправления со старых адресов `/blog/nextjs-vvedenie` и `/blog/react-osnovy` на новые `/blog/1` и `/blog/2`.
- Адаптивная вёрстка на чистом CSS, без Tailwind.

## Стек и требования

| Компонент | Версия / требование |
| --- | --- |
| Next.js | 16.4.6 (App Router, Turbopack) |
| React | 19.3.0 |
| TypeScript | 5.x |
| Node.js | 20.9+ (проверено на 24.22.0) |
| npm | 11.4.2 |
| Стили | глобальный CSS |

## Запуск

```bash
cd my-first-next-app
npm install
npm run dev
```

Приложение: [http://localhost:3000](http://localhost:3000).

Production-сборка:

```bash
npm run build
npm run start
```

Проверка кода:

```bash
npm run lint
```

## Маршруты

| Маршрут | Файл | Тип |
| --- | --- | --- |
| `/` | `app/page.tsx` | Static |
| `/about` | `app/about/page.tsx` | Static, Server Component |
| `/blog` | `app/blog/page.tsx` | Static, вложенный layout |
| `/blog/1` | `app/blog/[id]/page.tsx` | SSG, динамический `[id]` |
| `/blog/1/comments/5` | `app/blog/[id]/comments/[commentId]/page.tsx` | Dynamic, два параметра |
| `/courses` | `app/courses/page.tsx` | Static, вложенный layout |
| `/courses/nextjs-start` | `app/courses/[courseId]/page.tsx` | SSG, динамический `[courseId]` |
| `/api/hello` | `app/api/hello/route.ts` | Route Handler |

## Структура проекта

```text
my-first-next-app/
├─ app/
│  ├─ layout.tsx                         # корневой layout, NavBar
│  ├─ page.tsx                           # /
│  ├─ globals.css
│  ├─ not-found.tsx
│  ├─ components/
│  │  ├─ NavBar.tsx                      # usePathname + useRouter
│  │  └─ MountStamp.tsx                  # метка экземпляра компонента
│  ├─ about/
│  │  ├─ page.tsx                        # /about
│  │  └─ Counter.tsx
│  ├─ blog/
│  │  ├─ layout.tsx                      # вложенный layout
│  │  ├─ template.tsx                    # перемонтируется
│  │  ├─ page.tsx                        # /blog
│  │  └─ [id]/
│  │     ├─ page.tsx                     # /blog/1
│  │     └─ comments/
│  │        └─ [commentId]/
│  │           └─ page.tsx               # /blog/1/comments/5
│  ├─ courses/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx                        # /courses
│  │  └─ [courseId]/
│  │     └─ page.tsx                     # /courses/nextjs-start
│  └─ api/hello/route.ts
├─ lib/
│  ├─ posts.ts
│  └─ courses.ts
├─ docs/
│  ├─ Контрольная_точка_1_Отчёт.docx
│  └─ Контрольная_точка_1_Отчёт.pdf
├─ package.json
├─ next.config.ts
└─ tsconfig.json
```

## Ключевые фрагменты

### Динамический маршрут `[id]`

```tsx
type BlogPostProps = {
  params: Promise<{ id: string }>;
};

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { id } = await params;
  const post = getPost(id);

  if (!post) notFound();

  return <h1>{post.title}</h1>;
}
```

### Вложенный маршрут комментариев

```tsx
type CommentPageProps = {
  params: Promise<{ id: string; commentId: string }>;
};

const { id, commentId } = await params;
```

### Активная ссылка и программный переход

```tsx
const pathname = usePathname();
const router = useRouter();

const isActive = (href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
```

## Проверка layout и template

В браузере были выполнены переходы без полной перезагрузки. Метки экземпляров показывают разницу:

| Действие | layout | template | Активная ссылка |
| --- | --- | --- | --- |
| Открыт `/blog` | `y9fs` | `pqf2` | Блог |
| Клик по `/blog/1` | `y9fs` (не изменился) | `5v71` (новый) | Блог |
| Кнопка `useRouter` → `/about` | — | — | О нас |

В консоли браузера при переходе появилось сообщение:

```text
BlogTemplate смонтирован заново
```

Это подтверждает, что layout сохраняет экземпляр, а template создаётся заново.

## Результаты проверки

`npm run lint` — без ошибок.

`npm run build` — успешно:

```text
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ƒ /api/hello
├ ○ /blog
├   /blog/[id]
│ ├ ● /blog/1
│ ├ ● /blog/2
│ └ ● /blog/3
├ ƒ /blog/[id]/comments/[commentId]
├ ○ /courses
└   /courses/[courseId]
  ├ ● /courses/nextjs-start
  ├ ● /courses/react-base
  └ ● /courses/typescript

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

HTTP-проверки:

| Запрос | Результат |
| --- | --- |
| `GET /`, `/about`, `/blog` | 200 |
| `GET /blog/1`, `/blog/2`, `/blog/3` | 200, SSG |
| `GET /blog/1/comments/5` | 200, «Комментарий 5» |
| `GET /courses`, `/courses/nextjs-start` | 200 |
| `GET /api/hello` | 200, `{"message":"Hello from Next.js!"}` |
| `GET /blog/unknown`, `/courses/unknown` | 404 |
| `/blog/nextjs-vvedenie` | 307 → `/blog/1` |
| `/blog/react-osnovy` | 307 → `/blog/2` |

## Соответствие критериям

| Критерий | Баллы | Статус |
| --- | --- | --- |
| Статические маршруты `/about` и `/blog` | 2 | ✅ |
| Динамические `[id]` и вложенный `[commentId]` с типизацией `params` | 3 | ✅ |
| Навигация через `Link`, активная ссылка подсвечивается | 2 | ✅ |
| `layout.tsx` и `template.tsx`, показана разница | 3 | ✅ |
| Раздел «Курсы» с layout’ом и динамической страницей | 2 | ✅ |
| Репозиторий | 3 | ⚠️ локальный Git готов, удалённый GitHub не создан |

## GitHub

Проект инициализирован как локальный Git-репозиторий, ветка `main`. Удалённый репозиторий не создан, так как в окружении нет GitHub-токена и `gh` CLI.

```bash
# после создания пустого репозитория на GitHub:
git remote add origin https://github.com/<username>/my-first-next-app.git
git push -u origin main
```

## Отчёт

Полный отчёт с листингами, скриншотами и результатами браузерного теста:

- `docs/Контрольная_точка_1_Отчёт.docx`
- `docs/Контрольная_точка_1_Отчёт.pdf`
