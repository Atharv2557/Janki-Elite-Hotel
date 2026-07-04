import Badge from "@/components/ui/badge/Badge";
import SectionHeading from "@/components/ui/heading/SectionHeading";

export default function AmenitiesHeader() {
  return (
    <div className="mx-auto mb-20 max-w-3xl text-center">
      <Badge>Amenities</Badge>

      <SectionHeading
        line1="Everything You Need"
        line2="For a Comfortable Stay"
      />

      <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-600">
        From premium rooms and dining to banquet spaces and guest services,
        Janki Elite is designed to make every stay effortless and memorable.
      </p>
    </div>
  );
}