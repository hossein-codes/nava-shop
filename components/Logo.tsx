import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * آیکون لوگوی اختصاصی «نوا»
 * حرف «ن» از مسیر واقعی فونت وزیرمتن (بدنه) + دو نقطه نارنجی
 */
export function LogoMark({
  className,
  size = 44,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      aria-hidden
    >
      {/* پس‌زمینه */}
      <rect width="64" height="64" rx="17" fill="#101b33" />

      {/* بدنه حرف «ن» — مسیر واقعی از فونت وزیرمتن Black */}
      <g transform="matrix(0.038462,0,0,-0.038462,4.153846,40)">
        <path
          fill="#ffffff"
          d="M718 -136Q858 -136 940.0 -91.5Q1022 -47 1057.0 30.5Q1092 108 1092 208Q1092 314 1057.0 428.0Q1022 542 976 652L1261 758Q1320 604 1343.0 476.5Q1366 349 1366 214Q1366 -93 1198.5 -267.5Q1031 -442 718 -442Q503 -442 361.5 -359.0Q220 -276 151.0 -132.5Q82 11 82 194Q82 316 109.0 446.5Q136 577 187 707L446 608Q408 500 382.0 398.0Q356 296 356 209Q356 115 389.0 36.5Q422 -42 501.0 -89.0Q580 -136 718 -136Z"
        />
      </g>

      {/* دو نقطه — امضای نارنجی برند */}
      <circle cx="34" cy="13" r="4.6" fill="#ff5a1e" />
      <circle cx="45" cy="17" r="4.6" fill="#ff5a1e" />
    </svg>
  );
}

/**
 * لوگوی کامل «نوا»: آیکون + واژه + قوس منحنی
 */
export default function Logo({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const light = variant === "light";
  return (
    <Link
      href="/"
      aria-label="نوا — فروشگاه پوشاک"
      className={cn("group inline-flex select-none items-center gap-2.5 leading-none", className)}
    >
      <LogoMark size={42} className="transition-transform duration-300 group-hover:rotate-[-6deg]" />

      {/* واژه + قوس */}
      <span className="flex flex-col">
        <span
          className={cn(
            "text-[1.7rem] font-black tracking-tight",
            light ? "text-white" : "text-ink"
          )}
        >
          نوا
        </span>
        {/* قوس نارنجی زیر واژه */}
        <svg
          viewBox="0 0 56 9"
          preserveAspectRatio="none"
          className={cn(
            "mt-0.5 h-[5px] w-[54px] transition-transform duration-300 group-hover:-translate-y-[1px]",
            light ? "text-clay-bright" : "text-clay"
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          aria-hidden
        >
          <path d="M3 6.5 C 17 1.5, 39 1.5, 53 6.5" />
        </svg>
      </span>
    </Link>
  );
}
