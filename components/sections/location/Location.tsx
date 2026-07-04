import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

import LocationContent from "./LocationContent";
import LocationMap from "./LocationMap";

export default function Location() {
  return (
    <Section className="bg-[#f8f5ef]">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <LocationContent />

          <LocationMap />
        </div>
      </Container>
    </Section>
  );
}