import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

import TestimonialsHeader from "./TestimonialsHeader";
import TestimonialsGrid from "./TestimonialsGrid";

export default function Testimonials() {
  return (
    <Section className="bg-white">
      <Container>
        <TestimonialsHeader />
        <TestimonialsGrid />
      </Container>
    </Section>
  );
}