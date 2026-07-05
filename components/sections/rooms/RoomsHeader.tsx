import Badge from "@/components/ui/badge/Badge";
import SectionHeading from "@/components/ui/heading/SectionHeading";
import Reveal from "@/components/ui/reveal/Reveal";

export default function RoomsHeader() {
  return (
    <Reveal className="mx-auto mb-14 max-w-3xl text-center sm:mb-16 lg:mb-20">
      <Badge>Our Rooms</Badge>

      <SectionHeading
        line1="Choose Your"
        line2="Perfect Stay"
        // align="center"
      />

      <p className="mx-auto mt-6 max-w-2xl px-1 text-base leading-8 text-black/60 sm:mt-8 sm:text-lg">
        Discover thoughtfully designed rooms that combine modern comfort,
        elegant interiors, and exceptional hospitality for every guest.
      </p>
    </Reveal>
  );
}