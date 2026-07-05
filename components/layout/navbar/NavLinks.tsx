"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigationLinks } from "@/data/navigation";
import { cn } from "@/lib/utils/cn";

type NavLinksProps = {
  scrolled?: boolean;
};

export default function NavLinks({ scrolled = false }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-7 xl:gap-8 lg:flex">
      {navigationLinks.map((link) => {
        const active = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "group relative text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300",
              scrolled
                ? "text-black/65 hover:text-black"
                : "text-white/80 hover:text-white",
              active && "text-[var(--primary)]"
            )}
          >
            {link.label}

            <span
              className={cn(
                "absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-[var(--primary)] transition-transform duration-300",
                "group-hover:scale-x-100",
                active && "scale-x-100"
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}