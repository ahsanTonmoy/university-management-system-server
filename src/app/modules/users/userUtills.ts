import { TacademicSemester } from "../academicSemester/academicSemesterInterface";

export const generateStudentId = (payload: TacademicSemester) => {

    const currentId = (0).toString();
    let incrementedId = (Number(currentId) + 1).toString().padStart(4, '0');
    incrementedId= `${payload.year}${payload.code}${incrementedId}`;
    return incrementedId
}