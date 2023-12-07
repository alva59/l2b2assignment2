import { Request, Response } from 'express';
import { orderServices } from './order.services';
import { TUser } from '../user/user.interface';

const updateOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    const orderData = req.body;

    const result = await orderServices.updateOrderInDB(userId, orderData);
    res.status(200).json({
      success: true,
      message: 'orders updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: true,
      message: 'Something went wrong',
      data: error.message,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.getAllOrdersFromDB();
    res.status(200).json({
      success: true,
      message: 'orders fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: true,
      message: 'Something went wrong',
      data: error.message,
    });
  }
};

export const orderControllers = {
  updateOrder,
  getAllOrders,
};
