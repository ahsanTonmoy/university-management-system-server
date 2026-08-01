import { TacademicDepartment } from "./academicDepartment.interface";
import { academicDepartment } from "./academicDepartment.model";
// create academicDepartment service
const createAcademicDepartment = async(payload: TacademicDepartment)=>{
    const result = await academicDepartment.create(payload);
    return result
}

// get all academicDepartment
const getAllAcademicDepartment = async()=>{
    const result = await academicDepartment.find().populate('academicFeculty');
    return result;
}

// get single academicDepartment
const singleAcademicDepartment = async (id: string) =>{
    const result = await academicDepartment.findById(id).populate('academicFeculty');
    return result
}

// update academicDepartment using id
const updateAcademicDepartment = async (id: string, payload: TacademicDepartment)=>{
    const result =await academicDepartment.findOneAndUpdate(
        {_id: id},
        payload,
        {
            new: true
        }
    )
    return result
}

// delete academicDepartment
const deleteAcademicDepartment =  async (id: string) =>{
    const result = await academicDepartment.findByIdAndDelete(id);
    return result
}

export const academicDepartmentService = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    singleAcademicDepartment,
    updateAcademicDepartment,
    deleteAcademicDepartment
}