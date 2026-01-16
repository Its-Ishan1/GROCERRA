import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoutes.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import contactRouter from './routes/contactRoute.js';
import newsletterRouter from './routes/newsletterRoute.js';
import mongoose from 'mongoose';


const app = express();
const port = process.env.PORT || 4000;

//allow multiple origins
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

//middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use('/images', express.static('public/images'));

// Middleware to ensure DB and Cloudinary are connected
const ensureConnections = async (req, res, next) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            await connectDB();
            await connectCloudinary();
        }
        next();
    } catch (error) {
        res.status(500).json({ success: false, message: "Database connection failed" });
    }
};

app.use(ensureConnections);

app.get("/", (req, res) => {
    res.send("Api is working");

});

app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)
app.use('/api/contact', contactRouter)
app.use('/api/newsletter', newsletterRouter)

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`server is running on http://localhost:${port}.`)
    })
}

export default app;