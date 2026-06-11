// zod for student validation
import { z } from "zod";

// createStudentZodSchema

// student Name schema
const userNameSchema = z.object({
   firstName: z.string().max(20),
        lastName: z.string().max(20),
});

// gardian info schema
const guardianSchema = z.object({
    fatherName: z.string().max(20),
    fatherOccupation: z.string().max(20),
    fatherContactNo: z.string().max(15),
    motherName: z.string().max(20),
    motherOccupation: z.string().max(20),
    motherContactNo: z.string().max(15),
});

// local gardian 
const localGuardianSchema = z.object({
    name: z.string().max(20),
    occupation: z.string().max(20),
    contactNo: z.string().max(15),
    address: z.string().max(30),
});

// create student validetion
export const createStudentZodSchema = z.object({

  body: z.object({
    password: z.string().min(6).max(20).optional(),
    student: z.object({
      name: userNameSchema,
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
      localGuardian: localGuardianSchema,
      guardian: guardianSchema,
      admissionSemester: z.string().optional(),
    }),
  }),
});

// updateStudentSchema

// student Name schema
const updateUserNameSchema = z.object({
   firstName: z.string().max(20).optional(),
    lastName: z.string().max(20).optional(),
});
// local gardian 
const updateLocalGuardianSchema = z.object({
    name: z.string().max(20).optional(),
    occupation: z.string().max(20).optional(),
    contactNo: z.string().max(15).optional(),
    address: z.string().max(30).optional(),
});
// gardian info schema
const updateGuardianSchema = z.object({
    fatherName: z.string().max(20).optional(),
    fatherOccupation: z.string().max(20).optional(),
    fatherContactNo: z.string().max(15).optional(),
    motherName: z.string().max(20).optional(),
    motherOccupation: z.string().max(20).optional(),
    motherContactNo: z.string().max(15).optional(),
});


// update student schema
export const updateStudentSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameSchema.optional(),
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
      localGuardian: updateLocalGuardianSchema.optional(), 
      guardian: updateGuardianSchema.optional(),
      admissionSemester: z.string().optional(),
    }),
  }),
})
