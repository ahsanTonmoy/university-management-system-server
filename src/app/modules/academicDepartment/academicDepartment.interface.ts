import { Types } from 'mongoose';

export interface TacademicDepartment{
    name: string,
    academicFeculty: Types.ObjectId,
}