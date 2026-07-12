export function AboutHero() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#211711] px-6 text-center text-white py-30">
      <div className="absolute inset-0 bg-black/35" />

      <div className="relative z-10 max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-white/70">
          About Janki Elite
        </p>

        <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
          A Luxury Stay Crafted for Comfort
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
          Experience warm hospitality, elegant interiors, and a peaceful stay in
          the heart of Jaipur.
        </p>
      </div>
    </section>
  );
}