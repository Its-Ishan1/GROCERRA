import Order from '../models/Order.js'
import mongoose from 'mongoose'
import Product from '../models/Product.js';

//Place Order Cod:/api/order/cod

export const placeOrderCOD = async (req, res) => {
    try {

        const { items, address, paymentType } = req.body;
        const userId = req.userId;

        if (!address || items.length === 0) {
            return res.json({ success: false, message: 'Invalid data' })

        }

        let amount = await items.reduce(async (acc, item) => {
            if (!mongoose.Types.ObjectId.isValid(item.product)) {
                throw new Error(`Invalid Product ID: ${item.product}`);
            }
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;

        }, 0)

        //Add Tax Charge (2%)

        amount += Math.floor(amount * 0.02)

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: paymentType || 'COD',
            isPaid: paymentType === 'Online' ? true : false,
        });

        return res.json({ success: true, message: 'Order placed Successfully' })

    } catch (error) {

        return res.json({ success: false, message: error.message })

    }
}

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: 'COD' }, { isPaid: true }]
        }).populate('items.product address').sort({ createdAt: -1 })

        res.json({ success: true, orders })

    } catch (error) {

        res.json({ success: false, message: error.message })

    }
}

//Get ALL Orders (for seller/admin)  :/api/order/seller


export const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find({

            $or: [{ paymentType: 'COD' }, { isPaid: true }]
        }).populate('items.product address').sort({ createdAt: -1 })

        res.json({ success: true, orders })

    } catch (error) {

        res.json({ success: false, message: error.message })

    }
}

// Cancel Order: /api/order/cancel
export const cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        const userId = req.userId;

        const order = await Order.findById(orderId);

        if (!order) {
            return res.json({ success: false, message: 'Order not found' });
        }

        if (order.userId.toString() !== userId.toString()) {
            return res.json({ success: false, message: 'Unauthorized' });
        }

        // Only allow cancellation if order is not already shipped/delivered/cancelled
        if (order.status !== 'Order Placed' && order.status !== 'Payment Pending') {
            return res.json({ success: false, message: 'Order cannot be cancelled at this stage' });
        }

        await Order.findByIdAndUpdate(orderId, { status: 'Cancelled' });
        res.json({ success: true, message: 'Order cancelled successfully' });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
// Update Order Status: /api/order/status
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        await Order.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Status Updated' });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
