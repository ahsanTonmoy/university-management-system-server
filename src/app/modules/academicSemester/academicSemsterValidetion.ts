import z from "zod";
import { academicSemesterCode, academicSemesterMonth, academicSemesterTitle } from "./academicSemestarConstant";

// academic semester validation
export const createAcademicSemesterZodSchema = z.object({
    body: z.object({
        title: z.enum([...academicSemesterTitle] as [string, ...string[]]),
        year: z.string(),
        code: z.enum([...academicSemesterCode] as [string, ...string[]]),
        startMonth: z.enum([...academicSemesterMonth] as [string, ...string[]]),
        endMonth: z.enum([...academicSemesterMonth] as [string, ...string[]]),
    })
});
