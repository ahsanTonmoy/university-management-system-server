import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['superAdmin', 'admin', 'student', 'faculty'],
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// crteate pre save hook for hashing password
userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

export const UserModel = model<IUser>('User', userSchema);