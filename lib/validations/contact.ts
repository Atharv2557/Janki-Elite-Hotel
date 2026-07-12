import { z } from "zod";

export const contactInquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters.")
    .max(80, "Name cannot exceed 80 characters."),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(120, "Email cannot exceed 120 characters."),

  phone: z
    .string()
    .trim()
    .max(20, "Phone number cannot exceed 20 characters.")
    .optional()
    .default(""),

  subject: z
    .string()
    .trim()
    .max(150, "Subject cannot exceed 150 characters.")
    .optional()
    .default(""),

  message: z
    .string()
    .trim()
    .min(10, "Message must contain at least 10 characters.")
    .max(2000, "Message cannot exceed 2000 characters."),
});

export const contactInquiryStatusSchema = z.enum([
  "new",
  "read",
  "resolved",
]);

export type ContactInquiryFormValues = z.infer<
  typeof contactInquirySchema
>;

export type ContactInquiryStatus = z.infer<
  typeof contactInquiryStatusSchema
>;