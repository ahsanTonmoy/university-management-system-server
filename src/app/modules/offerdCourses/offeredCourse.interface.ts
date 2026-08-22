import { Types } from 'mongoose';

export type TDay =
  | 'SATURDAY'
  | 'SUNDAY'
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY';

export type TSchedule = {
  day: TDay;
  startTime: string;
  endTime: string;
};

export interface TOfferedCourse {
  semesterRegistration: Types.ObjectId;
  academicSemester: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId[];
  maxCapacity: number;
  section: number;
  schedule: TSchedule[];
  isDeleted?: boolean;
}