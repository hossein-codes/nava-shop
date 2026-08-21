import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import ShellOverlays from "@/components/ShellOverlays";

export const metadata: Metadata = {
  title: {
    default: "نوا | فروشگاه آنلاین پوشاک",
    template: "%s | نوا",
  },
  description:
    "فروشگاه آنلاین پوشاک نوا؛ کالکشن زنانه، مردانه و بچگانه با ضمانت اصالت و ارسال سریع.",
  keywords: ["فروشگاه پوشاک", "لباس", "خرید آنلاین", "پوشاک زنانه", "پوشاک مردانه"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="flex min-h-screen flex-col bg-white">
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
