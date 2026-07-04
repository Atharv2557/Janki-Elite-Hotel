import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

import DiningContent from "./DiningContent";
import DiningImage from "./DiningImage";

export default function Dining() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <DiningImage />
          <DiningContent />
        </div>
      </Container>
    </Section>
  );
}