import AppError from "../../errors/appErrors";
import { academicSemesterTitleCodeMapper } from "./academicSemestarConstant";
import { TacademicSemester } from "./academicSemesterInterface";
import { academicSemester } from "./academicSemesterModel";
import  httpStatus  from 'http-status';

// create academic semester
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
    // check semeter data is on database
    if (!semesters) {
        throw new AppError(httpStatus.NOT_FOUND,'Academic Semester not found')
    }

    return semesters;
}

// get single academic semester from database
const getAcademicSemesterFromDB = async (id: string) => {
    const semester = await academicSemester.findById(id);
    // check semeter data is on database
    if (!semester) {
        throw new AppError(httpStatus.NOT_FOUND,'Academic Semester not found')
    }
    return semester;
}

// update AcademicSemesterFromDB
const updateAcademicSemesterFromDB = async(id: string,payload: Partial<TacademicSemester>) => {
    const result = await academicSemester.findByIdAndUpdate(
        id, payload, {new: true}
    );

    return result;
}

// delete academic semester
const deleteAcademicSemesterFromDB = async (id: string) => {
  const result = await academicSemester.findByIdAndDelete(id);
  if (!result) {
        throw new AppError(httpStatus.NOT_FOUND,'Academic Semester not found')
    }
  return result;
};


export const academicSemesterService = {
    createAcademicSemesterToDB,
    getAcademicSemestersFromDB,
    getAcademicSemesterFromDB,
    updateAcademicSemesterFromDB,
    deleteAcademicSemesterFromDB
}
