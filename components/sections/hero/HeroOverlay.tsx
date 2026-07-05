export default function HeroOverlay() {
  return (
    <>
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-transparent to-black/30" />

      <div className="absolute left-0 top-0 z-10 h-[520px] w-[520px] rounded-full bg-[var(--primary)]/20 blur-[140px]" />

      <div className="absolute bottom-0 right-0 z-10 h-[420px] w-[420px] rounded-full bg-white/10 blur-[130px]" />
    </>
  );
}