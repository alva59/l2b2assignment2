import { Model } from 'mongoose';

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
  user: number;
};

export interface TOrderModel extends Model<TOrder> {
  calcTotalPrice(userId: number): Promise<void>;
}
