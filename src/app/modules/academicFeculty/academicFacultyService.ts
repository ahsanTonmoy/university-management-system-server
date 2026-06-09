import { TacademicFaculty } from "./academicFacultyInterface"
import { academicFaculty } from "./academicFacultyModel"

const createAcedemicFacultyFromDB= async(payload: TacademicFaculty)=>{
    const result = await academicFaculty.create(payload);
    return result;

}

// get all academic Facalty
const getAcademicFacultyFromDB= async () => {
    const result = await academicFaculty.find();
    return result;
}

// get single data using id
const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await academicFaculty.findById(id);

  return result;
};



export const acdemicFacultyService ={
    createAcedemicFacultyFromDB,
    getAcademicFacultyFromDB,
    getSingleAcademicFacultyFromDB
}