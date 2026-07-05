import Button from "@/components/ui/Button";
import type { Room } from "./types";

type RoomPriceProps = {
  room: Room;
};

export default function RoomPrice({ room }: RoomPriceProps) {
  return (
    <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-black/45">
          Starting From
        </p>

        <div className="mt-2 flex items-end gap-1">
          <span className="text-3xl font-semibold text-[#211711]">
            ₹{room.price.toLocaleString("en-IN")}
          </span>

          <span className="pb-1 text-sm text-black/50">
            / night
          </span>
        </div>
      </div>

      <Button
        href="/contact"
        variant="dark"
        className="w-full px-6 py-3 sm:w-auto"
      >
        Book Now
      </Button>
    </div>
  );
}