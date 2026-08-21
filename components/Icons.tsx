import type { SVGProps } from "react";

/**
 * مجموعه آیکون‌های SVG سبک (بدون وابستگی خارجی)
 * همه‌ی آیکون‌ها رنگ فعلی (currentColor) را می‌گیرند.
 */

type IconProps = SVGProps<SVGSVGElement> & { filled?: boolean };

function base(props: IconProps): IconProps {
  return {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    width: 24,
    height: 24,
    ...props,
  };
}

export function CartIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M2.5 3h2l2.6 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20.5 7H6.1" />
      <circle cx="9.5" cy="20" r="1.3" />
      <circle cx="17" cy="20" r="1.3" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  const { filled, ...rest } = props;
  return (
    <svg {...base(rest)} fill={filled === true ? "currentColor" : "none"}>
      <path d="M12 20.5s-7.5-4.6-9.4-9A5.4 5.4 0 0 1 12 6.2a5.4 5.4 0 0 1 9.4 5.3c-1.9 4.4-9.4 9-9.4 9Z" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.8-3.8" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 6.5h16M4 12h16M4 17.5h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  const { filled, ...rest } = props;
  return (
    <svg {...base(rest)} fill={filled === true ? "currentColor" : "none"} strokeWidth={1.4}>
      <path d="M12 3.4l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.9 6.8 19.4l1-5.8-4.2-4.1 5.8-.8L12 3.4Z" />
    </svg>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6.5 7l.8 12a2 2 0 0 0 2 1.8h5.4a2 2 0 0 0 2-1.8l.8-12" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14" />
    </svg>
  );
}

/** پیکان «رفتن به بعدی» — در RTL به سمت چپ است */
export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.2 8 7.5 9.5 4.3-1.5 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 6.5h10.5V17H3zM13.5 10H18l2.5 3v4h-7" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="16.5" cy="17.5" r="1.8" />
    </svg>
  );
}

export function RefreshIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 11A8 8 0 1 0 18.3 16" />
      <path d="M20 5v6h-6" />
    </svg>
  );
}

export function WalletIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M16 12.5h5M3 9.5h18" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 4h4l1.5 4.5-2.2 1.6a13 13 0 0 0 5.6 5.6l1.6-2.2L20 15v4a1.8 1.8 0 0 1-2 1.8A16.5 16.5 0 0 1 3.2 6 1.8 1.8 0 0 1 5 4Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m4 7.5 8 6 8-6" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s-6.5-5.2-6.5-10A6.5 6.5 0 0 1 12 4.5 6.5 6.5 0 0 1 18.5 11c0 4.8-6.5 10-6.5 10Z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="16.8" cy="7.2" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m21 4-3 15.5-6.3-2.8-2.9 3L7 13.5 21 4Z" />
      <path d="M8.8 15.7 21 4" />
    </svg>
  );
}

export function WhatsappIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.2A8.5 8.5 0 1 0 12 3.5Z" />
      <path d="M9 8.5c0 3.8 2.7 6.5 6.5 6.5l.9-1.9-2-1.2-1 .8a5 5 0 0 1-2.1-2.1l.8-1-1.2-2L9 8.5Z" />
    </svg>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </svg>
  );
}

export function FilterIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 6h16M7 12h10M10 18h4" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m4 11 8-7 8 7" />
      <path d="M6 9.5V20h12V9.5" />
    </svg>
  );
}

export function PackageIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="M4 7.5l8 4.5 8-4.5M12 12v9" />
    </svg>
  );
}

export function CreditCardIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3 10h18M7 15h4" />
    </svg>
  );
}

export function BankIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m3 9 9-5.5L21 9" />
      <path d="M5 9v8M9.5 9v8M14.5 9v8M19 9v8M3 20h18M3 17h18" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function QuoteIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M9.5 6C6.5 7.4 5 10 5 13.4V18h5.2v-5.2H7.8c.2-2 1.2-3.3 3-4.2L9.5 6Zm9 0c-3 1.4-4.5 4-4.5 7.4V18h5.2v-5.2h-2.4c.2-2 1.2-3.3 3-4.2L18.5 6Z" />
    </svg>
  );
}

export function LogoutIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14 4H6.5A1.5 1.5 0 0 0 5 5.5v13A1.5 1.5 0 0 0 6.5 20H14M10 12h10M16 8l4 4-4 4" />
    </svg>
  );
}

export function RulerIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m14.5 4.5 5 5L8 21l-5-5L14.5 4.5Z" />
      <path d="m10 9 1.5 1.5M13 6l1.5 1.5M7 12l1.5 1.5M16 9l1.5 1.5" />
    </svg>
  );
}

export function TagIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" />
      <circle cx="7.5" cy="7.5" r="1.3" />
    </svg>
  );
}

export function BoxIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 7 12 2.5 20.5 7v10L12 21.5 3.5 17V7Z" />
      <path d="M3.5 7 12 11.5 20.5 7M12 11.5V21.5" />
    </svg>
  );
}

export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M12 2.5c.7 4.6 2.9 6.8 7.5 7.5-4.6.7-6.8 2.9-7.5 7.5-.7-4.6-2.9-6.8-7.5-7.5C9.1 9.3 11.3 7.1 12 2.5Z" />
    </svg>
  );
}

export function ShoppingBagIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 10V6a3 3 0 0 1 6 0v4" />
    </svg>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.4 13.6a7.6 7.6 0 0 0 0-3.2l2-1.6-2-3.4-2.5 1a7.6 7.6 0 0 0-2.7-1.6L13.8 2h-3.6l-.4 2.8a7.6 7.6 0 0 0-2.7 1.6l-2.5-1-2 3.4 2 1.6a7.6 7.6 0 0 0 0 3.2l-2 1.6 2 3.4 2.5-1a7.6 7.6 0 0 0 2.7 1.6l.4 2.8h3.6l.4-2.8a7.6 7.6 0 0 0 2.7-1.6l2.5 1 2-3.4-2-1.6Z" />
    </svg>
  );
}

export function HistoryIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.5-6" />
      <path d="M3.5 4v5h5" />
      <path d="M12 7.5V12l3 2.2" />
    </svg>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.2" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2" />
    </svg>
  );
}

export function SortIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h10M4 12h7M4 17h4" />
      <path d="M16 6v12M16 18l3-3M16 18l-3-3" />
    </svg>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="18" cy="5.5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="18.5" r="2.5" />
      <path d="m8.2 13.2 7.6 4.1M15.8 6.7l-7.6 4.1" />
    </svg>
  );
}
