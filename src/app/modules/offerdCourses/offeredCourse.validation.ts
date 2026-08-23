import { z } from 'zod';

const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;

const scheduleValidationSchema = z.object({
  day: z.enum([
    'SATURDAY',
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
  ]),

  startTime: z
    .string()
    .regex(
      timeRegex,
      'Invalid start time. Use format: 10:30 AM',
    ),

  endTime: z
    .string()
    .regex(
      timeRegex,
      'Invalid end time. Use format: 11:30 AM',
    ),
});

const createOfferedCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z
      .array(z.string())
      .optional()
      .default([]),
    maxCapacity: z.number().positive(),
    section: z.number().int().positive(),
    schedule: z
      .array(scheduleValidationSchema)
      .min(1, 'At least one schedule is required'),
  }),
});

const updateOfferedCourseValidationSchema = z.object({
  body: createOfferedCourseValidationSchema.shape.body.partial(),
});

export const OfferedCourseValidation = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};