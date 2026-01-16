
import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartItems: { type: Object, default: {} },
}, { minimize: false });

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function inspectUsers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        const users = await User.find({});
        console.log(`Found ${users.length} users:`);
        users.forEach(u => {
            const passDisplay = u.password ? u.password.substring(0, 10) : "UNDEFINED";
            console.log(`- ID: ${u._id}, Name: ${u.name}, Email: ${u.email}, Password: ${passDisplay}...`);
        });

        process.exit(0);
    } catch (error) {
        console.error("Inspection failed:", error);
        process.exit(1);
    }
}

inspectUsers();
