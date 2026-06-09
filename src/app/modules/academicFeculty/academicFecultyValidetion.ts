import z from "zod";

export const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string(),
  }),
});

