import z from "zod";

export const createSemesterRegistrationValidationSchema = z.object({
  body: z
    .object({
      academicSemester: z.string({
        required_error: 'Academic semester is required',
      }),
      status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']),
      startDate: z.coerce.date({
        required_error: 'Start date is required',
      }),
      endDate: z.coerce.date({
        required_error: 'End date is required',
      }),
      minCredits: z
        .number()
        .min(0, 'Minimum credits cannot be negative'),
      maxCredits: z
        .number()
        .min(0, 'Maximum credits cannot be negative'),
    })
    .refine(
      (data) => data.maxCredits >= data.minCredits,
      {
        message: 'Maximum credits must be greater than or equal to minimum credits',
        path: ['maxCredits'],
      },
    )
    .refine(
      (data) => data.endDate > data.startDate,
      {
        message: 'End date must be after start date',
        path: ['endDate'],
      },
    ),
});

export const updateSemesterRegistrationValidationSchema = z.object({
    body: z
      .object({
        academicSemester: z.string().optional(),
        status: z.enum(['UPCOMING', 'ONGOING', 'ENDED']).optional(),
        startDate: z.coerce.date().optional(),
        endDate: z.coerce.date().optional(),
        minCredits: z.number().min(0, 'Minimum credits cannot be negative').optional(),
        maxCredits: z.number().min(0, 'Maximum credits cannot be negative').optional(),
      })
      .refine(
        (data) => !data.maxCredits || !data.minCredits || data.maxCredits >= data.minCredits,
        {
          message: 'Maximum credits must be greater than or equal to minimum credits',
          path: ['maxCredits'],
        },
      )
      .refine(
        (data) => !data.endDate || !data.startDate || data.endDate > data.startDate,
        {
          message: 'End date must be after start date',
          path: ['endDate'],
        },
      )
      .optional()
})