import { Navbar } from "@/components/layout/navbar";
import {
  AboutCTA,
  AboutHero,
  AboutImageStory,
  AboutIntro,
  AboutStats,
  AboutValues,
  AboutWhyChoose,
} from "@/components/sections/about";

export default function AboutPage() {
  return (
    <main className="bg-white">
        <Navbar/>
      <AboutHero />
      <AboutIntro />
      <AboutImageStory />
      <AboutStats />
      <AboutWhyChoose />
      <AboutValues />
      <AboutCTA />
    </main>
  );
}