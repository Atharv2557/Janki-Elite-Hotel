"use client";

import { createWhatsAppUrl } from "@/lib/utils/whatsapp";

export function FloatingWhatsAppCTA() {
  const whatsappUrl = createWhatsAppUrl({
    roomTitle: "Rooms",
    intent: "inquiry",
  });

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Inquire about rooms on WhatsApp"
      className="
        group
        fixed
        bottom-5
        right-5
        z-[80]
        inline-flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-[#25D366]
        text-white
        shadow-[0_20px_60px_rgba(37,211,102,0.35)]
        transition-all
        duration-500
        hover:-translate-y-1
        hover:scale-105
        hover:shadow-[0_24px_70px_rgba(37,211,102,0.45)]
        active:scale-95
        sm:bottom-8
        sm:right-8
        sm:h-16
        sm:w-16
      "
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="h-7 w-7 transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8"
        fill="currentColor"
      >
        <path d="M16.02 3.2C8.95 3.2 3.2 8.94 3.2 16c0 2.25.59 4.45 1.72 6.39L3.1 29l6.78-1.78A12.76 12.76 0 0 0 16.02 28.8C23.08 28.8 28.8 23.06 28.8 16S23.08 3.2 16.02 3.2Zm0 23.42c-1.94 0-3.84-.52-5.5-1.51l-.4-.24-4.02 1.05 1.08-3.92-.26-.41A10.55 10.55 0 0 1 5.4 16c0-5.86 4.76-10.62 10.62-10.62S26.62 10.14 26.62 16 21.86 26.62 16.02 26.62Zm5.82-7.95c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.71.16-.21.32-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.89-1.78-2.21-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.71-1.71-.98-2.35-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64s1.14 3.06 1.3 3.27c.16.21 2.24 3.42 5.42 4.79.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.14-1.51.26-.74.26-1.38.18-1.51-.08-.13-.29-.21-.61-.37Z" />
      </svg>

      <span
        className="
          pointer-events-none
          absolute
          right-[70px]
          hidden
          whitespace-nowrap
          rounded-full
          border
          border-white/10
          bg-[#241A14]
          px-4
          py-2
          text-[11px]
          font-semibold
          uppercase
          tracking-[0.22em]
          text-white
          opacity-0
          shadow-xl
          transition-all
          duration-300
          group-hover:translate-x-0
          group-hover:opacity-100
          sm:block
        "
      >
        WhatsApp
      </span>
    </a>
  );
}