"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import { navigationLinks } from "@/data/navigation";
import { cn } from "@/lib/utils/cn";

type MobileMenuProps = {
  scrolled?: boolean;
};

export default function MobileMenu({ scrolled = false }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Toggle navigation menu"
        className={cn(
          "inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-300",
          scrolled
            ? "border-black/10 bg-black/5 text-black hover:bg-black/10"
            : "border-white/15 bg-white/10 text-white hover:bg-white/20"
        )}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div
          className="
            absolute
            left-5
            right-5
            top-[86px]
            z-[60]
            overflow-hidden
            rounded-[28px]
            border
            border-black/10
            bg-white/95
            p-4
            shadow-2xl
            backdrop-blur-xl
          "
        >
          <div className="grid gap-1">
            {navigationLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-2xl px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black/65 transition-colors duration-300 hover:bg-black/5 hover:text-black",
                    active && "bg-[var(--primary)]/10 text-[var(--primary)]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="
              mt-4
              inline-flex
              w-full
              items-center
              justify-center
              rounded-full
              bg-[var(--primary)]
              px-6
              py-4
              text-sm
              font-medium
              uppercase
              tracking-[0.2em]
              text-white
            "
          >
            Book Now
          </Link>
        </div>
      )}
    </div>
  );
}