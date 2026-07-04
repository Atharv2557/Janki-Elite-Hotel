import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { footer } from "@/data/footer";

export default function FooterContact() {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
        Contact
      </h3>

      <div className="mt-6 grid gap-5 text-white/65">
        <div className="flex gap-3 leading-7">
          <MapPin size={18} className="mt-1 shrink-0 text-[var(--primary)]" />
          <span>{footer.contact.address}</span>
        </div>

        <Link
          href={`tel:${footer.contact.phone.replace(/\s/g, "")}`}
          className="flex gap-3 transition-colors duration-300 hover:text-white"
        >
          <Phone size={18} className="shrink-0 text-[var(--primary)]" />
          <span>{footer.contact.phone}</span>
        </Link>

        <Link
          href={`mailto:${footer.contact.email}`}
          className="flex gap-3 transition-colors duration-300 hover:text-white"
        >
          <Mail size={18} className="shrink-0 text-[var(--primary)]" />
          <span>{footer.contact.email}</span>
        </Link>
      </div>
    </div>
  );
}