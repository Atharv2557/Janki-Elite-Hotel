import { z } from "zod";

const whatsappNumberSchema = z
  .string()
  .trim()
  .min(10, "WhatsApp number must contain at least 10 digits.")
  .max(15, "WhatsApp number cannot exceed 15 digits.")
  .regex(
    /^\d+$/,
    "WhatsApp number must contain digits only, without +, spaces or dashes."
  );

const phoneSchema = z
  .string()
  .trim()
  .min(7, "Phone number must contain at least 7 characters.")
  .max(25, "Phone number cannot exceed 25 characters.");

const optionalUrlSchema = z
  .string()
  .trim()
  .max(500, "Map URL cannot exceed 500 characters.")
  .refine(
    (value) =>
      value.length === 0 ||
      /^https?:\/\/.+/i.test(value),
    {
      message:
        "Map URL must start with http:// or https://.",
    }
  );

export const contactSettingsSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(
      120,
      "Email address cannot exceed 120 characters."
    ),

  primaryPhone: phoneSchema,

  secondaryPhone: z
  .string()
  .trim()
  .max(
    25,
    "Secondary phone number cannot exceed 25 characters."
  ),

  whatsappNumber: whatsappNumberSchema,

  address: z
    .string()
    .trim()
    .min(
      5,
      "Address must contain at least 5 characters."
    )
    .max(
      300,
      "Address cannot exceed 300 characters."
    ),

  mapUrl: optionalUrlSchema,

  workingHours: z
    .string()
    .trim()
    .max(
      150,
      "Working hours cannot exceed 150 characters."
    ),
});

export type ContactSettingsFormValues = z.infer<
  typeof contactSettingsSchema
>;