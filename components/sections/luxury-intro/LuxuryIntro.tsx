import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

import IntroContent from "./IntroContent";
import IntroImage from "./IntroImage";
import IntroStats from "./IntroStats";

export default function LuxuryIntro() {
  return (
    <Section className="bg-[var(--background)] pt-4 sm:pt-10 lg:pt-8">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 pt-4 sm:pt-6 lg:order-1 lg:pt-8">
            <IntroImage />
          </div>

          <div className="order-1 lg:order-2">
            <IntroContent />
            {/* <IntroStats /> */}
          </div>
        </div>
      </Container>
    </Section>
  );
}