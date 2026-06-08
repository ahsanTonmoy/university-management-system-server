import { error } from "console";
import config from "../../config";
import { academicSemester } from "../academicSemester/academicSemesterModel";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
import { generateStudentId } from "./userUtills";
// // create a new student with user role
const createStudent = async (password: string, payload: IStudent) => {
  const UserData : Partial<IUser> = {};

  UserData.role = 'student';
  UserData.password = password || (config.default_user_pass as string);
  // get the academic semester for generate student id
  const admisionSemester = await academicSemester.findById(
    payload.admissionSemester,
  );

  if(!admisionSemester){
    throw new Error("admisson semester not found")
  }
  UserData.id = await generateStudentId(admisionSemester);
  
  // Create a new user object
  const newUser = await UserModel.create(UserData);

  // create a student 
  if(Object.keys(newUser).length ){
    payload.id = newUser.id;
    payload.user = newUser._id;
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

// get all users from database 
const getUsers = async (): Promise<IUser[]> => {
  const users = await UserModel.find();
  return users;
}

export const userService = {
    createStudent,
    getUsers,
};


