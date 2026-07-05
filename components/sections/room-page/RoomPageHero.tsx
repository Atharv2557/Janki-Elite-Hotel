import Image from "next/image";
import Link from "next/link";
import { RoomReveal } from "./RoomReveal";

export function RoomPageHero() {
  return (
    <section className="relative min-h-[86vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/about/about-main.jpg"
          alt="Luxury hotel room"
          fill
          priority
          className="scale-105 object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-[#241a14]/20" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[86vh] max-w-7xl items-center px-4 pt-28 sm:px-6 lg:px-8">
        <RoomReveal delay={0.15}>
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.45em] text-[#d8b46a]">
              Rooms & Suites
            </p>

            <h1 className="max-w-4xl font-serif text-5xl font-light leading-[1.05] text-white sm:text-6xl lg:text-8xl">
              Quiet luxury,{" "}
              <span className="italic text-[#d8b46a]">privately yours.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Discover elegant rooms designed with warm textures, peaceful
              comfort, thoughtful details, and a calm premium stay experience.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#rooms"
                className="inline-flex items-center justify-center rounded-full bg-[#d8b46a] px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-[#241a14] transition duration-300 hover:-translate-y-1 hover:bg-[#f1d28a]"
              >
                Explore Rooms
              </Link>

              <a
                href="https://wa.me/919999999999?text=Hello%20I%20want%20to%20book%20a%20room"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/35 px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-white transition duration-300 hover:-translate-y-1 hover:border-[#d8b46a] hover:bg-white/10"
              >
                Book Now
              </a>
            </div>
          </div>
        </RoomReveal>
      </div>
    </section>
  );
}