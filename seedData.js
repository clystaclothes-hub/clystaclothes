// Database seed data for Raffay Clothing
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require('../models/Order');
require('dotenv').config();

// Sample products data
const products = [
    {
        name: "Classic White T-Shirt",
        description: "Premium quality cotton t-shirt with comfortable fit",
        price: 29.99,
        discountPrice: 24.99,
        images: ["white_tshirt_1.jpg", "white_tshirt_2.jpg"],
        category: "men",
        subcategory: "t-shirts",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["White", "Black", "Navy"],
        stock: 50,
        featured: true
    },
    {
        name: "Women's Floral Dress",
        description: "Elegant floral dress perfect for summer occasions",
        price: 59.99,
        discountPrice: 49.99,
        images: ["floral_dress_1.jpg", "floral_dress_2.jpg"],
        category: "women",
        subcategory: "dresses",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Floral Pink", "Floral Blue", "Floral Yellow"],
        stock: 30,
        featured: true
    },
    {
        name: "Kids Denim Jacket",
        description: "Stylish denim jacket for kids with adjustable fit",
        price: 39.99,
        images: ["kids_denim_1.jpg", "kids_denim_2.jpg"],
        category: "kids",
        subcategory: "jackets",
        sizes: ["2T", "3T", "4T", "5T", "6T"],
        colors: ["Blue Denim", "Black Denim"],
        stock: 25,
        featured: false
    },
    {
        name: "Leather Handbag",
        description: "Genuine leather handbag with multiple compartments",
        price: 89.99,
        discountPrice: 79.99,
        images: ["leather_bag_1.jpg", "leather_bag_2.jpg"],
        category: "accessories",
        subcategory: "bags",
        colors: ["Brown", "Black", "Tan"],
        stock: 15,
        featured: true
    },
    {
        name: "Men's Casual Shirt",
        description: "Comfortable cotton shirt for everyday wear",
        price: 34.99,
        images: ["casual_shirt_1.jpg", "casual_shirt_2.jpg"],
        category: "men",
        subcategory: "shirts",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Blue", "White", "Gray", "Black"],
        stock: 40,
        featured: false
    },
    {
        name: "Women's Skinny Jeans",
        description: "High-quality skinny jeans with stretch comfort",
        price: 44.99,
        discountPrice: 39.99,
        images: ["skinny_jeans_1.jpg", "skinny_jeans_2.jpg"],
        category: "women",
        subcategory: "jeans",
        sizes: ["24", "26", "28", "30", "32", "34"],
        colors: ["Dark Blue", "Light Blue", "Black"],
        stock: 35,
        featured: true
    },
    {
        name: "Kids Summer T-Shirt",
        description: "Soft cotton t-shirt perfect for summer play",
        price: 19.99,
        images: ["kids_tshirt_1.jpg", "kids_tshirt_2.jpg"],
        category: "kids",
        subcategory: "t-shirts",
        sizes: ["2T", "3T", "4T", "5T", "6T", "7T", "8T"],
        colors: ["Red", "Blue", "Green", "Yellow"],
        stock: 45,
        featured: false
    },
    {
        name: "Stylish Sunglasses",
        description: "UV protection sunglasses with modern design",
        price: 24.99,
        images: ["sunglasses_1.jpg", "sunglasses_2.jpg"],
        category: "accessories",
        subcategory: "sunglasses",
        colors: ["Black", "Brown", "Gold"],
        stock: 20,
        featured: false
    },
    {
        name: "Men's Sports Shoes",
        description: "Comfortable sports shoes for active lifestyle",
        price: 69.99,
        discountPrice: 59.99,
        images: ["sports_shoes_1.jpg", "sports_shoes_2.jpg"],
        category: "men",
        subcategory: "shoes",
        sizes: ["7", "8", "9", "10", "11", "12"],
        colors: ["Black", "White", "Gray"],
        stock: 30,
        featured: true
    },
    {
        name: "Women's Maxi Dress",
        description: "Flowing maxi dress perfect for summer evenings",
        price: 54.99,
        images: ["maxi_dress_1.jpg", "maxi_dress_2.jpg"],
        category: "women",
        subcategory: "dresses",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Navy", "Coral", "Teal"],
        stock: 25,
        featured: false
    }
];

// Sample users data
const users = [
    {
        name: "Admin User",
        email: "admin@raffay.com",
        password: "admin123",
        role: "admin",
        phone: "1234567890",
        address: {
            street: "123 Admin Street",
            city: "Karachi",
            state: "Sindh",
            zipCode: "75000",
            country: "Pakistan"
        }
    },
    {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: "user",
        phone: "1234567891",
        address: {
            street: "456 User Street",
            city: "Lahore",
            state: "Punjab",
            zipCode: "54000",
            country: "Pakistan"
        }
    },
    {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password123",
        role: "user",
        phone: "1234567892",
        address: {
            street: "789 User Avenue",
            city: "Islamabad",
            state: "Islamabad",
            zipCode: "44000",
            country: "Pakistan"
        }
    }
];

// Sample orders data
const orders = [
    {
        user: null, // Will be populated after user creation
        items: [
            {
                product: null, // Will be populated after product creation
                quantity: 2,
                size: "M",
                color: "White",
                price: 29.99
            }
        ],
        shippingAddress: {
            name: "John Doe",
            email: "john@example.com",
            phone: "1234567891",
            street: "456 User Street",
            city: "Lahore",
            state: "Punjab",
            zipCode: "54000",
            country: "Pakistan"
        },
        paymentInfo: {
            method: "card",
            transactionId: "TXN123456789",
            amount: 59.98
        },
        orderStatus: "delivered",
        totalAmount: 59.98
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/raffay-clothing');
        console.log('Connected to MongoDB');

        // Clear existing data
        await Product.deleteMany({});
        await User.deleteMany({});
        await Order.deleteMany({});
        console.log('Cleared existing data');

        // Create users
        const createdUsers = await User.insertMany(users);
        console.log('Users created:', createdUsers.length);

        // Create products
        const createdProducts = await Product.insertMany(products);
        console.log('Products created:', createdProducts.length);

        // Create orders with references
        for (let order of orders) {
            order.user = createdUsers[1]._id; // John Doe
            order.items[0].product = createdProducts[0]._id; // Classic White T-Shirt
        }

        const createdOrders = await Order.insertMany(orders);
        console.log('Orders created:', createdOrders.length);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

// Run seeding if this file is executed directly
if (require.main === module) {
    seedDatabase();
}

module.exports = { seedDatabase, products, users, orders };
