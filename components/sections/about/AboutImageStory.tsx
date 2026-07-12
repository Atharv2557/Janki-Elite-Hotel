import Image from "next/image";
import { Reveal } from "@/components/ui";

export function AboutImageStory() {
  return (
    <section className="relative overflow-hidden bg-[#fbf7f1] px-6 py-20 md:py-12">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <Reveal>
          <div className="relative">
            <div className="relative h-[420px] overflow-hidden rounded-[2rem] shadow-2xl md:h-[560px]">
              <Image
                src="/images/about/about-hotel.jpg"
                alt="Luxury hotel interior"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="absolute -bottom-8 right-6 hidden w-56 rounded-3xl border border-white/60 bg-white/90 p-5 shadow-xl backdrop-blur md:block">
              <p className="text-4xl font-semibold text-[#211711]">10+</p>
              <p className="mt-2 text-sm leading-6 text-black/60">
                Years of warm hospitality and memorable guest experiences.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#9b6a3c]">
              Experience
            </p>

            <h2 className="text-3xl font-semibold leading-tight text-[#211711] md:text-5xl">
              A stay that feels elegant, peaceful, and personal.
            </h2>

            <p className="mt-6 text-base leading-8 text-black/65">
              At Janki Elite, every corner is designed to make guests feel
              relaxed and cared for. From refined rooms to attentive service, we
              focus on comfort that feels effortless.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <p className="text-lg font-semibold text-[#211711]">
                  Elegant Rooms
                </p>
                <p className="mt-2 text-sm leading-6 text-black/60">
                  Calm interiors, premium comfort, and thoughtful details.
                </p>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <p className="text-lg font-semibold text-[#211711]">
                  Prime Location
                </p>
                <p className="mt-2 text-sm leading-6 text-black/60">
                  Easy access to Jaipur attractions, travel points, and markets.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}