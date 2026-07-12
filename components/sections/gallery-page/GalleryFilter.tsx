import { GalleryCategory } from "@/data/gallery-page";

type GalleryFilterProps = {
  categories: GalleryCategory[];
  activeCategory: GalleryCategory;
  onCategoryChange: (category: GalleryCategory) => void;
};

export default function GalleryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: GalleryFilterProps) {
  return (
    <div className="mb-12 flex flex-wrap gap-3">
      {categories.map((category) => {
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300 ${
              isActive
                ? "border-[#211711] bg-[#211711] text-white"
                : "border-black/10 bg-white text-black/60 hover:border-[#211711] hover:text-[#211711]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}