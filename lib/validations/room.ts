import { z } from "zod";

const optionalUrlSchema = z
  .string()
  .trim()
  .refine(
    (value) =>
      value === "" ||
      value.startsWith("/") ||
      /^https?:\/\/.+/i.test(value),
    {
      message:
        "Image must be a valid URL or a path starting with /.",
    }
  );

export const roomSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Room title is required.")
    .min(3, "Room title must contain at least 3 characters.")
    .max(100, "Room title cannot exceed 100 characters."),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug can only contain lowercase letters, numbers and hyphens."
    ),

  shortDescription: z
    .string()
    .trim()
    .max(
      220,
      "Short description cannot exceed 220 characters."
    )
    .optional()
    .or(z.literal("")),

  description: z
    .string()
    .trim()
    .max(
      3000,
      "Description cannot exceed 3000 characters."
    )
    .optional()
    .or(z.literal("")),

  pricePerNight: z.coerce
    .number({
      error: "Price must be a valid number.",
    })
    .min(0, "Price cannot be negative.")
    .max(1000000, "Price is too large."),

  capacity: z.coerce
    .number({
      error: "Capacity must be a valid number.",
    })
    .int("Capacity must be a whole number.")
    .min(1, "Capacity must be at least 1.")
    .max(50, "Capacity cannot exceed 50 guests."),

  roomSize: z
    .string()
    .trim()
    .max(100, "Room size cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  heroImage: optionalUrlSchema,

  galleryImages: z
    .array(optionalUrlSchema)
    .max(20, "You can add a maximum of 20 gallery images.")
    .default([]),

  amenities: z
    .array(
      z
        .string()
        .trim()
        .min(1, "Amenity cannot be empty.")
        .max(100, "Amenity cannot exceed 100 characters.")
    )
    .max(30, "You can add a maximum of 30 amenities.")
    .default([]),

  isFeatured: z.boolean().default(false),

  isPublished: z.boolean().default(true),

  displayOrder: z.coerce
    .number({
      error: "Display order must be a valid number.",
    })
    .int("Display order must be a whole number.")
    .min(0, "Display order cannot be negative.")
    .max(9999, "Display order is too large."),
});

export type RoomFormValues = z.infer<typeof roomSchema>;