import type { CategoryId, ConcernId } from "./types";

export const concerns: {
  id: ConcernId;
  title: string;
  text: string;
  tone: string;
}[] = [
  { id: "dry", title: "پوست خشک", text: "آبرسانی و سد دفاعی", tone: "bg-[#F3E0D2]" },
  { id: "oily", title: "پوست چرب", text: "کنترل چربی و منافذ", tone: "bg-[#DCE6D8]" },
  { id: "spots", title: "لک و تیرگی", text: "روشن‌کننده‌های ملایم", tone: "bg-[#E8D5B5]" },
  { id: "acne", title: "جوش", text: "آرام‌سازی التهاب", tone: "bg-[#F0D4D6]" },
  { id: "sensitive", title: "حساسیت", text: "فرمول بدون عطر تند", tone: "bg-[#F4E4E0]" },
  { id: "aging", title: "ضد پیری", text: "استحکام و درخشش", tone: "bg-[#E4D7E6]" },
];

export const beautyCategories: {
  id: CategoryId;
  name: string;
  kicker: string;
  href: string;
  image: string;
}[] = [
  { id: "skincare", name: "مراقبت پوست", kicker: "سرم و کرم", href: "/products?category=skincare", image: "/images/products/silk-cream.jpg" },
  { id: "makeup", name: "آرایش صورت", kicker: "پایه و پوشش", href: "/products?category=makeup", image: "/images/products/nude-foundation.jpg" },
  { id: "eyes", name: "آرایش چشم", kicker: "ریمل و سایه", href: "/products?category=eyes", image: "/images/products/dusk-palette.jpg" },
  { id: "lips", name: "لب", kicker: "رژ و روغن", href: "/products?category=lips", image: "/images/products/velvet-lipstick.jpg" },
  { id: "hair", name: "مو", kicker: "روغن و شست‌وشو", href: "/products?category=hair", image: "/images/products/argan-oil.jpg" },
  { id: "fragrance", name: "عطر", kicker: "رایحه ماندگار", href: "/products?category=fragrance", image: "/images/products/nava-parfum.jpg" },
  { id: "sun", name: "ضد آفتاب", kicker: "حفاظت روزانه", href: "/products?category=sun", image: "/images/products/sun-veil.jpg" },
  { id: "natural", name: "طبیعی", kicker: "گیاهی و خالص", href: "/products?category=natural", image: "/images/products/rose-water.jpg" },
];

export const collections = [
  {
    id: "glow",
    kicker: "پوست درخشان",
    title: "Glow Skin",
    text: "سرم ویتامین C و آبرسان‌هایی که پوست را از داخل روشن می‌کنند.",
    href: "/products?concern=spots",
    image: "/images/products/glow-serum.jpg",
    cta: "کالکشن درخشش",
  },
  {
    id: "routine",
    kicker: "روتین روزانه",
    title: "Daily Routine",
    text: "چهار قدم صبح: شست‌وشو، سرم، مرطوب‌کننده، ضدآفتاب.",
    href: "/products?category=skincare",
    image: "/images/products/gentle-foam.jpg",
    cta: "شروع روتین",
  },
  {
    id: "luxury",
    kicker: "مراقبت لوکس",
    title: "Luxury Care",
    text: "بافت مخملی، بسته‌بندی طلایی، حس آتلیه زیبایی.",
    href: "/products?sort=expensive",
    image: "/images/products/velvet-lipstick.jpg",
    cta: "انتخاب لوکس",
  },
  {
    id: "sun",
    kicker: "محافظت تابستان",
    title: "Summer Protection",
    text: "ضدآفتاب سبک که زیر آرایش نمی‌ماند و سفیدک نمی‌زند.",
    href: "/products?category=sun",
    image: "/images/products/sun-veil.jpg",
    cta: "محافظت روزانه",
  },
];

export const brands = [
  {
    id: "nava",
    name: "نوا لَب",
    origin: "ایران",
    premium: true,
    text: "خط اختصاصی مراقبت و رنگ نوا؛ فرمولاسیون برای پوست مدیترانه‌ای.",
    href: "/products?q=%D9%86%D9%88%D8%A7",
  },
  {
    id: "lumiere",
    name: "لومیر",
    origin: "فرانسه",
    premium: true,
    text: "سرم‌های روشن‌کننده با دوز دقیق آنتی‌اکسیدان.",
    href: "/products?q=%D9%84%D9%88%D9%85%DB%8C%D8%B1",
  },
  {
    id: "sera",
    name: "سِرا",
    origin: "کره",
    premium: false,
    text: "روتین کوتاه، بافت سبک، نتیجه سریع روی منافذ.",
    href: "/products?q=%D8%B3%D8%B1%D8%A7",
  },
  {
    id: "orchid",
    name: "اورکید",
    origin: "ایتالیا",
    premium: true,
    text: "آرایش صورت با پوشش طبیعی و ماندگاری آتلیه‌ای.",
    href: "/products?q=%D8%A7%D9%88%D8%B1%DA%A9%DB%8C%D8%AF",
  },
  {
    id: "mille",
    name: "مِیلِه",
    origin: "فرانسه",
    premium: true,
    text: "عطرهای گلی-چوبی با پخش آرام.",
    href: "/products?q=%D9%85%DB%8C%D9%84%D9%87",
  },
  {
    id: "gol",
    name: "گل‌سرخ",
    origin: "ایران",
    premium: false,
    text: "عصاره گل محمدی کاشان؛ ساده، خالص، بدون ادعاهای اضافه.",
    href: "/products?q=%DA%AF%D9%84",
  },
];

export const journal = [
  {
    slug: "morning-routine",
    kicker: "آموزش",
    title: "روتین صبح در چهار قدم",
    excerpt: "اگر فقط چهار دقیقه وقت دارید، این ترتیب از شست‌وشو تا ضدآفتاب کافی است.",
    image: "/images/products/gentle-foam.jpg",
    minutes: 4,
    body: [
      "پوست صبح‌ها سد دفاعی ضعیف‌تری دارد. هدف روتین صبح، پاکسازی ملایم و قفل رطوبت است نه لایه‌برداری سنگین.",
      "قدم اول: شوینده بدون سولفات. اگر پوستتان خشک است، کف زیاد نشانه خوبی نیست.",
      "قدم دوم: سرم آنتی‌اکسیدان (ویتامین C) روی پوست نم‌دار. دو تا سه قطره کافی است.",
      "قدم سوم: مرطوب‌کننده سبک. صبر کنید سی ثانیه جذب شود.",
      "قدم چهارم: ضدآفتاب. حتی پشت پنجره. این قدم را حذف نکنید.",
    ],
  },
  {
    slug: "choose-serum",
    kicker: "راهنمای خرید",
    title: "چطور سرم مناسب پوستت را پیدا کنی",
    excerpt: "نیاسینامید، ویتامین C و رتینول هر کدام یک کار می‌کنند. قاطی‌شان نکنید.",
    image: "/images/products/glow-serum.jpg",
    minutes: 6,
    body: [
      "سرم یعنی ماده مؤثر با غلظت بالاتر از کرم. قرار نیست پنج سرم هم‌زمان استفاده شود.",
      "لک و تیرگی: ویتامین C در صبح. جوش و منافذ: نیاسینامید. خطوط: رتینول فقط شب.",
      "اگر پوست حساس دارید، اول نیاسینامید را تست کنید. ویتامین C خالص روی سد آسیب‌دیده می‌سوزاند.",
      "قانون نوا: یک سرم فعال + یک مرطوب‌کننده. بقیه اختیاری است.",
    ],
  },
  {
    slug: "lipstick-guide",
    kicker: "آرایش",
    title: "رژلب ماندگار، بدون خشکی",
    excerpt: "مخملی قشنگ است اگر لب ترک نخورد. زیرسازی روغن، رویی مات.",
    image: "/images/products/velvet-lipstick.jpg",
    minutes: 3,
    body: [
      "لب پوست ندارد که خود را ترمیم کند. رژ مات بدون زیرسازی، خط لب را عمیق می‌کند.",
      "یک لایه روغن لب، سی ثانیه صبر، دستمال نازک، بعد رژ. رنگ تمیزتر می‌نشیند.",
      "برای دوام: بعد از رژ، یک دستمال و یک لایه پودر شفاف وسط لب. کناره‌ها را دست نزنید.",
    ],
  },
];
