import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import { CourseService } from './course.service';
import { sendResponse } from '../../utils/sendResponce';

// Create Course
const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CourseService.createCourseIntoDB(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Course created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Courses
const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await CourseService.getAllCoursesFromDB(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Courses retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Get Single Course
const getSingleCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const result = await CourseService.getSingleCourseFromDB(id as string);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Update Course
const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    console.log(req.body)
    const result = await CourseService.updateCourseIntoDB(
      id as string,
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Course
const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const result = await CourseService.deleteCourseFromDB(id as string);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


// Update Course
const assignFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    console.log(req.body)
    const result = await CourseService.assignFaculty(
      id as string,
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Course assign successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFaculty = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    console.log(req.body)
    const result = await CourseService.deleteFaculty(
      id as string,
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'faculty remove successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFaculty,
  deleteFaculty
};

