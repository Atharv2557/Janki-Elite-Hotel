import Button from "@/components/ui/Button";
import type { Room } from "./types";

type RoomPriceProps = {
  room: Room;
};

export default function RoomPrice({ room }: RoomPriceProps) {
  return (
    <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-center">
      {/* <div> */}
        {/* <p className="text-sm font-medium uppercase tracking-[0.22em] text-black/45">
          
        </p> */}

        {/* <div className="mt-2 flex items-end gap-1">
          <span className="text-3xl  text-[#211711]">
            ₹{room.price.toLocaleString("en-IN")}
          </span>

          <span className="pb-1 text-sm text-black/50">
            
          </span>
        </div> */}
      {/* </div> */}

      <Button
        href="/rooms"
        variant="primary"
        className="w-full px-6 py-3 sm:w-auto justify-center "
      >
        Book Now
      </Button>
    </div>
  );
}