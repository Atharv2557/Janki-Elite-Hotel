export type GalleryCategory =
  | "All"
  | "Rooms"
  | "Dining"
  | "Amenities"
  | "Hotel"
  | "Events";

export type GalleryImage = {
  id: string | number;
  title: string;
  category: Exclude<GalleryCategory, "All">;
  image: string;
  alt: string;
};

export const galleryCategories: GalleryCategory[] = [
  "All",
  "Rooms",
  "Dining",
  "Amenities",
  "Hotel",
  "Events",
];