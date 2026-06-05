import { academicSemesterTitleCodeMapper } from "./academicSemestarConstant";
import { TacademicSemester } from "./academicSemesterInterface";
import { academicSemester } from "./academicSemesterModel";

const createAcademicSemesterToDB = async (payload: TacademicSemester) => {
    // check semester code and title match or not
    if (payload.title && payload.code) {
        if (payload.code !== academicSemesterTitleCodeMapper[payload.title]) {
            throw new Error('Invalid Semester Code');
        }

    }
    const result = await academicSemester.create(payload);
    return result;
}

export const academicSemesterService = {
    createAcademicSemesterToDB,
}
