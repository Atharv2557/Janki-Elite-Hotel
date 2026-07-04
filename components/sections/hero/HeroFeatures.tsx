import { heroContent } from "@/data/hero";

export default function HeroFeatures() {
  return (
    <div className="absolute bottom-0 z-20 w-full border-t border-white/10 bg-black/30 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-8 px-6 py-6 text-sm uppercase tracking-[0.2em] text-white/90">
        {heroContent.features.map((feature) => (
          <span key={feature}>{feature}</span>
        ))}
      </div>
    </div>
  );
}