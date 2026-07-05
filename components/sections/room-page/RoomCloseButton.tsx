"use client";

import { X } from "lucide-react";

type RoomCloseButtonProps = {
  onClick: () => void;
};

export function RoomCloseButton({
  onClick,
}: RoomCloseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close room details"
      className="
        group
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        border-neutral-300
        bg-white/90
        backdrop-blur-md
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#9b7534]
        hover:bg-[#9b7534]
        hover:text-white
        active:scale-95
      "
    >
      <X
        size={20}
        className="transition-transform duration-300 group-hover:rotate-90"
      />
    </button>
  );
}