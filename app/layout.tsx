import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import ShellOverlays from "@/components/ShellOverlays";

export const metadata: Metadata = {
  title: {
    default: "نوا | فروشگاه زیبایی و مراقبت پوست",
    template: "%s | نوا",
  },
  description:
    "فروشگاه آنلاین لوازم آرایشی و مراقبت پوست نوا؛ سرم، آرایش، عطر و ضدآفتاب اصل با مشاوره تخصصی.",
  keywords: ["لوازم آرایشی", "مراقبت پوست", "سرم", "رژلب", "ضدآفتاب", "نوا"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="flex min-h-screen flex-col bg-cream text-ink">
        <Providers>
          <Header />
          <main className="flex-1 pb-20 lg:pb-0">{children}</main>
          <Footer />
          <BottomNav />
          <ShellOverlays />
        </Providers>
      </body>
    </html>
  );
}
