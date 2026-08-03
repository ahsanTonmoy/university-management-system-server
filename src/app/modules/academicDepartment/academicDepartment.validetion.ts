import { z } from 'zod';

export const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Department name is required',
      })
      .trim()
      .min(1, 'Department name cannot be empty'),

    academicFeculty: z.string({
      required_error: 'Academic Faculty ID is required',
    }),
  }),
});

export const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1).optional(),
    academicFeculty: z.string().optional(),
  }),
});
