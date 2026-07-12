import { Reveal } from "@/components/ui";

export function AboutIntro() {
  return (
    <section className="px-6 py-20 md:py-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#9b6a3c]">
            Our Story
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-[#211711] md:text-5xl">
            Designed for guests who value calm, class, and comfort.
          </h2>
        </Reveal>

        <Reveal delay={0.35}>
          <p className="mt-6 max-w-3xl text-base leading-8 text-black/65">
            Janki Elite brings together thoughtful design, modern convenience,
            and traditional Jaipur hospitality to create a stay that feels both
            premium and personal.
          </p>
        </Reveal>
      </div>
    </section>
  );
}