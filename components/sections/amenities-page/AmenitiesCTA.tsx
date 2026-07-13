"use client";

import Link from "next/link";

import { useContactSettings } from "@/components/providers/ContactSettingsProvider";
import { Reveal } from "@/components/ui/reveal/Reveal";

export function AmenitiesCTA() {
  const { whatsappNumber } =
    useContactSettings();

  const message =
    "Hello Janki Elite, I want to know more about your hotel amenities.";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <section className="bg-[#fbf7f0] px-6 py-20 md:py-4">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] bg-[#211711] px-6 py-14 text-center md:px-12 md:py-20">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-white/60">
              Need More Details?
            </p>

            <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-tight text-white md:text-5xl">
              Want to Confirm Amenities Before Booking?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/65">
              Message us directly on WhatsApp and our team will help you with
              room facilities, dining, parking, booking support, and other hotel
              details.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[var(--primary)] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#211711]"
              >
                Ask on WhatsApp
              </Link>

              <Link
                href="/rooms"
                className="rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white hover:text-[#211711]"
              >
                Explore Rooms
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}