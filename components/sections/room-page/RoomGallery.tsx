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
              relative
              h-20
              w-24
              shrink-0
              overflow-hidden
              rounded-2xl
              transition-all
              duration-300
              ${
                active
                  ? "ring-2 ring-[#d4af37] scale-105"
                  : "opacity-70 hover:opacity-100 hover:scale-105"
              }
            `}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </button>
        );
      })}
    </div>
  );
}