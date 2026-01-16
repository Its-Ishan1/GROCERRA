# Grocerra - Premium E-commerce Platform

Grocerra is a state-of-the-art, full-stack e-commerce application designed for a seamless shopping experience. Built with the MERN stack (MongoDB, Express, React, Node.js), it features a robust seller dashboard, integrated payment gateways (COD, Stripe, Razorpay), and a high-performance inventory management system.

## 🚀 Key Features

### For Customers
- **Intuitive Shopping**: Clean, responsive UI with advanced searching and category filtering.
- **Advanced Cart System**: Dynamic stock checking, quantity management, and tax calculations.
- **Secure Checkout**: Support for Cash On Delivery (COD) and prepared for Stripe/Razorpay integration.
- **Order Management**: Real-time order tracking with a seamless cancellation flow.
- **Address Management**: Multiple address support for easier checkouts.

### For Sellers
- **Comprehensive Dashboard**: View sales statistics and handle customer inquiries.
- **Product Management**: Full CRUD operations with instant stock toggling (In Stock/Out of Stock).
- **Order Processing**: Track customer orders and update shipping status (Packing, Shipped, Delivered).
- **Automation**: Toast-based notifications for real-time operation feedback.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, React-Hot-Toast, Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Storage**: Cloudinary (AI-powered image management).
- **Authentication**: JWT & Cookie-based secure sessions.

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repository-url>
   ```

2. **Install Dependencies**:
   Use the root command to install dependencies for both client and server:
   ```bash
   npm run install-all
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `server` directory with the following variables:
   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   STRIPE_SECRET_KEY=your_stripe_secret
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```

4. **Run in Development Mode**:
   ```bash
   npm run dev
   ```

## 📜 License

Private Repository - All rights reserved.
