import mongoose from "mongoose";
import QueryBuilder from "../../builders/queryBuilders";
import AppError from "../../errors/appErrors";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import  httpStatus  from 'http-status';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    // find with query 
    const courseQuery = new QueryBuilder(Course.find()
    .populate('preRequisiteCourses.course').where({isDeleted: false}), query
    )
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields()
  return await courseQuery.modelQuery;
};

const getSingleCourseFromDB = async (id: string) => {
  return await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>,) => {
    const { preRequisiteCourses, ...courseRemainingData } = payload;

    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        // update basic course info
        const basicCourse= await Course.findByIdAndUpdate(id, courseRemainingData, {
            new: true,
            runValidators: true,
            session
        });

        if (!basicCourse) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!')
        }

        console.log("find",preRequisiteCourses)

        // check & update (remove & add course) preRequestCourse
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            //
            const deletePreRequesties = preRequisiteCourses.filter(el => el.isDeleted)
            .map(el => el.course);

            console.log("delete",deletePreRequesties)
            // 
            const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
                id,
                {
                    $pull:{
                        preRequisiteCourses: {
                            course: {$in: deletePreRequesties}
                        }
                    }
                },
                {
                    new: true,
                    runValidators: true,
                    session
                }
            )
            if (!deletedPreRequisiteCourses) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
            }

            
            const newPreRequisites = preRequisiteCourses?.filter(el => !el.isDeleted)

            const newPreRequisitesCourse = await Course.findByIdAndUpdate(
                id,
                {
                    $addToSet: {
                        preRequisiteCourses: {$each: newPreRequisites}
                    }
                },
                {
                    new: true,
                    runValidators: true,
                    session
                }
            )
            console.log("add",newPreRequisites)
            if (!newPreRequisitesCourse) {
                throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
            }
        }

        session.commitTransaction();
        session.endSession();

        const result = await Course.findById(id)
        .populate( 'preRequisiteCourses.course');

        return result;
        
    } catch (error) {
        session.abortTransaction();
        session.endSession();
    }
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