import { UserModel } from '../user.model';
import { TUser } from './user.interface';

const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  if (await UserModel.isUserExists(user.userId)) {
    throw new Error('User already exists!');
  }
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find({}).select({
    _id: 0,
    username: 1,
    fullName: 1,
    email: 1,
    age: 1,
    address: 1,
  });
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

const updateUserInDB = async (userId: number, user: TUser) => {
  const result = await UserModel.findOneAndUpdate(
    { userId, user },
    { new: true },
  );
  return result;
};

const deleteUser = async (userId: number) => {
  const result = await UserModel.findOneAndDelete({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUser,
};
