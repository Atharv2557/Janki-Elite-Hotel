import HeroBackground from "./HeroBackground";
import HeroOverlay from "./HeroOverlay";
import HeroContent from "./HeroContent";
import HeroFeatures from "./HeroFeatures";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <HeroBackground />
      <HeroOverlay />
      <HeroContent />
      <HeroFeatures />
    </section>
  );
}