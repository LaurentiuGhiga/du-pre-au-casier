import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
          {eyebrow}
        </p>
      )}

      <div className="mt-2 flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold text-zinc-900">
          {title}
        </h1>

        {actions}
      </div>

      {description && (
        <p className="mt-3 text-zinc-600">
          {description}
        </p>
      )}
    </div>
  );
}