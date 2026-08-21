import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // اجازه می‌دهد Dev Server درخواست‌های پیش‌نمایش (لایو پروکسی) را بپذیرد
  allowedDevOrigins: ["*.e2b.app", "*.app"],
};

export default nextConfig;
