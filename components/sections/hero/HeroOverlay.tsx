export default function HeroOverlay() {
  return (
    <>
      <div className="absolute inset-0 z-10 bg-linear-to-r from-black/80 via-black/45 to-black/20" />

      <div className="absolute inset-0 z-10 bg-linear-to-t from-black/75 via-transparent to-black/30" />

      <div className="absolute left-0 top-0 z-10 h-130 w-130 rounded-full bg-(--primary)/20 blur-[140px]" />

      <div className="absolute bottom-0 right-0 z-10 h-105 w-105 rounded-full bg-white/10 blur-[130px]" />
    </>
  );
}