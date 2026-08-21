# فروشگاه زیبایی «نوا» — نمونه‌کار Next.js

فروشگاه آنلاین لوازم آرایشی و مراقبت پوست، راست‌چین (RTL)، با **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4**.

داده‌ها و احراز هویت با `localStorage` شبیه‌سازی شده‌اند.

## امکانات

- صفحه اصلی Beauty: هیرو، دسته، نگرانی پوست، کالکشن، قفسه‌ها، برند، مجله
- لیست محصول با فیلتر دسته، نگرانی پوست، برند، حجم، قیمت
- صفحه محصول: سایه/حجم، نحوه استفاده، دیدگاه
- سبد، تسویه آزمایشی، علاقه‌مندی، حساب
- مجله زیبایی (`/journal`)

## اجرا

```bash
git checkout arena/01a023b4-nava-shop
git pull
npm install
npm run dev
# → http://localhost:3000
```

## شخصی‌سازی

- محصولات: `lib/products.ts`
- محتوا (دسته، نگرانی، مجله): `lib/beauty.ts`
- رنگ برند: `app/globals.css` بخش `@theme`
