import Image from "next/image";

export default function ContactHero() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden py-4">
      <Image
        src="/images/hero/about-hotel.jpg"
        alt="Janki Elite Hotel Contact"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-[var(--primary)]">
          Get In Touch
        </p>

        <h1 className="font-serif text-5xl leading-tight md:text-7xl">
          Contact Janki Elite
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
          Have a question about rooms, bookings, dining, or events? Our team is
          here to help you plan a comfortable and memorable stay in Jaipur.
        </p>
      </div>
    </section>
  );
}