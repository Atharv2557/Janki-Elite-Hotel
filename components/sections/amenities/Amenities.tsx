import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";

import AmenitiesHeader from "./AmenitiesHeader";
import AmenitiesGrid from "./AmenitiesGrid";

export default function Amenities() {
  return (
    <Section className="bg-[#f8f5ef]">
      <Container>
        <AmenitiesHeader />
        <AmenitiesGrid />
      </Container>
    </Section>
  );
}