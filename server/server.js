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

// Health check route (no DB required)
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Server is up and running!",
        env: {
            hasMongo: !!process.env.MONGODB_URI,
            nodeEnv: process.env.NODE_ENV
        }
    });
});

// Middleware to ensure DB and Cloudinary are connected
const ensureConnections = async (req, res, next) => {
    // Skip for health check and root
    if (req.path === '/api/health' || req.path === '/api' || req.path === '/') return next();

    try {
        if (mongoose.connection.readyState !== 1) {
            console.log("Connecting to Database...");
            await connectDB();
            await connectCloudinary();
            console.log("Connections established.");
        }
        next();
    } catch (error) {
        console.error("Connection Middleware Error:", error.message);
        res.status(500).json({
            success: false,
            message: `Server Connection Error: ${error.message}`
        });
    }
};

app.use(ensureConnections);

app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)
app.use('/api/contact', contactRouter)
app.use('/api/newsletter', newsletterRouter)

app.get("/", (req, res) => {
    res.send("Grocerra API is working");
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`server is running on http://localhost:${port}.`)
    })
}

export default app;