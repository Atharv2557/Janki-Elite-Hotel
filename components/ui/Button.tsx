import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark";
  className?: string;
  showArrow?: boolean;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className,
  showArrow = true,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium transition-all duration-500",
        "focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40",
        variant === "primary" &&
          "bg-[var(--primary)] text-white shadow-sm hover:-translate-y-1 hover:shadow-xl",
        variant === "secondary" &&
          "border border-white/25 text-white hover:-translate-y-1 hover:bg-white hover:text-black",
        variant === "dark" &&
          "border border-black/10 bg-[#211711] text-white hover:-translate-y-1 hover:shadow-xl",
        className
      )}
    >
      <span>{children}</span>

      {showArrow && (
        <ArrowRight
          size={16}
          className="transition-transform duration-500 group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}