export type PostBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type PostComment = {
  id: string;
  author: string;
  text: string;
};

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  tag: string;
  readingTime: string;
  level: string;
  content: PostBlock[];
  comments: PostComment[];
};

export const posts: Post[] = [
  {
    id: "1",
    title: "Введение в App Router",
    excerpt:
      "Как папки внутри app превращаются в URL, а page.tsx делает сегмент публичной страницей.",
    tag: "Маршрутизация",
    readingTime: "6 мин",
    level: "Начальный",
    content: [
      {
        type: "paragraph",
        text: "App Router использует файловую маршрутизацию: структура папок внутри app определяет адреса страниц. Отдельный файл конфигурации маршрутов не нужен — достаточно создать папку и положить в неё page.tsx.",
      },
      {
        type: "heading",
        text: "Папка — это сегмент URL",
      },
      {
        type: "paragraph",
        text: "Файл app/about/page.tsx соответствует адресу /about, а app/blog/page.tsx — адресу /blog. Вложенные папки добавляют сегменты: app/blog/[id]/page.tsx превращается в шаблон для /blog/1, /blog/2 и других идентификаторов.",
      },
      {
        type: "list",
        items: [
          "page.tsx делает сегмент доступным по URL.",
          "layout.tsx задаёт общую обёртку и сохраняет состояние.",
          "template.tsx создаёт новый экземпляр при каждом переходе.",
          "Папка без page.tsx сама по себе страницу не создаёт.",
        ],
      },
      {
        type: "heading",
        text: "Link вместо обычного a",
      },
      {
        type: "paragraph",
        text: "Компонент Link из next/link перехватывает переход и выполняет клиентскую навигацию. Страница не перезагружается полностью, а Next.js может заранее подгрузить её код. Для внешних ссылок и API-маршрутов можно использовать обычный a.",
      },
      {
        type: "heading",
        text: "Итог",
      },
      {
        type: "paragraph",
        text: "Маршрутизация в App Router читается по структуре проекта. В этом приложении есть статические страницы /about и /blog, динамические /blog/[id] и /courses/[courseId], а также вложенный маршрут комментариев.",
      },
    ],
    comments: [
      {
        id: "1",
        author: "Анна",
        text: "Наконец-то понятно, почему папка сама по себе ещё не маршрут.",
      },
      {
        id: "2",
        author: "Игорь",
        text: "Link действительно ощущается быстрее обычного перехода.",
      },
      {
        id: "5",
        author: "Мария",
        text: "Проверила вложенный комментарий — параметры приходят корректно.",
      },
    ],
  },
  {
    id: "2",
    title: "Layouts и Templates на практике",
    excerpt:
      "Чем layout отличается от template, что сохраняется при навигации и когда нужен новый экземпляр.",
    tag: "Layouts",
    readingTime: "7 мин",
    level: "Средний",
    content: [
      {
        type: "paragraph",
        text: "Layout и template оборачивают страницы, но ведут себя по-разному. Layout сохраняется между переходами внутри своего сегмента, а template создаётся заново при каждой навигации.",
      },
      {
        type: "heading",
        text: "Layout сохраняет состояние",
      },
      {
        type: "paragraph",
        text: "Файл app/blog/layout.tsx оборачивает и /blog, и /blog/1, и /blog/1/comments/5. При переходе между этими страницами layout не перемонтируется: состояние его клиентских компонентов и позиция прокрутки сохраняются.",
      },
      {
        type: "heading",
        text: "Template сбрасывает состояние",
      },
      {
        type: "paragraph",
        text: "Файл app/blog/template.tsx создаёт новый экземпляр при каждом переходе. Это удобно для анимаций входа, сброса формы или логирования. В проекте template выводит метку экземпляра и пишет сообщение в консоль браузера.",
      },
      {
        type: "list",
        items: [
          "Layout: общая навигация, сайдбар, футер, сохранение состояния.",
          "Template: анимация появления, сброс локального состояния, аналитика.",
          "Layout может вкладываться в другой layout.",
          "Template оборачивает содержимое своего сегмента и перемонтируется.",
        ],
      },
      {
        type: "heading",
        text: "Как проверить",
      },
      {
        type: "paragraph",
        text: "Откройте /blog и запомните значение метки layout в сайдбаре. Затем перейдите в любую статью: метка layout останется прежней, а метка template изменится. В консоли браузера появится сообщение BlogTemplate смонтирован заново.",
      },
    ],
    comments: [
      {
        id: "1",
        author: "Павел",
        text: "С метками экземпляров разница видна сразу.",
      },
      {
        id: "2",
        author: "Ольга",
        text: "Анимацию в template удобно использовать для смены страниц.",
      },
    ],
  },
  {
    id: "3",
    title: "Динамические маршруты и params",
    excerpt:
      "Сегменты [id] и [commentId], асинхронный params и типизация вложенных параметров.",
    tag: "Dynamic",
    readingTime: "5 мин",
    level: "Средний",
    content: [
      {
        type: "paragraph",
        text: "Динамический сегмент создаётся папкой с именем в квадратных скобках. Например, app/blog/[id]/page.tsx обслуживает все адреса вида /blog/<id>, а значение id приходит в пропсе params.",
      },
      {
        type: "heading",
        text: "params — это Promise",
      },
      {
        type: "paragraph",
        text: "В Next.js 15+ params является асинхронным. Компонент страницы объявляется как async, а параметры получаются через await params. В TypeScript тип описывается как Promise<{ id: string }>.",
      },
      {
        type: "heading",
        text: "Вложенные сегменты",
      },
      {
        type: "paragraph",
        text: "Файл app/blog/[id]/comments/[commentId]/page.tsx соответствует адресу /blog/1/comments/5. В params одновременно приходят id и commentId, поэтому тип выглядит как Promise<{ id: string; commentId: string }>.",
      },
      {
        type: "list",
        items: [
          "Серверный компонент получает params пропсом.",
          "Клиентский компонент использует хук useParams().",
          "generateStaticParams заранее перечисляет известные значения.",
          "Для неизвестного значения можно вызвать notFound().",
        ],
      },
      {
        type: "heading",
        text: "Итог",
      },
      {
        type: "paragraph",
        text: "Динамические сегменты позволяют одному файлу обслуживать множество URL. Вложенность задаётся структурой папок, а тип params повторяет эту структуру.",
      },
    ],
    comments: [
      {
        id: "1",
        author: "Денис",
        text: "Типизация вложенных params помогает не перепутать id и commentId.",
      },
    ],
  },
];

export function getPost(id: string): Post | undefined {
  return posts.find((post) => post.id === id);
}

export function getComment(
  postId: string,
  commentId: string,
): PostComment | undefined {
  return getPost(postId)?.comments.find(
    (comment) => comment.id === commentId,
  );
}
