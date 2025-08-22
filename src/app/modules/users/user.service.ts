import { IUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUser = async (payload: IUser): Promise<IUser> => {
  const user = await UserModel.create(payload);
  return user;
};


export const userService = {
    createUser,
};