// zod for student validation
import { z } from "zod";

export const createStudentZodSchema = z.object({

  body: z.object({
    password: z.string().min(6).max(20).optional(),
    student: z.object({
      name: z.object({
        firstName: z.string().max(20),
        lastName: z.string().max(20),
      }),
      email: z.string().email({ message: "Invalid email address" }),
      emergencyContactNo: z.string().max(15),
      department: z.string().max(100),
      semester: z.number().max(50),
      dateOfBirth: z.string().refine(
        (date) => !isNaN(Date.parse(date)),
        { message: "Invalid date format" }
      ),
      gender: z.enum(["male", "female", "other"] as const),
      contactNo: z.string().max(15),
      permanentAddress: z.string().max(200),
      presentAddress: z.string().max(200),
      localGuardian: z.object({
        name: z.string().max(100),
        occupation: z.string().max(100),
        contactNo: z.string().max(15),
        address: z.string().max(200),
      }),
      guardian: z.object({
        fatherName: z.string().max(100),
        fatherOccupation: z.string().max(100),
        fatherContactNo: z.string().max(15),
        motherName: z.string().max(100),
        motherOccupation: z.string().max(100),
        motherContactNo: z.string().max(15),
      }),
     academicSemester: z.string().optional(),
    }),
  }),
});

// updateStudentSchema
export const updateStudentSchema = z.object({
  body: z.object({
    student: z.object({
      name: z.object({
        firstName: z.string().max(20).optional(),
        lastName: z.string().max(20).optional(),
      }).optional(),
      email: z.string().email({ message: "Invalid email address" }).optional(),
      emergencyContactNo: z.string().max(15).optional(),
      department: z.string().max(100).optional(),
      semester: z.number().max(50).optional(),
        dateOfBirth: z.string().refine(
        (date) => !isNaN(Date.parse(date)),
        { message: "Invalid date format" }
      ).optional(),
      gender: z.enum(["male", "female", "other"] as const).optional(),
      contactNo: z.string().max(20).optional(),
      permanentAddress: z.string().max(200).optional(),
      presentAddress: z.string().max(200).optional(),
      localGuardian: z.object({
        name: z.string().max(20).optional(),
        occupation: z.string().max(20).optional(),
        contactNo: z.string().max(15).optional(),
        address: z.string().max(30).optional(),
      }).optional(), 
      guardian: z.object({
        fatherName: z.string().max(20).optional(),
        fatherOccupation: z.string().max(20).optional(),
        fatherContactNo: z.string().max(15).optional(),
        motherName: z.string().max(20).optional(),
        motherOccupation: z.string().max(20).optional(),
        motherContactNo: z.string().max(15).optional(),
      }).optional(),
      academicSemester: z.string().optional(),
    }),
  }),
})
