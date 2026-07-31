import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonLinkVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonLinkSize = "sm" | "md" | "lg";

type ButtonLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    children: ReactNode;
    variant?: ButtonLinkVariant;
    size?: ButtonLinkSize;
  };

const variantClasses: Record<ButtonLinkVariant, string> = {
  primary: "bg-green-700 text-white hover:bg-green-800",
  secondary:
    "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50",
  danger:
    "border border-red-300 bg-white text-red-700 hover:bg-red-50",
  ghost: "text-zinc-700 hover:bg-zinc-100",
};

const sizeClasses: Record<ButtonLinkSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3",
};

export default function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={[
        "inline-flex items-center justify-center rounded-xl font-medium transition",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </Link>
  );
}