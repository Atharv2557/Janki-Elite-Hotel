import Button from "@/components/ui/Button";
import { Room } from "./types";

type Props = {
  room: Room;
};

export default function RoomPrice({ room }: Props) {
  return (
    <div
      className="
        mt-8
        flex
        flex-col
        gap-5
        border-t
        border-gray-100
        pt-6
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div>
        <p className="text-sm text-gray-500">Starting From</p>

        <h4 className="mt-1 text-3xl font-bold text-[var(--primary)]">
          ₹{room.price.toLocaleString("en-IN")}
        </h4>

        <p className="text-sm text-gray-500">per night</p>
      </div>

      <Button href="/contact" className="sm:px-6 sm:py-3">
        Book Now
      </Button>
    </div>
  );
}