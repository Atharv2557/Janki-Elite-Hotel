import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

import LocationContent from "./LocationContent";
import LocationMap from "./LocationMap";

export default function Location() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <LocationContent />
          <LocationMap />
        </div>
      </Container>
    </Section>
  );
}