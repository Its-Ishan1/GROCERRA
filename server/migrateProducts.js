
import mongoose from 'mongoose';
import 'dotenv/config';

async function migrate() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Use any to avoid schema issues during migration
        await mongoose.connection.db.collection('products').updateMany(
            { offerprice: { $exists: true } },
            [
                { $set: { offerPrice: "$offerprice" } },
                { $unset: "offerprice" }
            ]
        );

        console.log('Migration completed');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();
