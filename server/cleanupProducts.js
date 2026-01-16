
import mongoose from 'mongoose';
import 'dotenv/config';

async function cleanup() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        // Remove products added by the failed seed script (those with specific mock URLs)
        const result = await mongoose.connection.db.collection('products').deleteMany({
            "image.0": { $regex: "res.cloudinary.com/duim5xlit/image/upload/v1736485890/grocerra/" }
        });

        console.log(`Deleted ${result.deletedCount} broken products`);
        process.exit(0);
    } catch (error) {
        console.error("Cleanup failed:", error);
        process.exit(1);
    }
}

cleanup();
