import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { UserValidationSchema } from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    //data validation using zod
    const { user: userData } = req.body;
    const zodParsedData = await UserValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'user is created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'Users are fetched successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const result = await UserServices.getSingleUserFromDB(Number(userId));

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User is fetched successfully',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: error,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const zodParsedData = await UserValidationSchema.parse(userData);
    const userId = Number(req.params.userId);
    const result = await UserServices.updateUserInDB(userId, zodParsedData);

    res.status(200).json({
      success: true,
      message: 'User is updated successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      data: error,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await UserServices.deleteUser(userId);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User is deleted successfully',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: error,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
