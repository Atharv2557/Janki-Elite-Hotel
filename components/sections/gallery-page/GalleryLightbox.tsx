"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect } from "react";
import { GalleryImage } from "@/data/gallery-page";

type GalleryLightboxProps = {
  selectedImage: GalleryImage | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalImages: number;
};

export default function GalleryLightbox({
  selectedImage,
  onClose,
  onPrevious,
  onNext,
  currentIndex,
  totalImages,
}: GalleryLightboxProps) {
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, onClose, onPrevious, onNext]);

  if (!selectedImage) return null;

  const formattedCurrentIndex = String(currentIndex + 1).padStart(2, "0");
  const formattedTotalImages = String(totalImages).padStart(2, "0");

  return (
    <div
      className="fixed inset-0 z-[999] flex animate-lightboxFade items-center justify-center bg-black/90 px-4 py-6 backdrop-blur-md md:px-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery image preview"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#211711] transition-all duration-300 hover:scale-105 hover:bg-[#f8f4ef] md:right-5 md:top-5 md:h-11 md:w-11"
        aria-label="Close gallery preview"
      >
        <X size={18} />
      </button>

      <div className="absolute left-4 top-4 z-20 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium tracking-[0.22em] text-white backdrop-blur-md md:left-5 md:top-5 md:px-5 md:py-3 md:text-sm">
        {formattedCurrentIndex} / {formattedTotalImages}
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onPrevious();
        }}
        className="absolute bottom-6 left-1/2 z-20 flex h-11 w-11 -translate-x-[120%] items-center justify-center rounded-full bg-white/90 text-[#211711] transition-all duration-300 hover:scale-105 hover:bg-white md:left-8 md:top-1/2 md:h-14 md:w-14 md:-translate-x-0 md:-translate-y-1/2"
        aria-label="Previous image"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        className="absolute bottom-6 left-1/2 z-20 flex h-11 w-11 translate-x-[20%] items-center justify-center rounded-full bg-white/90 text-[#211711] transition-all duration-300 hover:scale-105 hover:bg-white md:left-auto md:right-8 md:top-1/2 md:h-14 md:w-14 md:translate-x-0 md:-translate-y-1/2"
        aria-label="Next image"
      >
        <ChevronRight size={22} />
      </button>

      <div
        className="relative w-full max-w-5xl animate-lightboxZoom overflow-hidden rounded-2xl bg-black shadow-2xl md:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-[4/5] w-full sm:aspect-[16/10]">
          <Image
            src={selectedImage.image}
            alt={selectedImage.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/85 to-transparent p-5 pb-16 md:p-8">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.28em] text-white/60 md:text-xs">
            {selectedImage.category}
          </p>

          <h3 className="text-2xl font-semibold text-white md:text-4xl">
            {selectedImage.title}
          </h3>
        </div>
      </div>
    </div>
  );
}