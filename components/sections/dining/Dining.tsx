import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

import DiningContent from "./DiningContent";
import DiningImage from "./DiningImage";

export default function Dining() {
  return (
    <Section className="bg-[var(--background)]">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <DiningImage />
          <DiningContent />
        </div>
      </Container>
    </Section>
  );
}