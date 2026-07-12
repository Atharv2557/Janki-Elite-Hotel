import Badge from "@/components/ui/badge/Badge";
import SectionHeading from "@/components/ui/heading/SectionHeading";
import {Reveal} from "@/components/ui/reveal/Reveal";

import { gallery } from "@/data/gallery";

export default function GalleryHeader() {
  return (
    <Reveal className="mx-auto mb-14 max-w-3xl text-center sm:mb-16 lg:mb-20">
      <Badge>{gallery.badge}</Badge>

      <SectionHeading
        line1={gallery.title.line1}
        line2={gallery.title.line2}
        // align="center"
      />

      <p className="mx-auto mt-6 max-w-2xl px-1 text-base leading-8 text-black/60 sm:mt-8 sm:text-lg">
        {gallery.description}
      </p>
    </Reveal>
  );
}