import Order from '../models/Order.js'
import mongoose from 'mongoose'
import Product from '../models/Product.js';
import stripe from '../configs/stripe.js';
import razorpay from '../configs/razorpay.js';

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

// Create Stripe Checkout Session: /api/order/stripe-checkout
export const createStripeCheckout = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.userId;

        if (!address || items.length === 0) {
            return res.json({ success: false, message: 'Invalid data' })
        }

        // Calculate amount and prepare line items for Stripe
        let amount = 0;
        const lineItems = [];

        for (const item of items) {
            if (!mongoose.Types.ObjectId.isValid(item.product)) {
                throw new Error(`Invalid Product ID: ${item.product}`);
            }
            const product = await Product.findById(item.product);
            if (!product) {
                throw new Error(`Product not found: ${item.product}`);
            }

            amount += product.offerPrice * item.quantity;

            lineItems.push({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: product.name,
                        images: product.image && product.image.length > 0 ? [product.image[0]] : [],
                    },
                    unit_amount: Math.round(product.offerPrice * 100), // Stripe expects amount in paise/cents
                },
                quantity: item.quantity,
            });
        }

        // Add tax (2%)
        const tax = Math.floor(amount * 0.02);
        amount += tax;

        // Add tax as a line item
        lineItems.push({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: 'Tax (2%)',
                },
                unit_amount: Math.round(tax * 100),
            },
            quantity: 1,
        });

        // Create pending order
        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: 'Online',
            isPaid: false,
            status: 'Payment Pending'
        });

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/payment-success?session_id={CHECKOUT_SESSION_ID}&order_id=${order._id}`,
            cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId: userId
            }
        });

        res.json({
            success: true,
            sessionId: session.id,
            url: session.url,
            orderId: order._id
        });

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// Verify Stripe Payment: /api/order/verify-payment
export const verifyStripePayment = async (req, res) => {
    try {
        const { sessionId, orderId } = req.body;

        // Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            // Update order status
            await Order.findByIdAndUpdate(orderId, {
                isPaid: true,
                status: 'Order Placed'
            });

            res.json({ success: true, message: 'Payment verified successfully' });
        } else {
            res.json({ success: false, message: 'Payment not completed' });
        }

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
// Create Razorpay Order: /api/order/razorpay-create
export const createRazorpayOrder = async (req, res) => {
    try {
        const { items, address } = req.body;
        const userId = req.userId;

        if (!address || items.length === 0) {
            return res.json({ success: false, message: 'Invalid data' })
        }

        // Calculate amount
        let amount = 0;
        for (const item of items) {
            if (!mongoose.Types.ObjectId.isValid(item.product)) {
                throw new Error(`Invalid Product ID: ${item.product}`);
            }
            const product = await Product.findById(item.product);
            if (!product) {
                throw new Error(`Product not found: ${item.product}`);
            }
            amount += product.offerPrice * item.quantity;
        }

        // Add tax (2%)
        const tax = Math.floor(amount * 0.02);
        amount += tax;

        // Create pending order in database
        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: 'Online',
            isPaid: false,
            status: 'Payment Pending'
        });

        // Create Razorpay order
        const razorpayOrder = await razorpay.orders.create({
            amount: amount * 100, // Razorpay expects amount in paise
            currency: 'INR',
            receipt: order._id.toString(),
            notes: {
                orderId: order._id.toString(),
                userId: userId
            }
        });

        res.json({
            success: true,
            orderId: order._id,
            razorpayOrderId: razorpayOrder.id,
            amount: amount,
            currency: 'INR',
            keyId: process.env.RAZORPAY_KEY_ID
        });

    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// Verify Razorpay Payment: /api/order/razorpay-verify
export const verifyRazorpayPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

        // Verify signature
        const crypto = await import('crypto');
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
        const generatedSignature = hmac.digest('hex');

        if (generatedSignature === razorpay_signature) {
            // Payment is verified
            await Order.findByIdAndUpdate(orderId, {
                isPaid: true,
                status: 'Order Placed',
                razorpayPaymentId: razorpay_payment_id,
                razorpayOrderId: razorpay_order_id
            });

            res.json({ success: true, message: 'Payment verified successfully' });
        } else {
            res.json({ success: false, message: 'Invalid payment signature' });
        }

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
