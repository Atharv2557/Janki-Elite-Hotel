import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

import AmenitiesHeader from "./AmenitiesHeader";
import AmenitiesGrid from "./AmenitiesGrid";

export default function Amenities() {
  return (
    <Section className="bg-white">
      <Container>
        <AmenitiesHeader />
        <AmenitiesGrid />
      </Container>
    </Section>
  );
}