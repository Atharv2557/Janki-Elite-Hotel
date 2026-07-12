import {Reveal} from "@/components/ui/reveal/Reveal";

const reasons = [
  {
    title: "Peaceful Luxury",
    description:
      "A calm and elegant atmosphere designed for guests who want comfort without noise or stress.",
  },
  {
    title: "Warm Hospitality",
    description:
      "Friendly service, quick assistance, and personal care that makes every guest feel welcomed.",
  },
  {
    title: "Modern Comfort",
    description:
      "Well-planned rooms, essential amenities, clean interiors, and a smooth stay experience.",
  },
  {
    title: "Jaipur Convenience",
    description:
      "A comfortable location for business guests, family stays, city visits, and weekend travel.",
  },
];

export function AboutWhyChoose() {
  return (
    <section className="relative overflow-hidden bg-[#211711] px-6 py-20 text-white md:py-8">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[#9b6a3c]/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-white/55">
              Why Choose Us
            </p>

            <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
              Everything you need for a relaxed and refined hotel stay.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/65">
              From peaceful rooms to attentive service, Janki Elite focuses on
              making every stay smooth, comfortable, and memorable.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {reasons.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <div className="group h-full rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition duration-300 hover:-translate-y-2 hover:bg-white/[0.1] md:p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-[#e8c59f]">
                  0{index + 1}
                </div>

                <h3 className="text-xl font-semibold">{item.title}</h3>

                <p className="mt-4 text-sm leading-7 text-white/60">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}