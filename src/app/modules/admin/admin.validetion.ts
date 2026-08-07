import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
    })
    .trim(),
  lastName: z
    .string({
      required_error: 'Last name is required',
    })
    .trim(),
});

const adminValidationSchema = z.object({
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
    .min(11, 'Contact number must be at least 11 digits')
    .max(15, 'Contact number cannot exceed 15 digits'),

  emergencyContactNo: z
    .string({
      required_error: 'Emergency contact number is required',
    })
    .min(11, 'Emergency contact number must be at least 11 digits')
    .max(15, 'Emergency contact number cannot exceed 15 digits'),

  presentAddress: z.string({
    required_error: 'Present address is required',
  }),

  permanentAddress: z.string({
    required_error: 'Permanent address is required',
  }),

  profileImage: z.string().optional(),

  managementDepartment: z.string({
    required_error: 'Management Department is required',
  }),

  isDeleted: z.boolean().optional().default(false),
});

const createAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      designation: z.string({
        required_error: 'Designation is required',
      })
      .trim(),

    name: userNameValidationSchema,

    gender: z.enum(['male', 'female', 'other'], {
      required_error: 'Gender is required',
    }),

    dateOfBirth: z.string().optional(),

    email: z.string({
        required_error: 'Email is required',
      })
      .email('Invalid email address'),

    contactNo: z.string({
        required_error: 'Contact number is required',
      })
      .min(11, 'Contact number must be at least 11 digits')
      .max(15, 'Contact number cannot exceed 15 digits'),

    emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      })
      .min(11, 'Emergency contact number must be at least 11 digits')
      .max(15, 'Emergency contact number cannot exceed 15 digits'),

    presentAddress: z.string({
      required_error: 'Present address is required',
    }),

    permanentAddress: z.string({
      required_error: 'Permanent address is required',
    }),
    profileImage: z.string().optional(),
    isDeleted: z.boolean().optional().default(false),
      })
  }),
});

const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      designation: z
    .string({
      required_error: 'Designation is required',
    })
    .trim().optional(),

  name: userNameValidationSchema.optional(),

  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Gender is required',
  }).optional(),

  dateOfBirth: z.string().optional(),

  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email address').optional(),

  contactNo: z
    .string({
      required_error: 'Contact number is required',
    })
    .min(11, 'Contact number must be at least 11 digits')
    .max(15, 'Contact number cannot exceed 15 digits').optional(),

  emergencyContactNo: z
    .string({
      required_error: 'Emergency contact number is required',
    })
    .min(11, 'Emergency contact number must be at least 11 digits')
    .max(15, 'Emergency contact number cannot exceed 15 digits').optional(),

  presentAddress: z.string({
    required_error: 'Present address is required',
  }).optional(),

  permanentAddress: z.string({
    required_error: 'Permanent address is required',
  }).optional(),

  profileImage: z.string().optional(),

  managementDepartment: z.string({
    required_error: 'Management Department is required',
  }).optional(),

  isDeleted: z.boolean().optional().default(false),
    })
  }),
});

export const AdminValidation = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
