import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { journal } from "@/lib/beauty";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return journal.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = journal.find((a) => a.slug === slug);
  if (!article) return { title: "مطلب یافت نشد" };
  return { title: article.title, description: article.excerpt };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = journal.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <article className="container-x mt-8 max-w-3xl pb-16">
      <nav className="mb-5 flex gap-1.5 text-xs text-ink-soft">
        <Link href="/" className="hover:text-ink">خانه</Link>
        <span>/</span>
        <Link href="/journal" className="hover:text-ink">مجله</Link>
        <span>/</span>
        <span className="text-ink">{article.title}</span>
      </nav>
      <p className="kicker">{article.kicker}</p>
      <h1 className="mt-2 text-2xl font-semibold leading-snug lg:text-3xl">{article.title}</h1>
      <p className="mt-3 text-sm text-ink-soft">
        {article.minutes.toLocaleString("fa-IR")} دقیقه مطالعه
      </p>
      <div className="relative mt-6 aspect-[16/8] overflow-hidden rounded-2xl bg-cream">
        <Image src={article.image} alt="" fill className="object-cover" sizes="800px" />
      </div>
      <div className="mt-8 space-y-4 text-sm leading-8 text-ink-soft">
        {article.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <Link href="/products" className="btn btn-primary mt-10">
        رفتن به فروشگاه
      </Link>
    </article>
  );
}
