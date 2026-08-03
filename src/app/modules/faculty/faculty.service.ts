import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model"


// get all facultise
const getAllFaculty = async (query: Record<string, unknown>): Promise<TFaculty[]>=>{
    const faculty = await Faculty.find()
    .populate('user')
    .populate('academicDepartment')
    .populate('academicFaculty');

    return faculty;
}

export const facultyService = {
    getAllFaculty,
}