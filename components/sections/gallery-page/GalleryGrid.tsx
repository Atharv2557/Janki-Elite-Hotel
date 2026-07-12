"use client";

import {
  useCallback,
  useMemo,
  useState,
} from "react";

import Container from "@/components/ui/Container";
import GalleryCard from "./GalleryCard";
import GalleryFilter from "./GalleryFilter";
import GalleryLightbox from "./GalleryLightbox";

import {
  type GalleryCategory,
  type GalleryImage,
  galleryCategories,
} from "@/data/gallery-page";

type GalleryGridProps = {
  images: GalleryImage[];
};

export default function GalleryGrid({
  images,
}: GalleryGridProps) {
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("All");

  const [selectedImage, setSelectedImage] =
    useState<GalleryImage | null>(null);

  const availableCategories =
    useMemo<GalleryCategory[]>(() => {
      const usedCategories = new Set(
        images.map((image) => image.category)
      );

      return galleryCategories.filter(
        (category) =>
          category === "All" ||
          usedCategories.has(category)
      );
    }, [images]);

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") {
      return images;
    }

    return images.filter(
      (item) =>
        item.category === activeCategory
    );
  }, [activeCategory, images]);

  const handleCategoryChange = useCallback(
    (category: GalleryCategory) => {
      setActiveCategory(category);
      setSelectedImage(null);
    },
    []
  );

  const handleCloseLightbox =
    useCallback(() => {
      setSelectedImage(null);
    }, []);

  const handlePreviousImage =
    useCallback(() => {
      if (
        !selectedImage ||
        filteredImages.length === 0
      ) {
        return;
      }

      const currentIndex =
        filteredImages.findIndex(
          (item) =>
            item.id === selectedImage.id
        );

      const previousIndex =
        currentIndex <= 0
          ? filteredImages.length - 1
          : currentIndex - 1;

      setSelectedImage(
        filteredImages[previousIndex]
      );
    }, [filteredImages, selectedImage]);

  const handleNextImage =
    useCallback(() => {
      if (
        !selectedImage ||
        filteredImages.length === 0
      ) {
        return;
      }

      const currentIndex =
        filteredImages.findIndex(
          (item) =>
            item.id === selectedImage.id
        );

      const nextIndex =
        currentIndex ===
        filteredImages.length - 1
          ? 0
          : currentIndex + 1;

      setSelectedImage(
        filteredImages[nextIndex]
      );
    }, [filteredImages, selectedImage]);

  const currentImageIndex = selectedImage
    ? filteredImages.findIndex(
        (item) =>
          item.id === selectedImage.id
      )
    : 0;

  return (
    <>
      <section className="bg-[#f8f4ef] py-20">
        <Container>
          <div className="mb-10 max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-[var(--primary)]">
              Visual Experience
            </p>

            <h2 className="text-4xl font-semibold text-[#211711] md:text-5xl">
              Explore Our Spaces
            </h2>
          </div>

          {images.length === 0 ? (
            <div className="rounded-3xl border border-[#211711]/10 bg-white/50 px-6 py-20 text-center">
              <h3 className="font-serif text-3xl text-[#211711]">
                Gallery coming soon
              </h3>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#6f6257]">
                Our gallery is currently being
                updated. Please check again soon.
              </p>
            </div>
          ) : (
            <>
              <GalleryFilter
                categories={availableCategories}
                activeCategory={activeCategory}
                onCategoryChange={
                  handleCategoryChange
                }
              />

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredImages.map(
                  (item, index) => (
                    <GalleryCard
                      key={`${activeCategory}-${item.id}`}
                      item={item}
                      index={index}
                      onClick={
                        setSelectedImage
                      }
                    />
                  )
                )}
              </div>
            </>
          )}
        </Container>
      </section>

      <GalleryLightbox
        selectedImage={selectedImage}
        onClose={handleCloseLightbox}
        onPrevious={handlePreviousImage}
        onNext={handleNextImage}
        currentIndex={Math.max(
          currentImageIndex,
          0
        )}
        totalImages={
          filteredImages.length
        }
      />
    </>
  );
}