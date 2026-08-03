import mongoose, { mongo } from "mongoose";
import config from "../../config";
import { academicSemester } from "../academicSemester/academicSemesterModel";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateFacultyId, generateStudentId } from "./userUtills";
import AppError from "../../errors/appErrors";
import  httpStatus  from 'http-status';
import { TFaculty } from "../faculty/faculty.interface";
import { Faculty } from "../faculty/faculty.model";
// // create a new user as student role  
const createStudent = async (password: string, payload: IStudent) => {
  const UserData : Partial<IUser> = {};

  // create sesson
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    UserData.role = 'student';
    UserData.password = password || (config.default_user_pass as string);
      // get the academic semester for generate student id
      const admisionSemester = await academicSemester.findById(
        payload.admissionSemester,
      );

      if(!admisionSemester){
        throw new AppError(httpStatus.NOT_FOUND,"admisson semester not found")
      }
      UserData.id = await generateStudentId(admisionSemester);
      
      // Create a new user object
      const newUser = await UserModel.create([UserData], { session: session });
      if (!newUser.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
      }

      // create a student 
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id;
      const newStudent = await Student.create([payload], { session: session });
      if (!newStudent.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
      }

      await session.commitTransaction();
      await session.endSession();
      return newStudent;
      
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  
};

//  create a new user as faculty role
const createFaculty = async (password:string, payload: TFaculty)=>{
  const userData : Partial<IUser>={};

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.role = 'faculty';
    userData.password = password || (config.default_user_pass as string);
    userData.id = await generateFacultyId() || '00000';

    // Create a new user object
      const newUser = await UserModel.create([userData], { session: session });
      if (!newUser.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
      }
      // create a student 
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id;
      const newFaculty = await Faculty.create([payload], { session: session });
      if (!newFaculty.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
      }

      await session.commitTransaction();
      await session.endSession();
      return newFaculty;
  } catch (error) {
     await session.abortTransaction();
    await session.endSession();
    throw error;
  }
}


// get all users from database 
const getUsers = async (): Promise<IUser[]> => {
  const users = await UserModel.find();
  return users;
}

// get user by id
const getUserById = async (id: string): Promise<IUser | null> => {
  const user = await UserModel.findById(id);
  return user;
}

// update user 
const updateUser = async (id: string, userData: Partial<IUser>): Promise<IUser | null> => {
  const user = await UserModel.findByIdAndUpdate(id, userData, { new: true });
  return user;
}

// delete user
const deleteUser = async (id: string): Promise<IUser | null> => {
  const user = await UserModel.findByIdAndDelete(id);
  return user;
}

// export services


export const userService = {
    createStudent,
    createFaculty,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,


};
