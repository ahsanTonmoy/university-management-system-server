import config from "../../config";
import { IStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
// import { Tstudent } from "./student.interface"; // Removed because file does not exist
// create a new student with user role
const createStudent = async (password: string, studentData: IStudent) => {
  const UserData : Partial<IUser> = {};

  UserData.role = 'student';
  UserData.password = password || (config.default_user_pass as string);

  UserData.id = studentData.id;

  // Create a new user object
  const newUser = await UserModel.create(UserData);

  // create a student 
  if(Object.keys(newUser).length ){
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);
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