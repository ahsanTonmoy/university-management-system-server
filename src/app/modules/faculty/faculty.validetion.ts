import { z } from 'zod';

// Name Validation
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: 'First name is required' })
    .max(20, { message: 'First name cannot be more than 20 characters' }),

  lastName: z
    .string()
    .trim()
    .min(1, { message: 'Last name is required' })
    .max(20, { message: 'Last name cannot be more than 20 characters' }),
});

// Create Faculty Validation
export const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    faculty: z.object({
      designation: z
        .string({
          required_error: 'Designation is required',
        })
        .trim(),

      name: userNameValidationSchema,

      gender: z.enum(['male', 'female', 'other'], {
        required_error: 'Gender is required',
      }),

      dateOfBirth: z.string().optional(),

      email: z
        .string({
          required_error: 'Email is required',
        })
        .email('Invalid email address'),

      contactNo: z
        .string({
          required_error: 'Contact number is required',
        })
        .min(11)
        .max(15),

      emergencyContactNo: z
        .string({
          required_error: 'Emergency contact number is required',
        })
        .min(11)
        .max(15),

      presentAddress: z.string({
        required_error: 'Present address is required',
      }),

      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),

      profileImage: z.string().optional(),

      academicFaculty: z.string({
        required_error: 'Academic Faculty ID is required',
      }),

      academicDepartment: z.string({
        required_error: 'Academic Department ID is required',
      }),

      isDeleted: z.boolean().optional().default(false),
    }),
  }),
});



export const updateFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      designation: z.string().trim().optional(),
      name: userNameValidationSchema.partial().optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().min(11).max(15).optional(),
      emergencyContactNo: z.string().min(11).max(15).optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      profileImage: z.string().optional(),
      academicFaculty: z.string().optional(),
      academicDepartment: z.string().optional(),
      isDeleted: z.boolean().optional(),
    })
   
  }),
});