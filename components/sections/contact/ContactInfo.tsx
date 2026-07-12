import { Reveal } from "@/components/ui";

type ContactInfoProps = {
  email: string;
  primaryPhone: string;
  secondaryPhone?: string;
  address: string;
  workingHours?: string;
};

export default function ContactInfo({
  email,
  primaryPhone,
  secondaryPhone = "",
  address,
  workingHours = "",
}: ContactInfoProps) {
  const contactItems = [
    {
      title: "Call Us",
      detail: primaryPhone,
        detail2: secondaryPhone,
      description:
        workingHours ||
        "Speak directly with our reservations team.",
    },
    {
      title: "Email Us",
      detail: email,
      description:
        "Send us your booking or event inquiry.",
    },
    {
      title: "Visit Us",
      detail: address,
      description:
        "Located conveniently for business and leisure stays.",
    },
  ];

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-[var(--primary)]">
              Reach Us
            </p>

            <h2 className="font-serif text-4xl text-[#211711] md:text-5xl">
              We Are Always Here To Help
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {contactItems.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.12}
            >
              <div className="h-full rounded-[2rem] border border-black/10 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                <h3 className="font-serif text-2xl text-[#211711]">
                  {item.title}
                </h3>

     <p className="mt-4 break-words text-lg font-medium text-[var(--primary)]">
  {item.detail}

  {item.detail2 && (
    <>
      <br />
      {item.detail2}
    </>
  )}
</p>

                <p className="mt-3 leading-7 text-black/60">
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