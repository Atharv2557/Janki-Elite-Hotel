import {Reveal} from "@/components/ui/reveal/Reveal";

const values = [
  {
    title: "Cleanliness First",
    description:
      "Every room and common area is maintained with careful attention to hygiene, freshness, and guest comfort.",
  },
  {
    title: "Guest-Centered Service",
    description:
      "We focus on small details, quick support, and helpful service so guests can enjoy a smooth stay.",
  },
  {
    title: "Comfort With Style",
    description:
      "Our spaces are designed to feel elegant, peaceful, and practical for both leisure and business travellers.",
  },
];

export function AboutValues() {
  return (
    <section className="bg-[#fbf7f1] px-6 py-20 md:py-15">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <Reveal>
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#9b6a3c]">
              Our Values
            </p>

            <h2 className="text-3xl font-semibold leading-tight text-[#211711] md:text-5xl">
              Small details that make every stay feel better.
            </h2>

            <p className="mt-6 text-base leading-8 text-black/65">
              Our values guide how we design spaces, welcome guests, and
              maintain the everyday experience at Janki Elite.
            </p>
          </div>
        </Reveal>

        <div className="space-y-5">
          {values.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.1}>
              <div className="group rounded-[1.75rem] border border-black/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-7">
                <div className="mb-4 flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#211711] text-sm font-semibold text-white">
                    0{index + 1}
                  </span>

                  <h3 className="text-xl font-semibold text-[#211711]">
                    {item.title}
                  </h3>
                </div>

                <p className="text-sm leading-7 text-black/60">
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