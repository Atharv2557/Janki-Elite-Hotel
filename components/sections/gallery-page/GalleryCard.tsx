import Image from "next/image";
import { GalleryImage } from "@/data/gallery-page";

type GalleryCardProps = {
  item: GalleryImage;
  index?: number;
  onClick?: (item: GalleryImage) => void;
};

export default function GalleryCard({
  item,
  index = 0,
  onClick,
}: GalleryCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(item)}
      className="group premium-image-card relative block w-full border-0 bg-[#211711] p-0 text-left"
      aria-label={`Open ${item.title}`}
    >
      <div className="premium-image-wrap relative aspect-[4/5]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="premium-image"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black/70
            via-black/20
            to-transparent
            transition-opacity
            duration-700
            ease-out
            group-hover:opacity-90
          "
        />

        <div
          className="
            absolute inset-x-0 bottom-0
            p-6
            transition-transform
            duration-[1000ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:-translate-y-3
          "
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.28em] text-white/70">
            {item.category}
          </p>

          <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
        </div>
      </div>
    </button>
  );
}