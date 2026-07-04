import { Users, BedDouble, Ruler } from "lucide-react";
import { Room } from "./types";

type Props = {
  room: Room;
};

export default function RoomFeatures({ room }: Props) {
  return (
    <div className="mt-6 grid gap-3">
      <div className="flex items-center gap-3 text-gray-600">
        <Users size={18} className="text-[var(--primary)]" />
        <span>{room.guests} Guests</span>
      </div>

      <div className="flex items-center gap-3 text-gray-600">
        <BedDouble size={18} className="text-[var(--primary)]" />
        <span>{room.beds} King Bed</span>
      </div>

      <div className="flex items-center gap-3 text-gray-600">
        <Ruler size={18} className="text-[var(--primary)]" />
        <span>{room.area}</span>
      </div>
    </div>
  );
}