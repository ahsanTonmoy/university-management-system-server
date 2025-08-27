import { Types } from "mongoose";

export type TUserName = {
    firstName: string;
    lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type TLocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
};
export interface IStudent {
    id: string;
    user: Types.ObjectId;
    name: TUserName;
    password: string;
    email: string;
    dateOfBirth: Date;
    gender: 'male' | 'female' | 'other';
    contactNo: string;
    emergencyContactNo: string;
    permanentAddress: { type: String, required: true };
    presentAddress: { type: String, required: true };
    department: string;
    semester: number;
    localGuardian: TLocalGuardian;
    enrollmentDate: Date;
    guardian: TGuardian;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    profileImageUrl?: string;
}