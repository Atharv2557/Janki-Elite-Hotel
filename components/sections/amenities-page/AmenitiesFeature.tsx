import Image from "next/image";
import  {Reveal}  from "@/components/ui/reveal/Reveal";

export function AmenitiesFeature() {
  return (
    <section className=" bg-[#fbf7f0] px-6 py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl md:aspect-[5/6]">
            <Image
              src="/images/about/about-1.jpg"
              alt="Luxury hotel amenities at Janki Elite"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[var(--primary)]">
              Premium Stay Experience
            </p>

            <h2 className="text-3xl font-semibold leading-tight text-[#211711] md:text-5xl">
              Designed to Make Every Stay Feel Effortless
            </h2>

            <p className="mt-6 text-base leading-8 text-black/60 md:text-lg">
              Whether you are visiting Jaipur for business, family travel, or a
              relaxing getaway, our amenities are planned to support every moment
              of your stay — from arrival to checkout.
            </p>

            <div className="mt-8 space-y-5">
              <Reveal delay={250}>
                <div className="rounded-2xl border border-black/10 bg-[#fbfaf8] p-5">
                  <h3 className="font-semibold text-[#211711]">
                    Comfortable Daily Convenience
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-black/55">
                    Essential facilities like Wi-Fi, parking, dining, and room
                    service help keep your stay smooth and stress-free.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={350}>
                <div className="rounded-2xl border border-black/10 bg-[#fbfaf8] p-5">
                  <h3 className="font-semibold text-[#211711]">
                    Suitable for Every Guest
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-black/55">
                    From solo travelers to families and small events, our spaces
                    are created to match different stay needs.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}