import { Reveal}  from "@/components/ui/reveal/Reveal";

export function AmenitiesOverview() {
  return (
    <section className=" bg-[#fbf7f0] px-6 py-20 md:py-8">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <Reveal>
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[var(--primary)]">
              Comfort & Convenience
            </p>

            <h2 className="text-3xl font-semibold leading-tight text-[#211711] md:text-5xl">
              Everything You Need for a Relaxed Hotel Experience
            </h2>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div>
            <p className="text-base leading-8 text-black/60 md:text-lg">
              At Janki Elite, amenities are not just extra features — they are a
              part of the complete guest experience. From peaceful rooms and
              reliable service to dining, parking, and event support, every
              facility is designed to make your stay easy and enjoyable.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              <div>
                <h3 className="text-3xl font-semibold text-[#211711]">24/7</h3>
                <p className="mt-2 text-sm text-black/50">Guest Support</p>
              </div>

              <div>
                <h3 className="text-3xl font-semibold text-[#211711]">Free</h3>
                <p className="mt-2 text-sm text-black/50">Wi-Fi Access</p>
              </div>

              <div>
                <h3 className="text-3xl font-semibold text-[#211711]">Easy</h3>
                <p className="mt-2 text-sm text-black/50">Parking Facility</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}