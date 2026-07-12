import { z } from "zod";

const galleryImageUrlSchema = z
  .string()
  .trim()
  .min(1, "Gallery image is required.")
  .refine(
    (value) =>
      value.startsWith("/") ||
      /^https?:\/\/.+/i.test(value),
    {
      message:
        "Image must be a valid URL or a path starting with /.",
    }
  );

const galleryStoragePathSchema = z
  .string()
  .trim()
  .min(1, "Storage path is required.")
  .max(
    500,
    "Storage path cannot exceed 500 characters."
  );

export const galleryImageSchema = z.object({
  title: z
    .string()
    .trim()
    .max(
      120,
      "Image title cannot exceed 120 characters."
    )
    .default(""),

  altText: z
    .string()
    .trim()
    .min(
      3,
      "Alt text must contain at least 3 characters."
    )
    .max(
      180,
      "Alt text cannot exceed 180 characters."
    ),

  category: z
    .string()
    .trim()
    .min(1, "Please select an image category.")
    .max(
      50,
      "Category cannot exceed 50 characters."
    ),

  imageUrl: galleryImageUrlSchema,

  storagePath: galleryStoragePathSchema,

  displayOrder: z.coerce
    .number({
      error: "Display order must be a valid number.",
    })
    .int("Display order must be a whole number.")
    .min(
      0,
      "Display order cannot be negative."
    )
    .max(
      9999,
      "Display order is too large."
    ),

  isPublished: z.boolean().default(true),
});

export type GalleryImageFormValues = z.infer<
  typeof galleryImageSchema
>;