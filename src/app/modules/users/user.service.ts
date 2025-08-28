import config from "../../config";
import { IStudent } from "./student/student.interface";
import { Student } from "./student/student.model";
import { IUser } from "./user.interface";
import { UserModel } from "./user.model";
// import { Tstudent } from "./student.interface"; // Removed because file does not exist

const createStudent = async (password: string, studentData: IStudent) => {
  const UserData : Partial<IUser> = {};

  UserData.role = 'student';
  UserData.password = password || (config.default_user_pass as string);

  UserData.id = '2025010100';

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

export const userService = {
    createStudent,
};