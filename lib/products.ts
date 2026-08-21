import type { Category, CategoryId, Product } from "./types";

/**
 * دیتای استاتیک فروشگاه
 * در نسخه‌ی واقعی این داده‌ها از دیتابیس/API خوانده می‌شوند.
 */

export const FREE_SHIPPING_THRESHOLD = 2_000_000; // ارسال رایگان بالای این مبلغ
export const SHIPPING_COST = 80_000; // هزینه ارسال عادی

export const categories: Category[] = [
  {
    id: "women",
    name: "زنانه",
    subtitle: "جدیدترین کالکشن پاییز",
    image: "/images/products/evening-dress.jpg",
  },
  {
    id: "men",
    name: "مردانه",
    subtitle: "استایل رسمی و کژوال",
    image: "/images/products/navy-suit.jpg",
  },
  {
    id: "kids",
    name: "بچگانه",
    subtitle: "نرم، راحت و بامزه",
    image: "/images/products/kids-jacket.jpg",
  },
  {
    id: "accessories",
    name: "اکسسوری",
    subtitle: "به‌زودی",
    image: "/images/products/leather-bag.jpg",
  },
];

export const products: Product[] = [
  // ---------- زنانه ----------
  {
    id: "p1",
    slug: "evening-dress",
    name: "پیراهن مجلسی بلند «مهتاب»",
    category: "women",
    price: 3_850_000,
    oldPrice: 4_600_000,
    images: ["/images/products/evening-dress.jpg"],
    description:
      "پیراهن مجلسی بلند با پارچه‌ی حریر درجه‌یک و دوخت ظریف؛ مناسب مهمانی‌ها و مجالس رسمی. پارچه‌ی این مدل به‌گونه‌ای انتخاب شده که در حرکت، لطافت و ریزش طبیعی داشته باشد.",
    details: [
      "جنس: حریر ساتن ممتاز",
      "قد: قد بلند (تا مچ پا)",
      "آستین: بدون آستین با بند تنظیم",
      "شست‌وشو: دستی با آب سرد",
      "ساخت: ایران",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "شرابی", hex: "#7f1d1d" },
      { name: "مشکی", hex: "#1c1917" },
      { name: "زرشکی", hex: "#9d174d" },
    ],
    rating: 4.7,
    reviewCount: 124,
    stock: 8,
    tags: ["پرفروش", "تخفیف"],
    featured: true,
  },
  {
    id: "p2",
    slug: "camel-blazer",
    name: "کت زنانه شتری «صحرا»",
    category: "women",
    price: 2_980_000,
    images: ["/images/products/camel-blazer.jpg"],
    description:
      "کت زنانه‌ی کلاسیک با رنگ شتری گرم و برش تمیز؛ ترکیبی عالی با شلوار جین یا پارچه‌ای برای استایل اداری و روزمره.",
    details: [
      "جنس: کشمیر و پلی‌استر",
      "آستر: ساتن باکیفیت",
      "دوخت: تک‌دکمه با لبه‌ی گرد",
      "شست‌وشو: خشک‌شویی",
      "ساخت: ایران",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "شتری", hex: "#b08968" },
      { name: "کرم", hex: "#e7e0d4" },
    ],
    rating: 4.5,
    reviewCount: 87,
    stock: 12,
    tags: ["جدید"],
    featured: true,
  },
  {
    id: "p3",
    slug: "silk-blouse",
    name: "بلوز ابریشمی کرم «آفتاب»",
    category: "women",
    price: 1_450_000,
    oldPrice: 1_700_000,
    images: ["/images/products/silk-blouse.jpg"],
    description:
      "بلوز ابریشمی با برش آزاد (اورسایز) و درخشش ملایم؛ حس لوکس و راحتی را هم‌زمان به استایل شما می‌بخشد.",
    details: [
      "جنس: ابریشم مصنوعی (ساتن) مرغوب",
      "برش: آزاد و راحت",
      "یقه: یقه‌ی گرد ساده",
      "شست‌وشو: دستی با آب سرد",
      "ساخت: ایران",
    ],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "کرم", hex: "#f0e9dd" },
      { name: "سفید", hex: "#ffffff" },
      { name: "طلایی", hex: "#d4a95c" },
    ],
    rating: 4.3,
    reviewCount: 56,
    stock: 15,
    tags: ["تخفیف"],
    featured: true,
  },

  // ---------- مردانه ----------
  {
    id: "p4",
    slug: "navy-suit",
    name: "کت‌وشلوار سرمه‌ای «سلطان»",
    category: "men",
    price: 6_450_000,
    oldPrice: 7_500_000,
    images: ["/images/products/navy-suit.jpg"],
    description:
      "کت‌وشلوار مجلسی با رنگ سرمه‌ای سلطنتی و پارچه‌ی خوش‌فرم؛ انتخاب اول برای مراسم رسمی و جلسات کاری مهم.",
    details: [
      "جنس: پشم و پلی‌استر ممتاز",
      "شامل: کت + شلوار",
      "دوخت: نیمه‌مجلسی با فرم‌دهی کامل",
      "شست‌وشو: خشک‌شویی",
      "ساخت: ایران",
    ],
    sizes: ["46", "48", "50", "52", "54"],
    colors: [
      { name: "سرمه‌ای", hex: "#1e3a5f" },
      { name: "مشکی", hex: "#1c1917" },
    ],
    rating: 4.8,
    reviewCount: 203,
    stock: 6,
    tags: ["پرفروش", "تخفیف", "کم‌موجود"],
    featured: true,
  },
  {
    id: "p5",
    slug: "white-shirt",
    name: "پیراهن رسمی سفید «کلاسیک»",
    category: "men",
    price: 980_000,
    images: ["/images/products/white-shirt.jpg"],
    description:
      "پیراهن رسمی سفید با پارچه‌ی پنبه‌ای و تنفس‌پذیر؛ آیتم همیشگی و ضروری کمد هر آقایی.",
    details: [
      "جنس: ۹۷٪ پنبه، ۳٪ اسپندکس",
      "یقه: یقه‌ی انگلیسی کلاسیک",
      "دکمه: مرواریدی ضدخش",
      "شست‌وشو: ماشینی ۳۰ درجه",
      "ساخت: ایران",
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: [
      { name: "سفید", hex: "#ffffff" },
      { name: "آبی روشن", hex: "#bfd3e6" },
    ],
    rating: 4.6,
    reviewCount: 148,
    stock: 24,
    tags: ["جدید"],
  },
  {
    id: "p6",
    slug: "grey-hoodie",
    name: "سویشرت طوسی «کژوال»",
    category: "men",
    price: 890_000,
    oldPrice: 1_050_000,
    images: ["/images/products/grey-hoodie.jpg"],
    description:
      "سویشرت هودی طوسی با الیاف نرم و گرم؛ برای روزهای خنک و استایل روزمره‌ی راحت.",
    details: [
      "جنس: فلیس نرم (پنبه-پلی‌استر)",
      "دارای: هود + جیب کانگورویی",
      "برش: اسپرت و راحت",
      "شست‌وشو: ماشینی ۳۰ درجه",
      "ساخت: ایران",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "طوسی", hex: "#9ca3af" },
      { name: "سرمه‌ای", hex: "#1e3a5f" },
    ],
    rating: 4.4,
    reviewCount: 92,
    stock: 18,
    tags: ["تخفیف"],
  },

  // ---------- بچگانه ----------
  {
    id: "p7",
    slug: "kids-overall",
    name: "ست سرهمی جین بچگانه «بازی»",
    category: "kids",
    price: 1_250_000,
    images: ["/images/products/kids-overall.jpg"],
    description:
      "سرهمی جین بامزه با تی‌شرت زرد خردلی؛ مقاوم برای بازی‌های پرجنب‌وجوش، نرم و راحت برای پوست کودک.",
    details: [
      "جنس: جین نرم (تخریب‌شده)",
      "شامل: سرهمی + تی‌شرت",
      "بند: قابل تنظیم شانه",
      "شست‌وشو: ماشینی ۳۰ درجه",
      "ساخت: ایران",
    ],
    sizes: ["۲-۳ سال", "۴-۵ سال", "۶-۷ سال"],
    colors: [
      { name: "جین", hex: "#5f8fb0" },
      { name: "زرد", hex: "#e2b13c" },
    ],
    rating: 4.7,
    reviewCount: 67,
    stock: 10,
    tags: ["جدید", "پرفروش"],
  },
  {
    id: "p8",
    slug: "kids-jacket",
    name: "کاپشن پافر زرد بچگانه «لبخند»",
    category: "kids",
    price: 1_480_000,
    images: ["/images/products/kids-jacket.jpg"],
    description:
      "کاپشن پافر شاد و گرم با رنگ زرد پررنگ؛ ضدآب و بسیار سبک، مناسب پاییز و زمستان.",
    details: [
      "جنس: نایلون ضدآب + الیاف گرم",
      "دارای: کلاه جداشونده",
      "زیپ: دولایه‌ی بادگیر",
      "شست‌وشو: ماشینی ۳۰ درجه",
      "ساخت: ایران",
    ],
    sizes: ["۲-۳ سال", "۴-۵ سال", "۶-۷ سال", "۸-۹ سال"],
    colors: [
      { name: "زرد", hex: "#f6c445" },
      { name: "سبز", hex: "#3f7d5c" },
    ],
    rating: 4.6,
    reviewCount: 41,
    stock: 5,
    tags: ["پرفروش", "کم‌موجود"],
  },
  {
    id: "p9",
    slug: "kids-jeans",
    name: "شلوار جین بچگانه «کاوشگر»",
    category: "kids",
    price: 720_000,
    images: ["/images/products/kids-jeans.jpg"],
    description:
      "شلوار جین راحت با زانوی تقویت‌شده؛ مناسب مدرسه و بازی، همراه با کش کمر برای راحتی بیشتر.",
    details: [
      "جنس: جین کشسان نرم",
      "کمر: کش دار با دکمه",
      "زانو: تقویت‌شده",
      "شست‌وشو: ماشینی ۳۰ درجه",
      "ساخت: ایران",
    ],
    sizes: ["۲-۳ سال", "۴-۵ سال", "۶-۷ سال", "۸-۹ سال", "۱۰-۱۱ سال"],
    colors: [
      { name: "جین روشن", hex: "#7ea6c4" },
      { name: "جین تیره", hex: "#2c4a66" },
    ],
    rating: 4.2,
    reviewCount: 33,
    stock: 20,
    tags: [],
  },
];

/** دسته‌بندی بر اساس آیدی */
export function getCategory(id: CategoryId): Category {
  return categories.find((c) => c.id === id) ?? categories[0];
}

/** یافتن محصول با اسلاگ */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** یافتن محصول با شناسه */
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** محصولات مرتبط (هم‌دسته، به‌جز خود محصول) */
export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .concat(products.filter((p) => p.category !== product.category && p.id !== product.id))
    .slice(0, count);
}

/** محصولات پیشنهادی برای صفحه اصلی */
export function getFeaturedProducts(count = 8): Product[] {
  return products.filter((p) => p.featured).slice(0, count);
}
