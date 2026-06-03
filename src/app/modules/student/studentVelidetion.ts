// zod for student validation
import { z } from "zod";

export const createStudentZodSchema = z.object({
    body: z.object({
        password: z.string().min(6).max(20).optional(),
        student: z.object({
            name: z.object({
                firstName: z.string().max(20),
                lastName: z.string().max(20)
            }),
            email: z.string().email('Invalid email address'),
            emergencyContactNo: z.string().max(15),
            department: z.string().max(100),
            semester: z.number().max(50)
    })
    })
}); 