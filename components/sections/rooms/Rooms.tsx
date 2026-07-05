import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

import RoomsHeader from "./RoomsHeader";
import RoomsGrid from "./RoomsGrid";

export default function Rooms() {
  return (
    <Section className="bg-[var(--background)]">
      <Container>
        <RoomsHeader />
        <RoomsGrid />

        <div className="mt-14 flex justify-center sm:mt-16">
          <Button href="/rooms" variant="dark">
            View All Rooms
          </Button>
        </div>
      </Container>
    </Section>
  );
}