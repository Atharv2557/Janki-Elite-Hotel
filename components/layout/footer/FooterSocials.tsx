import Link from "next/link";
import { Circle, MapPinned } from "lucide-react";

import { footer } from "@/data/footer";

const icons = {
  Instagram : Circle,
  Facebook :Circle,
  "Google Maps": MapPinned,
};

export default function FooterSocials() {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
        Follow
      </h3>

      <div className="mt-6 flex gap-3">
        {footer.socials.map((social) => {
          const Icon = icons[social.label as keyof typeof icons];

          return (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-white/15
                text-white/70
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[var(--primary)]
                hover:bg-[var(--primary)]/10
                hover:text-[var(--primary)]
              "
            >
              <Icon size={18} />
            </Link>
          );
        })}
      </div>

      <Link
        href={footer.contact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open WhatsApp inquiry"
        className="
          mt-8
          inline-flex
          rounded-full
          bg-[var(--primary)]
          px-6
          py-3
          text-sm
          font-medium
          text-white
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        WhatsApp Inquiry
      </Link>
    </div>
  );
}