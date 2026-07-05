import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type NavLogoProps = {
  scrolled?: boolean;
};

export default function NavLogo({ scrolled = false }: NavLogoProps) {
  return (
    <Link href="/" className="group inline-flex flex-col">
      <span
        className={cn(
          "text-2xl font-semibold leading-none tracking-wide transition-colors duration-300",
          scrolled
            ? "text-[#211711] group-hover:text-[var(--primary)]"
            : "text-white group-hover:text-[var(--primary)]"
        )}
      >
        Janki Elite
      </span>

      <span
        className={cn(
          "mt-1 text-[10px] font-medium uppercase tracking-[0.34em] transition-colors duration-300",
          scrolled ? "text-black/50" : "text-white/60"
        )}
      >
        Jaipur
      </span>
    </Link>
  );
}