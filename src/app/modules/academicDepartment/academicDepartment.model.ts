import { model, Schema } from "mongoose";
import { TacademicDepartment } from "./academicDepartment.interface";


const academicDepartmentSchema = new Schema<TacademicDepartment>({
    name: {
        type: String,
        required: [true, 'Department name is required'],
        unique: true,
        trim: true
    },
    academicFeculty:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'AcademicFaculty',
    }
})


export const academicDepartment = model<TacademicDepartment>('academicDepartment', academicDepartmentSchema)