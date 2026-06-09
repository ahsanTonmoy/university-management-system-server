import { TacademicSemester } from "../academicSemester/academicSemesterInterface";
import { UserModel } from "./user.model";

//find the last student id and increment it by 1 and return the new id
const findLastStudentId = async () => {
    // Get the last student document from the database
    const lastStudent = await UserModel.findOne(
        { role: 'student' },
        { id: 1, _id: 0 }).sort({ createdAt: -1 })
        .lean();
    
    return lastStudent?.id ? lastStudent.id : undefined;
}
// Generate a student ID based on the academic semester information
export const generateStudentId = async (payload: TacademicSemester) => {
    let currentId =(0).toString();
    //
    const lastStudentId = await findLastStudentId();
    const lastSemesteraYear = lastStudentId?.substring(0,4);
    const lastSemesterCode = lastStudentId?.substring(4,6);
    const currentYear = payload.year;
    const currentSemesterCode= payload.code;
    if(lastStudentId && lastSemesterCode === currentSemesterCode && lastSemesteraYear === currentYear ){
        currentId = lastStudentId.substring(6)
    }
    let incrementedId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementedId = `${payload.year}${payload.code}${incrementedId}`;
    return incrementedId;
   
}

