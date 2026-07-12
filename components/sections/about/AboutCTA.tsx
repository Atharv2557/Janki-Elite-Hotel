import Link from "next/link";
import {Reveal} from "@/components/ui/reveal/Reveal";

const whatsappNumber = "919999999999";

const whatsappMessage =
  "Hello Janki Elite, I want to know more about your hotel and room availability.";

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage
)}`;

export function AboutCTA() {
  return (
    <section className="bg-white px-6 py-20 md:py-10">
      <Reveal>
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#211711] px-6 py-14 text-center text-white shadow-2xl md:px-12 md:py-20">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-white/55">
            Plan Your Stay
          </p>

          <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
            Ready to experience comfort and hospitality at Janki Elite?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/65">
            Connect with us directly on WhatsApp for room availability,
            bookings, special requests, or any stay-related inquiry.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#9b6a3c] px-8 text-sm font-semibold text-white transition duration-300 hover:bg-[#b77b45]"
            >
              WhatsApp Inquiry
            </Link>

            <Link
              href="/rooms"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-8 text-sm font-semibold text-white transition duration-300 hover:bg-white hover:text-[#211711]"
            >
              Explore Rooms
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}