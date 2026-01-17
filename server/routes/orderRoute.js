import express from 'express'
import authUser from '../middleware/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD, cancelOrder, updateOrderStatus } from '../controllers/orderController.js';
import authSeller from '../middleware/authSeller.js'



const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD)

orderRouter.get('/user', authUser, getUserOrders)
orderRouter.post('/cancel', authUser, cancelOrder)

orderRouter.get('/seller', authSeller, getAllOrders)
orderRouter.post('/status', authSeller, updateOrderStatus)

export default orderRouter;
