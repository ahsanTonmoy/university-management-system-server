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
// create method for comparing password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as IUser;
  return bcrypt.compare(candidatePassword, user.password);
};

export const UserModel = model<IUser>('User', userSchema);