import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

import GalleryHeader from "./GalleryHeader";
import GalleryGrid from "./GalleryGrid";

export default function Gallery() {
  return (
    <Section className="bg-white">
      <Container>
        <GalleryHeader />
        <GalleryGrid />

        <div className="mt-14 flex justify-center sm:mt-16">
          <Button href="/gallery" variant="dark">
            View Full Gallery
          </Button>
        </div>
      </Container>
    </Section>
  );
}