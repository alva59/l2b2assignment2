import express from 'express';
import { orderControllers } from './order.controller';

const router = express.Router();

router.put('/:userId/orders', orderControllers.updateOrder);
router.get('/:userId/orders', orderControllers.getAllOrders);
