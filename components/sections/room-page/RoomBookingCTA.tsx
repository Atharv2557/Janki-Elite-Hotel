import Image from "next/image";
import { RoomReveal } from "./RoomReveal";

export function RoomBookingCTA() {
  return (
    <section className="px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem]">
        <div className="relative min-h-130">
          <Image
            src="/images/hero/room-cta-main.jpg"
            alt="Premium hotel booking"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

          <div className="relative z-10 flex min-h-130 items-center justify-center px-6 py-20 text-center sm:px-10">
            <RoomReveal>
              <div className="mx-auto max-w-3xl">
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.45em] text-[#d8b46a]">
                  Reserve Your Experience
                </p>

                <h2 className="font-serif text-4xl font-light leading-tight text-white sm:text-5xl lg:text-7xl">
                  Ready for your{" "}
                  <span className="italic text-[#d8b46a]">next stay?</span>
                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/75">
                  Connect with us directly for availability, room details,
                  pricing, and quick booking support.
                </p>

                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                  <a
                    href="https://wa.me/919999999999?text=Hello%20I%20want%20to%20book%20a%20room"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#d8b46a] px-9 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[#241a14] transition duration-300 hover:-translate-y-1 hover:bg-[#f1d28a]"
                  >
                    Book Now
                  </a>

                  <a
                    href="https://wa.me/919999999999?text=Hello%20I%20need%20room%20details"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/30 px-9 py-4 text-xs font-bold uppercase tracking-[0.25em] text-white transition duration-300 hover:-translate-y-1 hover:border-[#d8b46a] hover:bg-white/10"
                  >
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>
            </RoomReveal>
          </div>
        </div>
      </div>
    </section>
  );
}