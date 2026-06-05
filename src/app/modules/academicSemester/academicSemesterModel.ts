import { model, Schema } from "mongoose";
import { TacademicSemester } from "./academicSemesterInterface";
import { academicSemesterCode } from "./academicSemestarConstant";

const academicSemesterSchema = new Schema<TacademicSemester>(
    {
        title: {
            type: String,
            required: true,
            enum: academicSemesterCode,
        },
        code: {
            type: String,
            required: true,
            enum: academicSemesterCode,
        },
        year: { type: String, required: true },
        startMonth: {
            type: String,
            required: true,
        },
        endMonth: {
            type: String,
            required: true,
        },

    }

)
export const academicSemester = model<TacademicSemester>('academicSemester', academicSemesterSchema);