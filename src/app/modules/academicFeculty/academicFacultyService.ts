import { TacademicFaculty } from "./academicFacultyInterface"
import { academicFaculty } from "./academicFacultyModel"

const createAcedemicFacultyFromDB= async(payload: TacademicFaculty)=>{
    const result = await academicFaculty.create(payload);
    return result;

}

// get all academic Facalty


export const acdemicFacultyService ={
    createAcedemicFacultyFromDB
}