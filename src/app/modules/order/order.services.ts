import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

const updateOrderInDB = async (userId: number, orderData: TOrder) => {
  const result = await OrderModel.findOneAndUpdate(
    { userId, orderData },
    { runValidators: true },
    { new: true },
  );
  if (result) {
    OrderModel.calcTotalPrice(result.user);
  }
  return result;
};

const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

export const orderServices = {
  updateOrderInDB,
  getAllOrdersFromDB,
};
