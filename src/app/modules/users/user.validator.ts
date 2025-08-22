import { z } from 'zod';

export const UserValidationSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  needsPasswordChange: z.boolean(),
  passwordChangedAt: z.coerce.date().optional(), // Accepts string or Date
  role: z.enum(['superAdmin', 'admin', 'student', 'faculty']),
  status: z.enum(['in-progress', 'blocked']),
  isDeleted: z.boolean(),
});