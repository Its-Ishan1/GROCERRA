import Stripe from 'stripe';

let stripe;

if (process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
} else {
    console.warn("Stripe Secret Key is missing. Online payments via Stripe will be disabled.");
    stripe = null;
}

export default stripe;
