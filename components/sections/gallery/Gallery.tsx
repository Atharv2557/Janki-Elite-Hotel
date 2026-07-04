import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

import { gallery } from "@/data/gallery";

import GalleryHeader from "./GalleryHeader";
import GalleryGrid from "./GalleryGrid";

export default function Gallery() {
  return (
    <Section className="bg-[#f8f5ef]">
      <Container>
        <GalleryHeader />

        <GalleryGrid />

        <div className="mt-16 flex justify-center">
          <Button href={gallery.button.href}>
            {gallery.button.text}
          </Button>
        </div>
      </Container>
    </Section>
  );
}