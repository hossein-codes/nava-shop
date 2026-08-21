import type { ReactNode } from "react";

export default function EmptyState({
  icon,
  title,
  text,
  action,
}: {
  icon: ReactNode;
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream text-ink-soft">
        {icon}
      </span>
      <p className="mt-5 text-lg font-semibold">{title}</p>
      <p className="mt-2 max-w-sm text-sm leading-7 text-ink-soft">{text}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
