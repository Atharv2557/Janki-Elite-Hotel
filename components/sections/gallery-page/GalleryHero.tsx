import Container from "@/components/ui/Container";

export default function GalleryHero() {
  return (
    <section className="relative overflow-hidden bg-[#efe4d6] pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(191,146,91,0.18),transparent_32%),linear-gradient(135deg,#f8f4ef_0%,#efe4d6_45%,#f8f4ef_100%)]" />

      <div className="absolute left-0 top-0 h-full w-[35%] bg-[#211711]/[0.04]" />
      <div className="absolute bottom-[-120px] right-[-120px] h-[360px] w-[360px] rounded-full bg-[#b9905f]/20 blur-3xl" />

      <Container>
        <div className="relative z-10 flex min-h-[70vh] items-center py-20">
          <div className="max-w-3xl">
            <p className="animate-heroEyebrow mb-4 text-sm font-medium uppercase tracking-[0.35em] text-[#b9905f] opacity-0">
              Gallery
            </p>

            <h1 className="animate-heroTitle text-5xl font-semibold leading-tight text-[#211711] opacity-0 md:text-7xl">
              A Glimpse Into Luxury
            </h1>

            <p className="animate-heroText mt-6 max-w-2xl text-base leading-8 text-black/60 opacity-0 md:text-lg">
              Explore elegant rooms, warm dining spaces, and refined details
              captured through the timeless experience of Janki Elite.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}


