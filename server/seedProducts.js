
import mongoose from 'mongoose';
import 'dotenv/config';

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: Array, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
}, { timestamps: true });

const Product = mongoose.models.product || mongoose.model('product', ProductSchema);

const dummyProducts = [
    // Vegetables
    {
        name: "Potato 500g",
        category: "Vegetables",
        price: 25,
        offerPrice: 20,
        image: ["/images/products/potato_image_1.png"],
        description: ["Fresh and organic", "Rich in carbohydrates", "Ideal for curries and fries"],
        inStock: true,
    },
    {
        name: "Tomato 1 kg",
        category: "Vegetables",
        price: 40,
        offerPrice: 35,
        image: ["/images/products/tomato_image.png"],
        description: ["Juicy and ripe", "Rich in Vitamin C", "Perfect for salads and sauces"],
        inStock: true,
    },
    {
        name: "Carrot 500g",
        category: "Vegetables",
        price: 30,
        offerPrice: 28,
        image: ["/images/products/carrot_image.png"],
        description: ["Sweet and crunchy", "Good for eyesight", "Ideal for juices and salads"],
        inStock: true,
    },
    {
        name: "Spinach 500g",
        category: "Vegetables",
        price: 18,
        offerPrice: 15,
        image: ["/images/products/spinach_image_1.png"],
        description: ["Rich in iron", "High in vitamins", "Perfect for soups and salads"],
        inStock: true,
    },
    {
        name: "Onion 500g",
        category: "Vegetables",
        price: 22,
        offerPrice: 19,
        image: ["/images/products/onion_image_1.png"],
        description: ["Fresh and pungent", "Perfect for cooking", "A kitchen staple"],
        inStock: true,
    },

    // Fruits
    {
        name: "Apple 1 kg",
        category: "Fruits",
        price: 120,
        offerPrice: 110,
        image: ["/images/products/apple_image.png"],
        description: ["Crisp and juicy", "Rich in fiber", "Boosts immunity"],
        inStock: true,
    },
    {
        name: "Orange 1 kg",
        category: "Fruits",
        price: 80,
        offerPrice: 75,
        image: ["/images/products/orange_image.png"],
        description: ["Juicy and sweet", "Rich in Vitamin C", "Perfect for juices and salads"],
        inStock: true,
    },
    {
        name: "Banana 1 kg",
        category: "Fruits",
        price: 50,
        offerPrice: 45,
        image: ["/images/products/banana_image_1.png"],
        description: ["Sweet and ripe", "High in potassium", "Great for smoothies"],
        inStock: true,
    },
    {
        name: "Mango 1 kg",
        category: "Fruits",
        price: 150,
        offerPrice: 140,
        image: ["/images/products/mango_image_1.png"],
        description: ["Sweet and flavorful", "Perfect for desserts", "Rich in Vitamin A"],
        inStock: true,
    },
    {
        name: "Grapes 500g",
        category: "Fruits",
        price: 70,
        offerPrice: 65,
        image: ["/images/products/grapes_image_1.png"],
        description: ["Fresh and juicy", "Rich in antioxidants", "Perfect for snacking"],
        inStock: true,
    },

    // Dairy
    {
        name: "Amul Milk 1L",
        category: "Dairy",
        price: 60,
        offerPrice: 55,
        image: ["/images/products/amul_milk_image.png"],
        description: ["Pure and fresh", "Rich in calcium", "Ideal for tea, coffee"],
        inStock: true,
    },
    {
        name: "Paneer 200g",
        category: "Dairy",
        price: 90,
        offerPrice: 85,
        image: ["/images/products/paneer_image.png"],
        description: ["Soft and fresh", "Rich in protein", "Ideal for curries"],
        inStock: true,
    },
    {
        name: "Eggs 12 pcs",
        category: "Dairy",
        price: 90,
        offerPrice: 85,
        image: ["/images/products/eggs_image.png"],
        description: ["Farm fresh", "Rich in protein", "Ideal for breakfast"],
        inStock: true,
    },
    {
        name: "Cheese 200g",
        category: "Dairy",
        price: 140,
        offerPrice: 130,
        image: ["/images/products/cheese_image.png"],
        description: ["Creamy and delicious", "Perfect for pizzas", "Rich in calcium"],
        inStock: true,
    },

    // Drinks
    {
        name: "Coca-Cola 1.5L",
        category: "Drinks",
        price: 80,
        offerPrice: 75,
        image: ["/images/products/coca_cola_image.png"],
        description: ["Refreshing and fizzy", "Perfect for parties", "Best served chilled"],
        inStock: true,
    },
    {
        name: "Pepsi 1.5L",
        category: "Drinks",
        price: 78,
        offerPrice: 73,
        image: ["/images/products/pepsi_image.png"],
        description: ["Chilled and refreshing", "Perfect for celebrations", "Best served cold"],
        inStock: true,
    },
    {
        name: "Sprite 1.5L",
        category: "Drinks",
        price: 79,
        offerPrice: 74,
        image: ["/images/products/sprite_image_1.png"],
        description: ["Refreshing citrus taste", "Perfect for hot days", "Best served chilled"],
        inStock: true,
    },
    {
        name: "Fanta 1.5L",
        category: "Drinks",
        price: 77,
        offerPrice: 72,
        image: ["/images/products/fanta_image_1.png"],
        description: ["Sweet and fizzy", "Great for parties", "Best served cold"],
        inStock: true,
    },
    {
        name: "7 Up 1.5L",
        category: "Drinks",
        price: 76,
        offerPrice: 71,
        image: ["/images/products/seven_up_image_1.png"],
        description: ["Refreshing lemon-lime flavor", "Perfect for refreshing", "Best served chilled"],
        inStock: true,
    },

    // Grains
    {
        name: "Basmati Rice 5kg",
        category: "Grains",
        price: 550,
        offerPrice: 520,
        image: ["/images/products/basmati_rice_image.png"],
        description: ["Long grain and aromatic", "Perfect for biryani", "Premium quality"],
        inStock: true,
    },
    {
        name: "Wheat Flour 5kg",
        category: "Grains",
        price: 250,
        offerPrice: 230,
        image: ["/images/products/wheat_flour_image.png"],
        description: ["High-quality whole wheat", "Soft rotis", "Rich in nutrients"],
        inStock: true,
    },
    {
        name: "Quinoa 500g",
        category: "Grains",
        price: 450,
        offerPrice: 420,
        image: ["/images/products/quinoa_image.png"],
        description: ["High in protein", "Gluten-free", "Rich in minerals"],
        inStock: true,
    },
    {
        name: "Brown Rice 1kg",
        category: "Grains",
        price: 120,
        offerPrice: 110,
        image: ["/images/products/brown_rice_image.png"],
        description: ["Whole grain", "Weight management", "Nutritious"],
        inStock: true,
    },
    {
        name: "Barley 1kg",
        category: "Grains",
        price: 150,
        offerPrice: 140,
        image: ["/images/products/barley_image.png"],
        description: ["Rich in fiber", "Helps improve digestion", "Low in fat"],
        inStock: true,
    },

    // Bakery
    {
        name: "Brown Bread 400g",
        category: "Bakery",
        price: 40,
        offerPrice: 35,
        image: ["/images/products/brown_bread_image.png"],
        description: ["Soft and healthy", "Whole wheat", "Ideal for breakfast"],
        inStock: true,
    },
    {
        name: "Butter Croissant",
        category: "Bakery",
        price: 50,
        offerPrice: 45,
        image: ["/images/products/butter_croissant_image.png"],
        description: ["Flaky and buttery", "Freshly baked", "Perfect snack"],
        inStock: true,
    },
    {
        name: "Chocolate Cake",
        category: "Bakery",
        price: 350,
        offerPrice: 325,
        image: ["/images/products/chocolate_cake_image.png"],
        description: ["Rich and moist", "Premium cocoa", "Ideal for celebrations"],
        inStock: true,
    },

    // Instant
    {
        name: "Maggi Noodles",
        category: "Instant",
        price: 55,
        offerPrice: 50,
        image: ["/images/products/maggi_image.png"],
        description: ["Instant", "Delicious taste", "Easy to cook"],
        inStock: true,
    },
    {
        name: "Top Ramen",
        category: "Instant",
        price: 45,
        offerPrice: 40,
        image: ["/images/products/top_ramen_image.png"],
        description: ["Quick and easy", "Spicy flavor", "Popular choice"],
        inStock: true,
    },
    {
        name: "Knorr Cup Soup",
        category: "Instant",
        price: 35,
        offerPrice: 30,
        image: ["/images/products/knorr_soup_image.png"],
        description: ["Healthy", "Nutritious", "Ready in minutes"],
        inStock: true,
    },
    {
        name: "Yippee Noodles",
        category: "Instant",
        price: 50,
        offerPrice: 45,
        image: ["/images/products/yippee_image.png"],
        description: ["Long non-sticky", "Tasty masala", "Kids favorite"],
        inStock: true,
    }
];

async function seedDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        // Clear existing products to avoid duplicates and ensure fresh data
        await Product.deleteMany({});

        // Add only if they don't exist by name
        for (const p of dummyProducts) {
            const exists = await Product.findOne({ name: p.name });
            if (!exists) {
                await Product.create(p);
                console.log(`Added: ${p.name}`);
            }
        }

        console.log("Seeding completed");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
}

seedDB();
