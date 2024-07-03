import { z } from "zod";

export const validationSchema = z
  .object({
    time: z
      .string()
      .min(1, "Run time is required")
      .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Run time must be in HH:mm format"),
    scheduleDate: z.date(),
    messageTitle: z.string().min(1, "Message title is required"),
    message: z.string().min(1, "Message is required"),
    recipients: z.array(z.string().min(1, "Recipient is required")),
    repeat: z.string().optional(),
    repeatActive: z.boolean(),
    platform: z.string().min(1, "Platform is required"),
    finalDate: z
      .date()
      .optional()
      .refine((finalDate) => {
        return finalDate ? finalDate.getTime() >= new Date().getTime() : true;
      }, "Final date cannot be in the past"),
    custom: z.string().optional(),
  })
  .refine(
    ({ time, scheduleDate }) => {
      const now = new Date();
      const runTimeDate = new Date(scheduleDate.toDateString() + " " + time);
      return runTimeDate.getTime() >= now.getTime();
    },
    {
      message: "Time cannot be in the past",
      path: ["time"],
    },
  );
