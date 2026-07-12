export function AmenitiesHero() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#211711] py-30">
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-4xl animate-[heroReveal_900ms_ease-out_forwards] px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/70">
          Hotel Facilities
        </p>

        <h1 className="text-4xl font-semibold leading-tight text-white md:text-6xl">
          Amenities Designed for a Comfortable Stay
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
          From elegant rooms to thoughtful services, every detail at Janki Elite
          is crafted to make your stay smooth, relaxing, and memorable.
        </p>
      </div>
    </section>
  );
}