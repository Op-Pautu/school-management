import { z } from "zod"

export const schoolFormSchema = z.object({
  name: z.string().min(1, "Name required"),
  address: z.string().min(1, "Address required"),
  city: z.string().min(1, "City required"),
  state: z.string().min(1, "State required"),
  contact: z.string().regex(/^\d{10}$/, "10-digit mobile number"),
  email_id: z.string().email("Invalid email"),
  image: z
    .unknown()
    .refine((val): val is FileList => {
      return typeof FileList !== "undefined" && val instanceof FileList
    }, "Must be a file list")
    .refine((fl) => (fl as FileList).length === 1, "Image required")
    .refine(
      (fl) =>
        ["image/jpeg", "image/png", "image/webp"].includes(
          (fl as FileList)[0].type
        ),
      "Only JPG / PNG / WebP"
    ),
})
