import { model, Schema } from "mongoose";
import { TacademicFeculty } from "./academicFecultyInterface";

// create academic feculty model
const academicFecultySchema = new Schema<TacademicFeculty>({
     name: {
      type: String,
      required: [true, 'Faculty name is required'],
      unique: true,
      trim: true,
    },
})

export const academicFeculty = model<TacademicFeculty>('AcademicFaculty', academicFecultySchema)