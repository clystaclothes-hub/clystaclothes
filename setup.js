// Database setup script for Raffay Clothing
const mongoose = require('mongoose');
const { seedDatabase } = require('./seedData');

// Database connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/raffay-clothing');

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Create indexes
        await createIndexes();

        return conn;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

// Create database indexes
const createIndexes = async () => {
    const Product = require('../models/Product');
    const User = require('../models/User');
    const Order = require('../models/Order');
    const CartEvent = require('../models/CartEvent');
    const PaymentEvent = require('../models/PaymentEvent');

    // Product indexes
    await Product.collection.createIndex({ name: 'text', description: 'text' });
    await Product.collection.createIndex({ category: 1 });
    await Product.collection.createIndex({ price: 1 });
    await Product.collection.createIndex({ createdAt: -1 });

    // User indexes
    await User.collection.createIndex({ email: 1 }, { unique: true });
    await User.collection.createIndex({ createdAt: -1 });

    // Order indexes
    await Order.collection.createIndex({ user: 1 });
    await Order.collection.createIndex({ createdAt: -1 });
    await Order.collection.createIndex({ orderStatus: 1 });

    console.log('Database indexes created successfully');
};

// Database health check
const checkDatabaseHealth = async () => {
    try {
        const Product = require('../models/Product');
        const User = require('../models/User');
        const Order = require('../models/Order');

        const productCount = await Product.countDocuments();
        const userCount = await User.countDocuments();
        const orderCount = await Order.countDocuments();

        console.log('Database Health Check:');
        console.log(`- Products: ${productCount}`);
        console.log(`- Users: ${userCount}`);
        console.log(`- Orders: ${orderCount}`);

        return {
            products: productCount,
            users: userCount,
            orders: orderCount,
            status: 'healthy'
        };
    } catch (error) {
        console.error('Database health check failed:', error);
        return { status: 'error', error: error.message };
    }
};

module.exports = {
    connectDB,
    createIndexes,
    checkDatabaseHealth
};

// Run setup if executed directly
if (require.main === module) {
    connectDB().then(() => {
        console.log('Database setup complete');
        process.exit(0);
    });
}
