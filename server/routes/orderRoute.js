import express from 'express'
import authUser from '../middleware/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD, createStripeCheckout, verifyStripePayment, createRazorpayOrder, verifyRazorpayPayment } from '../controllers/orderController.js';
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

orderRouter.get('/seller', authSeller, getAllOrders)

export default orderRouter;
