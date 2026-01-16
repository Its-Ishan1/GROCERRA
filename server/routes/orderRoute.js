import express from 'express'
import authUser from '../middleware/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD, createStripeCheckout, verifyStripePayment, createRazorpayOrder, verifyRazorpayPayment, cancelOrder, updateOrderStatus } from '../controllers/orderController.js';
import authSeller from '../middleware/authSeller.js'



const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD)

// Stripe routes
orderRouter.post('/stripe-checkout', authUser, createStripeCheckout)
orderRouter.post('/verify-payment', authUser, verifyStripePayment)

// Razorpay routes
orderRouter.post('/razorpay-create', authUser, createRazorpayOrder)
orderRouter.post('/razorpay-verify', authUser, verifyRazorpayPayment)

orderRouter.get('/user', authUser, getUserOrders)
orderRouter.post('/cancel', authUser, cancelOrder)

orderRouter.get('/seller', authSeller, getAllOrders)
orderRouter.post('/status', authSeller, updateOrderStatus)

export default orderRouter;
