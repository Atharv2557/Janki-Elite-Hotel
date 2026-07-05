"use client";

import { RoomFeature } from "@/data/room-page";


type RoomAmenitiesProps = {
  features: RoomFeature[];
};

export function RoomAmenities({
  features,
}: RoomAmenitiesProps) {
  return (
    <div className="mt-10">
      
      <p className="mb-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
         Features
      </p>
      <h3 className="mt-3 font-serif text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
                    Amenities
                  </h3>
      <div className="mt-4 mb-5 h-px w-18 bg-[#d4af37]" />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="
              group
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-4
              py-3
              backdrop-blur-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-[#d4af37]/40
              hover:bg-white/10
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-[#d4af37]/15
                text-[#d4af37]
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              ✓
            </div>

            <span className="text-sm font-medium text-white">
              {feature.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}