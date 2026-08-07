import { Schema, model } from 'mongoose';
import { TAdmin } from './admin.interface';

const userNameSchema = new Schema(
  {
    firstName: String,
    lastName: String,
  },
  { _id: false },
);

const adminSchema = new Schema<TAdmin>(
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

    dateOfBirth: String,

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

    profileImage: String,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Admin = model<TAdmin>('Admin', adminSchema);