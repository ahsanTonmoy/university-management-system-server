import { promises } from "node:dns";
import { TFaculty } from "./faculty.interface";
import { Faculty } from "./faculty.model"
import AppError from "../../errors/appErrors";
import  httpStatus  from 'http-status';
import { UserModel } from "../users/user.model";


// get all facultise
const getAllFaculty = async (query: Record<string, unknown>): Promise<TFaculty[]>=>{
    const faculty = await Faculty.find()
    .populate('user')
    .populate('academicDepartment')
    .populate('academicFaculty');

    return faculty;
}

// get single faculty
const singleFaculty = async(id:string)=>{
    const result = await Faculty.findById(id)
    .populate('user')
    .populate('academicDepartment')
    .populate('academicFaculty');
    if(!result){
            throw new AppError(httpStatus.NOT_FOUND, "Faculty info not found");
        }
    return result;
}

// update faculty using id
const updateFaculty = async (id: string, payload:Partial<TFaculty>)=>{
    const {name, ...reminingFacultty}= payload;
    const modifiedUpdatedData: Record<string, unknown> ={
        ...reminingFacultty
    }
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }

     const faculty = await Faculty.findOneAndUpdate(
            {_id: id},
            { $set: modifiedUpdatedData },
            { new: true, runValidators: true }
        );

        return faculty;
    
}

// delete faculty & user
const deleteFaculty = async (id: string) => {
    const  sesson = await Faculty.startSession();
    try {
        sesson.startTransaction();
        const deleteFaculty = await Faculty.findOneAndDelete({_id: id }, { session: sesson });
        
        if(!deleteFaculty){
            throw new AppError(httpStatus.BAD_REQUEST,"failed to delete faculty");
        }

        // const deleteUser = await UserModel.findOneAndDelete({_id: id },{session: sesson });
        // if (!deleteUser) {
        //     throw new AppError(httpStatus.BAD_REQUEST, "failed to delete user");
        // }
        await sesson.commitTransaction();
        await sesson.endSession();
        return deleteFaculty;
    }
    catch (error) {
        sesson.abortTransaction();
        throw error;
    }


}

export const facultyService = {
    getAllFaculty,
    singleFaculty,
    updateFaculty,
    deleteFaculty
}