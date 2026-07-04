import Link from "next/link";
import { footer } from "@/data/footer";

export default function FooterLinks() {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
        Quick Links
      </h3>

      <ul className="mt-6 grid gap-4">
        {footer.quickLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="
                inline-flex
                text-white/65
                transition-all
                duration-300
                hover:translate-x-1
                hover:text-white
              "
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}