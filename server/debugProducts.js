
import mongoose from 'mongoose';
import 'dotenv/config';

const ProductSchema = new mongoose.Schema({
    name: String,
    category: String,
    inStock: Boolean,
});

const Product = mongoose.models.product || mongoose.model('product', ProductSchema);

async function checkProducts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const products = await Product.find({});
        console.log('Total Products:', products.length);
        products.forEach(p => {
            console.log(`- ${p.name} (${p.category}), inStock: ${p.inStock}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkProducts();
