"use client";

import { createWhatsAppUrl } from "@/lib/utils/whatsapp";

type RoomBookingPanelProps = {
  price: string;
  roomTitle?: string;
};

export function RoomBookingPanel({
  price,
  roomTitle = "Room",
}: RoomBookingPanelProps) {
  const whatsappUrl = createWhatsAppUrl({
    roomTitle,
    price,
    intent: "book",
  });

  return (
    <div
      data-booking-panel
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.06]
        p-5
        backdrop-blur-md
        sm:p-6
      "
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d4af37]">
            Starting From
          </p>

          <h3 className="mt-2 font-serif text-3xl leading-none text-white sm:text-4xl">
            {price}
          </h3>
        </div>

        <div className="hidden rounded-full border border-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-white/50 sm:block">
          Per Night
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-white/60">
        Includes premium bedding, peaceful ambience, modern comfort, and hotel
        assistance for your stay.
      </p>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Book ${roomTitle} on WhatsApp`}
      className="
              group
              mt-6
              inline-flex
              w-full
              items-center
              justify-center
              rounded-full
              bg-[#d4af37]
              px-7
              py-4
              text-xs
              font-bold
              uppercase
              tracking-[0.25em]
              text-[#241A14]
              transition-all
              duration-500
              hover:-translate-y-1
              hover:bg-[#e6c65c]
              hover:shadow-[0_18px_45px_rgba(212,175,55,0.28)]
              active:scale-95"
      >
      <span>Book on WhatsApp</span>
      <span className="ml-3 transition-transform duration-300 group-hover:translate-x-1"> → </span>
      </a>
    </div>
  );
}