import Link from "next/link";
import {
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SparkleIcon,
  TelegramIcon,
  WhatsappIcon,
} from "./Icons";

const quickLinks = [
  { href: "/products", label: "همه محصولات" },
  { href: "/products?category=women", label: "زنانه" },
  { href: "/products?category=men", label: "مردانه" },
  { href: "/products?category=kids", label: "بچگانه" },
  { href: "/products?discount=1", label: "تخفیف‌ها" },
];

const helpLinks = [
  { href: "/account", label: "پیگیری سفارش" },
  { href: "/about", label: "سوالات متداول" },
  { href: "/about", label: "راهنمای خرید" },
  { href: "/about", label: "شرایط بازگشت کالا" },
  { href: "/contact", label: "تماس با ما" },
];

export default function Footer() {
  return (
    <footer className="mt-20 bg-ink text-ivory">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* برند */}
        <div>
          <div className="mb-4 flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ivory text-ink">
              <SparkleIcon width={20} height={20} />
            </span>
            <span>
              <span className="block text-xl font-black">نوا</span>
              <span className="block text-[10px] font-semibold tracking-widest text-ivory/60">
                فروشگاه پوشاک
              </span>
            </span>
          </div>
          <p className="mb-5 text-sm leading-7 text-ivory/70">
            نوا با هدف ارائه‌ی پوشاک باکیفیت و به‌روز، تجربه‌ی خریدی ساده، مطمئن و لذت‌بخش را برای
            شما فراهم می‌کند.
          </p>
          <div className="flex gap-2.5">
            {[
              { icon: InstagramIcon, label: "اینستاگرام" },
              { icon: TelegramIcon, label: "تلگرام" },
              { icon: WhatsappIcon, label: "واتس‌اپ" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory/10 transition hover:bg-clay"
              >
                <Icon width={18} height={18} />
              </a>
            ))}
          </div>
        </div>

        {/* دسترسی سریع */}
        <div>
          <h3 className="mb-4 text-base font-extrabold">دسترسی سریع</h3>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-ivory/70 transition hover:text-clay">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* راهنمای مشتریان */}
        <div>
          <h3 className="mb-4 text-base font-extrabold">راهنمای مشتریان</h3>
          <ul className="space-y-2.5">
            {helpLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-ivory/70 transition hover:text-clay">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* تماس */}
        <div>
          <h3 className="mb-4 text-base font-extrabold">تماس با ما</h3>
          <ul className="space-y-3.5 text-sm text-ivory/70">
            <li className="flex items-start gap-2.5">
              <MapPinIcon width={17} height={17} className="mt-0.5 shrink-0 text-clay" />
              تهران، خیابان ولیعصر، مجتمع تجاری نوا، طبقه دوم
            </li>
            <li className="flex items-center gap-2.5">
              <PhoneIcon width={17} height={17} className="shrink-0 text-clay" />
              <a href="tel:02191000000" className="transition hover:text-ivory">
                ۰۲۱-۹۱۰۰۰۰۰۰
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <MailIcon width={17} height={17} className="shrink-0 text-clay" />
              <a href="mailto:hello@nava-shop.ir" className="transition hover:text-ivory">
                hello@nava-shop.ir
              </a>
            </li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {["ارسال سریع", "ضمانت اصالت", "۷ روز بازگشت"].map((t) => (
              <span
                key={t}
                className="rounded-full bg-ivory/10 px-3 py-1.5 text-[11px] font-bold text-ivory/80"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* نوار پایین */}
      <div className="border-t border-ivory/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-ivory/50 sm:flex-row">
          <p>© ۱۴۰۵ فروشگاه پوشاک نوا — تمامی حقوق محفوظ است.</p>
          <p>ساخته‌شده با 💛 برای تجربه‌ی خریدی بهتر</p>
        </div>
      </div>
    </footer>
  );
}
