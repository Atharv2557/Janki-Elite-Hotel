import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

import RoomsHeader from "./RoomsHeader";
import RoomsGrid from "./RoomsGrid";

export default function Rooms() {
  return (
    <Section className="bg-white">
      <Container>
        <RoomsHeader />

        <RoomsGrid />

        <div className="mt-16 flex justify-center">
          <Button href="/rooms">View All Rooms</Button>
        </div>
      </Container>
    </Section>
  );
}