import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

import TestimonialsHeader from "./TestimonialsHeader";
import TestimonialsMarquee from "./TestimonialsMarquee";

export default function Testimonials() {
  return (
    <Section className="bg-[var(--background)]">
      <Container>
        <TestimonialsHeader />
      </Container>

      <TestimonialsMarquee />
    </Section>
  );
}