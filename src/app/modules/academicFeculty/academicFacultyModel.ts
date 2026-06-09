import { model, Schema } from "mongoose";
import { TacademicFaculty } from "./academicFacultyInterface";

// create academic faculty model
const academicFacultySchema = new Schema<TacademicFaculty>({
     name: {
      type: String,
      required: [true, 'Faculty name is required'],
      unique: true,
      trim: true,
    },
})

export const academicFaculty = model<TacademicFaculty>('AcademicFaculty', academicFacultySchema)