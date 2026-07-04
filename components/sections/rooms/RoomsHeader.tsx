import Badge from "@/components/ui/badge/Badge";
import SectionHeading from "@/components/ui/heading/SectionHeading";

export default function RoomsHeader() {
  return (
    <div className="mx-auto mb-20 max-w-3xl text-center">
      <Badge>Our Rooms</Badge>

      <SectionHeading
        line1="Choose Your"
        line2="Perfect Stay"
      />

      <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-600">
        Discover thoughtfully designed rooms that combine
        modern comfort, elegant interiors, and exceptional
        hospitality for every guest.
      </p>
    </div>
  );
}