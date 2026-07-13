"use client";

import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { useContactSettings } from "@/components/providers/ContactSettingsProvider";

export default function LocationInfo() {
  const {
    address,
    primaryPhone,
    secondaryPhone,
    email,
    mapUrl,
  } = useContactSettings();

  const primaryPhoneHref =
    primaryPhone.replace(/[^\d+]/g, "");

  const secondaryPhoneHref =
    secondaryPhone.replace(/[^\d+]/g, "");

  const infoItems = [
    {
      icon: MapPin,
      label: "Address",
      value: address,
      href: mapUrl || "#",
      external: Boolean(mapUrl),
    },
    {
      icon: Phone,
      label: "Phone",
      value: primaryPhone,
      href: `tel:${primaryPhoneHref}`,
      external: false,
    },
    ...(secondaryPhone
      ? [
          {
            icon: Phone,
            label: "Alternate Phone",
            value: secondaryPhone,
            href: `tel:${secondaryPhoneHref}`,
            external: false,
          },
        ]
      : []),
    {
      icon: Mail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      external: false,
    },
  ];

  return (
    <div className="mt-8 grid gap-4 sm:mt-10">
      {infoItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            href={item.href}
            target={
              item.external
                ? "_blank"
                : undefined
            }
            rel={
              item.external
                ? "noopener noreferrer"
                : undefined
            }
            className="
              group
              flex
              gap-4
              rounded-[24px]
              border
              border-black/5
              bg-[var(--background)]
              p-5
              shadow-[0_12px_35px_rgba(0,0,0,0.04)]
              transition-all
              duration-500
              hover:-translate-y-1
              hover:bg-white
              hover:shadow-[0_20px_55px_rgba(0,0,0,0.08)]
            "
          >
            <span
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-[var(--primary)]/10
                text-[var(--primary)]
                transition-all
                duration-500
                group-hover:bg-[var(--primary)]
                group-hover:text-white
              "
            >
              <Icon
                size={22}
                strokeWidth={1.8}
              />
            </span>

            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-black/40">
                {item.label}
              </span>

              <span className="mt-2 block text-base leading-7 text-[#211711]">
                {item.value}
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}