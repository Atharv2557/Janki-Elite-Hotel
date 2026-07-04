import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-medium transition-all duration-300",
        variant === "primary" &&
          "bg-[var(--primary)] text-white hover:-translate-y-1 hover:shadow-2xl active:translate-y-0",
        variant === "secondary" &&
          "border border-white text-white hover:bg-white hover:text-black",
        className
      )}
    >
      {children}
    </Link>
  );
}