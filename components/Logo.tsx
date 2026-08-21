import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({
  className,
  size = 40,
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
      <rect width="64" height="64" rx="10" fill="#1A1816" />
      <g transform="matrix(0.038462,0,0,-0.038462,4.153846,40)">
        <path
          fill="#ffffff"
          d="M718 -136Q858 -136 940.0 -91.5Q1022 -47 1057.0 30.5Q1092 108 1092 208Q1092 314 1057.0 428.0Q1022 542 976 652L1261 758Q1320 604 1343.0 476.5Q1366 349 1366 214Q1366 -93 1198.5 -267.5Q1031 -442 718 -442Q503 -442 361.5 -359.0Q220 -276 151.0 -132.5Q82 11 82 194Q82 316 109.0 446.5Q136 577 187 707L446 608Q408 500 382.0 398.0Q356 296 356 209Q356 115 389.0 36.5Q422 -42 501.0 -89.0Q580 -136 718 -136Z"
        />
      </g>
      <circle cx="34" cy="13" r="4.4" fill="#C45C26" />
      <circle cx="45" cy="17" r="4.4" fill="#C45C26" />
    </svg>
  );
}

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
      className={cn("inline-flex shrink-0 items-center gap-2.5", className)}
    >
      <LogoMark size={38} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[1.55rem] font-semibold tracking-tight",
            light ? "text-white" : "text-ink"
          )}
        >
          نوا
        </span>
        <span className={cn("mt-1 text-[10px] font-medium tracking-[0.18em]", light ? "text-white/70" : "text-ink/45")}>
          NAVA
        </span>
      </span>
    </Link>
  );
}
