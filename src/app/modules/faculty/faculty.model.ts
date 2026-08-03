import { Schema, model } from 'mongoose';
import { TFaculty } from './faculty.interface';

const userNameSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
  },
);

const facultySchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    name: {
      type: userNameSchema,
      required: true,
    },

    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },

    dateOfBirth: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    contactNo: {
      type: String,
      required: true,
    },

    emergencyContactNo: {
      type: String,
      required: true,
    },

    presentAddress: {
      type: String,
      required: true,
    },

    permanentAddress: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
    },

    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },

    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'academicDepartment',
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Faculty = model<TFaculty>('Faculty', facultySchema);