import Razorpay from 'razorpay';

let razorpay;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
} else {
    console.warn("Razorpay Keys are missing. Online payments via Razorpay will be disabled.");
    razorpay = null;
}

export default razorpay;
