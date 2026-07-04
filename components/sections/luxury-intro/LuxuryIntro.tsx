import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import IntroContent from "./IntroContent";
import IntroImage from "./IntroImage";

export default function LuxuryIntro() {
  return (
    <section className="bg-[#f8f5ef]">
      <Container>
        <div
className="
grid
items-center
gap-16
lg:grid-cols-2
"
>
          <IntroContent />
          <IntroImage />
        </div>
      </Container>
    </section>
  );
}