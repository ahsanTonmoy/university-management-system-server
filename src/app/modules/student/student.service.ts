import AppError from "../../errors/appErrors";
import { UserModel } from "../users/user.model";
import { IStudent } from "./student.interface";
import { Student } from "./student.model";
import  httpStatus  from 'http-status';

const getStudents = async (): Promise<IStudent[]> => {
    const students = await Student.find()
    .populate('user')
    .populate('admissionSemester');
    return students;
}
// find single student using student id
const getStudentById = async (id: string): Promise<IStudent | null> => {
    const student = await Student.findOne({id})
    .populate('user')
    .populate('admissionSemester');;
    return student;
}
// update student info

const updateStudent = async (id: string, payload: Partial<IStudent>) => {
    const { name, guardian, localGuardian, ...remainingStudentData } = payload;

    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingStudentData,
    };

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }

    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }

    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }

    const student = await Student.findOneAndUpdate(
        {id},
        { $set: modifiedUpdatedData },
        { new: true, runValidators: true }
    );

    return student;
};


// delete student & user
const deleteStudent = async (id: string) => {
    const  sesson = await Student.startSession();
    try {
        sesson.startTransaction();
        const deleteStudent = await Student.findOneAndDelete({ id }, { session: sesson });
        
        if(!deleteStudent){
            throw new AppError(httpStatus.BAD_REQUEST,"failed to delete student");
        }

        const deleteUser = await UserModel.findOneAndDelete({ id },{session: sesson });
        if (!deleteUser) {
            throw new AppError(httpStatus.BAD_REQUEST, "failed to delete user");
        }
        await sesson.commitTransaction();
        await sesson.endSession();
        return deleteStudent;
    }
    catch (error) {
        sesson.abortTransaction();
        throw error;
    }


}




export const studentService = {
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
    
};