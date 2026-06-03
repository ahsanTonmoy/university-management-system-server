// create academic semester model here
import { Schema, model } from 'mongoose';
import { IAcademicSemester } from './academicSemesterInterface';

const academicSemesterSchema = new Schema<IAcademicSemester>({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  code: { type: String, required: true },
  startMonth: { type: String, required: true },
  endMonth: { type: String, required: true }
});

export const AcademicSemester = model<IAcademicSemester>('AcademicSemester', academicSemesterSchema);