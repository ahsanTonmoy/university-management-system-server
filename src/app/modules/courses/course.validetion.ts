import { z } from 'zod';

const preRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

export const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),

    preRequisiteCourses: z
      .array(preRequisiteCourseValidationSchema)
      .optional(),
  }),
});

export const updateCourseValidationSchema = z.object({
  body: createCourseValidationSchema.shape.body.partial().optional(),
});

export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};