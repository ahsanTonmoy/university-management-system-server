import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);

  return result;
};

const getAllCoursesFromDB = async () => {
  return await Course.find({ isDeleted: false }).populate(
    'preRequisiteCourses.course',
  );
};

const getSingleCourseFromDB = async (id: string) => {
  return await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
};

const updateCourseIntoDB = async (
  id: string,
  payload: Partial<TCourse>,
) => {
  return await Course.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteCourseFromDB = async (id: string) => {
  return await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
};

export const CourseService = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
};