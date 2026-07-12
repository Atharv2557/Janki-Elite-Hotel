"use client";

import Image from "next/image";
import { RoomGalleryImage } from "@/data/room-page";

type RoomGalleryProps = {
  images: RoomGalleryImage[];
  selectedImage: string;
  onImageSelect: (src: string) => void;
};

export function RoomGallery({
  images,
  selectedImage,
  onImageSelect,
}: RoomGalleryProps) {
  return (
    <div className="flex max-w-full gap-3 overflow-x-auto overflow-y-hidden pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {images.map((image) => {
        const active = selectedImage === image.src;

        return (
          <button
            key={image.id}
            type="button"
            onClick={() => onImageSelect(image.src)}
            className={`
              room-mini-thumb
              relative
              h-20
              w-24
              shrink-0
              overflow-hidden
              rounded-2xl
              border
              transition-all
              duration-[900ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                active
                  ? "scale-[1.04] border-[#d4af37] opacity-100 shadow-[0_14px_35px_rgba(212,175,55,0.22)]"
                  : "border-white/10 opacity-70 hover:-translate-y-1 hover:border-[#d4af37]/50 hover:opacity-100"
              }
            `}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="96px"
              className="room-mini-image object-cover"
            />
          </button>
        );
      })}
    </div>
  );
}