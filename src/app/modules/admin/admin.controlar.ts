import httpStatus from 'http-status';
import { AdminService } from './admin.service';
import { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../../utils/sendResponce';

// Get All Admins
const getAllAdmins = async (req: Request, res: Response, next: NextFunction) => {
  const result = await AdminService.getAllAdmins(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins retrieved successfully',
    data: result,
  });
};

// Get Single Admin
const getSingleAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const result = await AdminService.getSingleAdmin(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully',
    data: result,
  });
};

// Update Admin
const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {

  const { id } = req.params;
  const adminData =  req.body.admin;
  const result = await AdminService.updateAdmin(id as string, adminData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  });
  } catch (error) {
    next(error)
  }
};

// Delete Admin
const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const result = await AdminService.deleteAdmin(id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  });
};

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};

