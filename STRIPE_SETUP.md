# Stripe Payment Integration - Setup Guide

## ✅ **Stripe Payment Gateway - ACTIVE & READY!**

Your GreenCart application now has **Stripe** payment integration for secure online payments!

---

## 🎉 **What's Working:**

### **Payment Methods Available:**
1. ✅ **Cash on Delivery (COD)** - Order placed immediately
2. ✅ **Online Payment (Stripe)** - Secure card payments

---

## 🔑 **Your Stripe Configuration:**

### ✅ **Stripe Keys - ALREADY CONFIGURED!**

Your Stripe test keys are already added to the `.env` file:
- ✅ Secret Key: `sk_test_51QXy...`
- ✅ Publishable Key: `pk_test_51QXy...`

**You're ready to accept test payments right now!**

---

## 🚀 **How to Test Stripe Payments:**

### **Step 1: Add Items to Cart**
- Browse products
- Add items to your cart
- Go to checkout

### **Step 2: Select Payment Method**
- Choose delivery address
- Select **"Online Payment"**
- Click **"Proceed To Online"**

### **Step 3: Complete Payment on Stripe**
You'll be redirected to Stripe's secure checkout page.

**Use these test card details:**

| Field | Value |
|-------|-------|
| **Card Number** | `4242 4242 4242 4242` |
| **Expiry Date** | Any future date (e.g., `12/34`) |
| **CVC** | Any 3 digits (e.g., `123`) |
| **ZIP Code** | Any 5 digits (e.g., `12345`) |
| **Name** | Any name |

### **Step 4: Verify Order**
- After successful payment, you'll be redirected back
- Order will appear in **"My Orders"**
- Payment status will show **"Online"**
- Order status will be **"Order Placed"**

---

## 🧪 **Additional Test Cards:**

### **Successful Payments:**
- `4242 4242 4242 4242` - Visa (always succeeds)
- `5555 5555 5555 4444` - Mastercard (always succeeds)

### **Failed Payments (for testing error handling):**
- `4000 0000 0000 0002` - Card declined
- `4000 0000 0000 9995` - Insufficient funds

---

## 💳 **Payment Flow:**

```
User adds items to cart
        ↓
Selects "Online Payment"
        ↓
Clicks "Proceed To Online"
        ↓
Redirected to Stripe Checkout
        ↓
Enters card details
        ↓
Payment processed by Stripe
        ↓
Redirected back to GreenCart
        ↓
Payment verified
        ↓
Order created & cart cleared
        ↓
Redirected to "My Orders"
```

---

## 🔒 **Security Features:**

✅ **PCI Compliant** - Stripe handles all card data
✅ **Secure Redirect** - Users enter card details on Stripe's secure page
✅ **Payment Verification** - Backend verifies payment before creating order
✅ **Session Validation** - Each payment session is unique and verified

---

## 📊 **What's Been Implemented:**

### **Backend:**
- ✅ Stripe SDK installed and configured
- ✅ Create checkout session endpoint (`/api/order/stripe-checkout`)
- ✅ Verify payment endpoint (`/api/order/verify-payment`)
- ✅ Order creation with payment tracking
- ✅ Payment status management

### **Frontend:**
- ✅ Payment method selector (COD / Online)
- ✅ Stripe checkout redirect
- ✅ Payment success page
- ✅ Payment verification flow
- ✅ Error handling

---

## 🌍 **Currency & Pricing:**

- **Currency**: Indian Rupees (INR)
- **Tax**: 2% automatically added
- **Shipping**: Free
- **Stripe Conversion**: Amounts are automatically converted to paise (₹1 = 100 paise)

---

## 🎓 **Going Live (Production):**

When you're ready to accept real payments:

### **Step 1: Complete Stripe Verification**
1. Log in to Stripe Dashboard
2. Complete business verification
3. Add bank account details
4. Verify your identity

### **Step 2: Switch to Live Keys**
1. In Stripe Dashboard, toggle to **"Live mode"**
2. Generate live API keys (start with `sk_live_` and `pk_live_`)
3. Update `.env` file with live keys:
   ```env
   STRIPE_SECRET_KEY=sk_live_your_live_key_here
   STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
   ```

### **Step 3: Test Thoroughly**
- Test with small real transactions
- Verify order creation
- Check payment confirmations
- Test refund process

---

## 💰 **Stripe Fees (India):**

- **Domestic Cards**: 2.9% + ₹3 per transaction
- **International Cards**: 3.9% + ₹3 per transaction
- **No setup fees**
- **No monthly fees**

---

## 🆘 **Troubleshooting:**

### **Payment not redirecting to Stripe:**
- Check if Stripe secret key is correct in `.env`
- Restart backend server
- Check browser console for errors

### **Payment verification failing:**
- Ensure session ID is being passed correctly
- Check backend logs for errors
- Verify Stripe webhook configuration (if using)

### **Order not appearing after payment:**
- Check if payment was actually successful in Stripe Dashboard
- Verify backend is running
- Check browser network tab for API errors

---

## 📱 **Stripe Dashboard:**

Monitor your payments at: https://dashboard.stripe.com

**What you can see:**
- All transactions (test and live)
- Payment details
- Customer information
- Refunds and disputes
- Analytics and reports

---

## 🎯 **Current Status:**

| Feature | Status |
|---------|--------|
| **Stripe Integration** | ✅ **ACTIVE** |
| **Test Mode** | ✅ **READY** |
| **COD Payments** | ✅ Working |
| **Online Payments** | ✅ Working |
| **Payment Verification** | ✅ Working |
| **Order Tracking** | ✅ Working |
| **Production Ready** | ⏳ Add live keys |

---

## 🚀 **You're All Set!**

Your payment system is **fully functional** and ready for testing!

**Try it now:**
1. Add items to cart
2. Select "Online Payment"
3. Use test card: `4242 4242 4242 4242`
4. Complete payment
5. See order in "My Orders"

**Happy selling! 🎉**

---

## 📞 **Support:**

- **Stripe Documentation**: https://stripe.com/docs
- **Stripe Support**: https://support.stripe.com
- **Test Cards**: https://stripe.com/docs/testing

---

**Note**: This is using Stripe's **test mode**. No real money will be charged. Switch to live keys when ready for production.
