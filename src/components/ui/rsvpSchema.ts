import { z } from "zod";

export const rsvpSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  guests: z
    .number({ error: "Choose the number of guests." })
    .int()
    .min(1, "At least one guest is required.")
    .max(10, "Please choose no more than 10 guests."),
  attendance: z.enum(["accept", "decline"], {
    error: "Please let us know if you can attend.",
  }),
  message: z
    .string()
    .trim()
    .max(500, "Please keep your message under 500 characters.")
    .optional(),
});

