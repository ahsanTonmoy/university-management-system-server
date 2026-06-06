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
// get all academic semesters from database
const getAcademicSemestersFromDB = async () => {
    const semesters = await academicSemester.find();
    return semesters;
}

// get single academic semester from database
const getAcademicSemesterFromDB = async (id: string) => {
    const semester = await academicSemester.findById(id);
    return semester;
}

export const academicSemesterService = {
    createAcademicSemesterToDB,
    getAcademicSemestersFromDB,
    getAcademicSemesterFromDB,
}
