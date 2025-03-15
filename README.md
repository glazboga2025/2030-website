This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Поддомены

Проект настроен для работы с поддоменами. Блог доступен на поддомене `blog`.

### Локальная разработка с поддоменами

Для локальной разработки с поддоменами используйте:

```bash
npm run dev:subdomains
```

Затем откройте [http://blog.localhost:3000](http://blog.localhost:3000) в браузере.

Обратите внимание, что при использовании поддомена `blog` вам не нужно добавлять `/blog` в URL. Например:
- Используйте `blog.yourdomain.com` вместо `yourdomain.com/blog`
- Используйте `blog.yourdomain.com/page/2` вместо `yourdomain.com/blog/page/2`

### Настройка DNS для продакшена

Для работы поддоменов в продакшене необходимо настроить DNS-записи:

1. Создайте A-запись для основного домена, указывающую на IP-адрес вашего сервера
2. Создайте CNAME-запись для поддомена `blog`, указывающую на основной домен

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
