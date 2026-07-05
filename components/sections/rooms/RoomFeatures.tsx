import { BedDouble, Ruler, Users } from "lucide-react";
import type { Room } from "./types";

type RoomFeaturesProps = {
  room: Room;
};

export default function RoomFeatures({ room }: RoomFeaturesProps) {
  return (
    <div className="mt-6 grid grid-cols-3 gap-3 border-y border-black/10 py-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <Users size={18} className="text-[var(--primary)]" />
        <span className="text-xs font-medium text-black/60">
          {room.guests} Guests
        </span>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <BedDouble size={18} className="text-[var(--primary)]" />
        <span className="text-xs font-medium text-black/60">
          {room.beds} Bed
        </span>
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <Ruler size={18} className="text-[var(--primary)]" />
        <span className="text-xs font-medium text-black/60">
          {room.area}
        </span>
      </div>
    </div>
  );
}