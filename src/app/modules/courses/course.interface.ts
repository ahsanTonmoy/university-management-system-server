import { Types } from "mongoose";

export interface TPreRequisiteCourse {
  course: Types.ObjectId;
  isDeleted?: boolean;
}

export interface TCourseFaculties {
  course: Types.ObjectId;
  faculties: [Types.ObjectId]
}

export interface TCourse {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses?: TPreRequisiteCourse[];
  faculties?: Types.ObjectId[];
  isDeleted?: boolean;
}