import { Types } from 'mongoose';

export type TSemesterRegistrationStatus =
  | 'UPCOMING'
  | 'ONGOING'
  | 'ENDED';


export interface TSemesterRegistration {
  academicSemester: Types.ObjectId;
  status: TSemesterRegistrationStatus;
  startDate: Date;
  endDate: Date;
  minCredits: number;
  maxCredits: number;
  isDeleted?: boolean;
}