const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product.js");
const User = require("./models/User.js");
const Cart = require("./models/Cart.js");
const products = require("./data/products.js");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Cart.deleteMany();

        const createdUsers = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: "123456",
            role: "admin",

        });
        const userId = createdUsers._id;
        const sampleProducts = products.map(product => {
            return { ...product, user: userId };
        });
        await Product.insertMany(sampleProducts);
        console.log("Data seeded successfully");
        process.exit();
        
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
        
    }
};
seedData();
