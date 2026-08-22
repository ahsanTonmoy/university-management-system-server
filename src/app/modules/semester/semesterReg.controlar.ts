import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { semesterRegService } from "./semesterReg.service";
import { sendResponse } from "../../utils/sendResponce";


// create semester Reg
const createSemesterRegControlar = async(req: Request, res: Response, next:NextFunction)=>{
    try {
    const result = await semesterRegService.createSemesterRegService(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Semester Reg created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
// get all SemesterRegistration 
const getAllSemester =  async(req: Request, res: Response, next:NextFunction)=>{
    const result = await semesterRegService.getAllSemesterFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      length: result.length,
      message: 'Semesters retrieved successfully',
      data: result,
    });
}

// get single semester
const getSingleSemester= async(req: Request, res: Response, next:NextFunction)=> {
  const { id } = req.params;

  const result =
    await semesterRegService.getSingleSemesterFromDB(
      id as string,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester retrieved successfully',
    data: result,
  });
};
// update semester
const updateSemester = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const result =
      await semesterRegService.updateSemesterFromDB(
        id as string,
        req.body,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// delete semester
const deleteSemester = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const result =
      await semesterRegService.deleteSemesterFromDB(
        id as string,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const semesterRegControlar ={
    createSemesterRegControlar,
    getAllSemester,
    getSingleSemester,
    updateSemester,
    deleteSemester
}