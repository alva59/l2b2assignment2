import { Schema, model } from 'mongoose';
import { TOrder, TOrderModel } from './order.interface';

const OrderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  user: {
    type: Number,
    ref: 'User',
    required: true,
  },
});

OrderSchema.statics.calcTotalPrice = async function (userId: number) {
  const total = await this.aggregate([
    {
      $match: { user: userId },
    },
    {
      $project: { $multiply: ['$price', 'quantity'] },
    },
    {
      $group: {
        _id: '$user',
        total: { $sum: '$totalPrice' },
      },
    },
  ]);

  if (total.length > 0) {
    await OrderModel.findByIdAndUpdate(userId);
  }
};

export const OrderModel = model<TOrder, TOrderModel>('Order', OrderSchema);
