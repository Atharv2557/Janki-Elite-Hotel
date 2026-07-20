import { Reveal } from "@/components/ui";

const stats = [
  {
    value: "20+",
    label: "Elegant Rooms",
    description: "Designed for peaceful and comfortable stays.",
  },
  {
    value: "10+",
    label: "Years Experience",
    description: "Serving guests with warm Jaipur hospitality.",
  },
  {
    value: "4.8",
    label: "Guest Rating",
    description: "Loved by travellers for comfort and service.",
  },
  {
    value: "24/7",
    label: "Guest Support",
    description: "Always available for a smooth stay experience.",
  },
];

export function AboutStats() {
  return (
    <section className="bg-white px-6 py-20 md:py-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#9b6a3c]">
              Our Promise
            </p>

            <h2 className="text-3xl font-semibold leading-tight text-[#211711] md:text-5xl">
              Built around comfort, care, and memorable stays.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.08}>
              <div className="group h-full rounded-[1.75rem] border border-black/10 bg-[#fbf7f1] p-6 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                <p className="text-4xl font-semibold text-[#211711] md:text-5xl">
                  {item.value}
                </p>

                <h3 className="mt-5 text-lg font-semibold text-[#211711]">
                  {item.label}
                </h3>

                <p className="mt-3 text-sm leading-6 text-black/60">
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