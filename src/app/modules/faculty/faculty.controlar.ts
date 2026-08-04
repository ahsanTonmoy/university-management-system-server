import { NextFunction , Request ,Response} from "express";
import { facultyService } from "./faculty.service";
import { sendResponse } from "../../utils/sendResponce";
import  httpStatus  from 'http-status';

// get all facultise
const getAllFaculty = async (req: Request, res: Response, next: NextFunction) =>{
    try {
        const result = await facultyService.getAllFaculty(req.body);
        sendResponse(res,{
            statusCode: httpStatus.OK,
            success: true,
            message:  "faculties retrieved successfully",
            length: result.length,
            data: result
        })
    } catch (error) {
        next(error)
    }
}

// find faculty using id
const singleFaculty = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const faculty = await facultyService.singleFaculty(id as string);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            data: faculty,
            message: "faculty retrieved successfully"
        });
    }
    catch (error) {
        next(error);
    }
}

// update faculty info
const updateFaculty = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const facultyData = req.body.faculty;
        const faculty = await facultyService.updateFaculty(id as string, facultyData);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            data: faculty,
            message: "faculty updated successfully"
        });
    }
    catch (error) {
        next(error);
    }       
}

// DELETE facult   
const deleteFaculty = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id= req.params.id;
        const Faculty = await facultyService.deleteFaculty(id as string);
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            data: Faculty,
            message: "Student deleted successfully"

        });

    }
    catch(error){
        next(error);
    }
}

export const facultyControlar = {
    getAllFaculty,
    singleFaculty,
    updateFaculty,
    deleteFaculty
    
}