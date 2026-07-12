import Badge from "@/components/ui/badge/Badge";
import SectionHeading from "@/components/ui/heading/SectionHeading";
import {Reveal} from "@/components/ui/reveal/Reveal";

export default function AmenitiesHeader() {
  return (
    <Reveal className="mx-auto mb-14 max-w-3xl text-center sm:mb-16 lg:mb-20">
      <Badge>Hotel Amenities</Badge>

      <SectionHeading
        line1="Everything You Need"
        line2="For A Comfortable Stay"
        // align="center"/
      />

      <p className="mx-auto mt-6 max-w-2xl px-1 text-base leading-8 text-black/60 sm:mt-8 sm:text-lg">
        Enjoy carefully selected amenities designed to make your stay smooth,
        comfortable, and memorable from check-in to checkout.
      </p>
    </Reveal>
  );
}