import Badge from "@/components/ui/badge/Badge";
import SectionHeading from "@/components/ui/heading/SectionHeading";

import { gallery } from "@/data/gallery";

export default function GalleryHeader() {
  return (
    <div className="mx-auto mb-20 max-w-3xl text-center">
      <Badge>{gallery.badge}</Badge>

      <SectionHeading
        line1={gallery.title.line1}
        line2={gallery.title.line2}
      />

      <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-600">
        {gallery.description}
      </p>
    </div>
  );
}