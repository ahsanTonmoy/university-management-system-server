import { Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  lastName: string;
};

export interface TAdmin {
    id: string;
    user: Types.ObjectId;
    designation: string;
    name: TUserName;
    gender: 'male' | 'female' | 'other';
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress: string;
    profileImage?: string;
    isDeleted: boolean;
} 