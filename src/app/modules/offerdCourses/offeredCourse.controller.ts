import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

import { OfferedCourseService } from './offeredCourse.service';
import { sendResponse } from '../../utils/sendResponce';


// ===============================
// Create
// ===============================

const createOfferedCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result =
      await OfferedCourseService.createOfferedCourseIntoDB(
        req.body,
      );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Offered course created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


// ===============================
// Get All
// ===============================

const getAllOfferedCourses = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result =
      await OfferedCourseService.getAllOfferedCoursesFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered courses retrieved successfully',
      data: result,
      length: result.length
    });
  } catch (error) {
    next(error);
  }
};


// ===============================
// Get Single
// ===============================

const getSingleOfferedCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const result =
      await OfferedCourseService.getSingleOfferedCourseFromDB(
        id as string,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


// ===============================
// Update
// ===============================

const updateOfferedCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const result =
      await OfferedCourseService.updateOfferedCourseIntoDB(
        id as string,
        req.body,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


// ===============================
// Delete
// ===============================

const deleteOfferedCourse = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const result =
      await OfferedCourseService.deleteOfferedCourseFromDB(
        id as string,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered course deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


export const OfferedCourseController = {
  createOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
};