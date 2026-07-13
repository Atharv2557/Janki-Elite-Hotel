"use client";

import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { useContactSettings } from "@/components/providers/ContactSettingsProvider";

export default function FooterContact() {
  const {
    email,
    primaryPhone,
    secondaryPhone,
    address,
  } = useContactSettings();

  const primaryPhoneHref =
    primaryPhone.replace(/[^\d+]/g, "");

  const secondaryPhoneHref =
    secondaryPhone.replace(/[^\d+]/g, "");

  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--primary)]">
        Contact
      </h3>

      <div className="mt-6 grid gap-5 text-white/65">
        <div className="flex gap-3 leading-7">
          <MapPin
            size={18}
            className="mt-1 shrink-0 text-[var(--primary)]"
          />

          <span>{address}</span>
        </div>

        <Link
          href={`tel:${primaryPhoneHref}`}
          className="flex gap-3 transition-colors duration-300 hover:text-white"
        >
          <Phone
            size={18}
            className="shrink-0 text-[var(--primary)]"
          />

          <span>{primaryPhone}</span>
        </Link>

        {secondaryPhone && (
          <Link
            href={`tel:${secondaryPhoneHref}`}
            className="flex gap-3 transition-colors duration-300 hover:text-white"
          >
            <Phone
              size={18}
              className="shrink-0 text-[var(--primary)]"
            />

            <span>{secondaryPhone}</span>
          </Link>
        )}

        <Link
          href={`mailto:${email}`}
          className="flex gap-3 transition-colors duration-300 hover:text-white"
        >
          <Mail
            size={18}
            className="shrink-0 text-[var(--primary)]"
          />

          <span>{email}</span>
        </Link>
      </div>
    </div>
  );
}