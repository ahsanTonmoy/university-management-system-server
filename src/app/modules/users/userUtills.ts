import { TacademicSemester } from "../academicSemester/academicSemesterInterface";
import { Admin } from "../admin/admin.model";
import { UserModel } from "./user.model";
/*============== student id================*/
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

/*============== faculty id================*/

// find last faculty id
const findLastFacultyId = async ()=>{
    const lastFaculty = await UserModel.findOne(
        { role: 'faculty'},
        {id: 1, _id:0}
    ).sort({ createdAt: -1 }).lean()

    return lastFaculty?.id ? lastFaculty?.id : undefined;
}
//generate new id
export const generateFacultyId = async ( )=>{
    let currentId = (0).toString();
    const currentYear = new Date().getFullYear().toString();
    const lastFaculty = await findLastFacultyId();

    if(lastFaculty && lastFaculty.startsWith(currentYear)){
        currentId = lastFaculty.substring(5)
    }

    let createdId = (Number(currentId)+1).toString().padStart(4,'0');
    createdId = `${currentYear}F${createdId}`;
    return createdId;

}

/*============== admin  id================*/
const findLastAdminId = async () => {
  const lastAdmin = await Admin.findOne(
    {},
    { id: 1 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastAdmin?.id;
};

export const generateAdminId = async () => {
  const currentYear = new Date().getFullYear().toString();

  const lastAdminId = await findLastAdminId();

  let sequence = 0;

  if (lastAdminId && lastAdminId.startsWith(currentYear)) {
    sequence = Number(lastAdminId.substring(5));
  }

  sequence++;

  return `${currentYear}A${sequence
    .toString()
    .padStart(4, '0')}`;
};

