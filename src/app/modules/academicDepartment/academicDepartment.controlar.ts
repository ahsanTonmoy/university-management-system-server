import { NextFunction, Request, Response } from "express";
import { academicDepartmentService } from "./academicDepartment.service";
import { sendResponse } from "../../utils/sendResponce";
import  httpStatus  from 'http-status';

// create academicDepartment 
const createAcademicDepartment = async (req: Request, res:Response, next: NextFunction)=>{
    try {
        const result = await academicDepartmentService.createAcademicDepartment(req.body);
         sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "academic Department create successfuly",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

// get academicDepartment 
const getAllAcademicDepartment = async(req: Request, res:Response, next: NextFunction)=>{
    try {
        const result = await academicDepartmentService.getAllAcademicDepartment();
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "academic Departments are retrieved successfuly",
            length: result.length,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

// single academicDepartment
const singleAcademicDepartment = async(req: Request, res:Response, next: NextFunction)=>{
    try {
        const {id} = req.params
        const result = await academicDepartmentService.singleAcademicDepartment(id as string);
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "academic Department are retrieved successfuly",
            data: result
        })
    } catch (error) {
        next(error)
    }
}
// update academicDepartment
const updateAcademicDepartment = async(req: Request, res:Response, next: NextFunction)=>{
    try {
        const {id}= req.params;
        const result = await academicDepartmentService.updateAcademicDepartment(id as string,req.body);
          sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "academic Department update successfuly",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

// delete academicDepartment
const deleteAcademicDepartment = async(req: Request, res:Response, next: NextFunction)=>{
    try {
        const {id}= req.params;
        const result = await academicDepartmentService.deleteAcademicDepartment(id as string);
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message: "academic Department delete successfuly",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const academicDepartmentControlar = {
    createAcademicDepartment,
    getAllAcademicDepartment,
    singleAcademicDepartment,
    updateAcademicDepartment,
    deleteAcademicDepartment
}