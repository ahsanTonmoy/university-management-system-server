import { model, Schema } from "mongoose";
import { TacademicSemester } from "./academicSemesterInterface";
import { academicSemesterCode, academicSemesterTitle } from "./academicSemestarConstant";
// academic semester model
const academicSemesterSchema = new Schema<TacademicSemester>(
    {
        title: {
            type: String,
            required: true,
            enum: academicSemesterTitle,
        },
        code: {
            type: String,
            required: true,
            enum: academicSemesterCode,
        },
        year: { type: Number, required: true },
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

// create a pre save hook to check the semester exist or not on the database
academicSemesterSchema.pre('save', async function (next) {
    const isexist = await academicSemester.findOne({ title: this.title, year: this.year });
    if (isexist) {
        throw new Error('Academic Semester already exist');
    }
})

export const academicSemester = model<TacademicSemester>('academicSemester', academicSemesterSchema);