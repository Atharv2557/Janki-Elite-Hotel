import { Reveal } from "@/components/ui";

export default function ContactMap() {
  return (
    <section className="px-6 pb-24 md:pb-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-[var(--primary)]">
              Location
            </p>

            <h2 className="font-serif text-4xl text-[#211711] md:text-5xl">
              Find Us In Jaipur
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-black/60">
              Easily reach Janki Elite from key areas of Jaipur. Use the map
              below to get directions and plan your visit.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-sm">
            <iframe
              title="Janki Elite Hotel Location"
              src="https://www.google.com/maps?q=Janki%20Elite%20Hotel%20Jaipur%20Rajasthan%20India&output=embed"
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}