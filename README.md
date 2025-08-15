# Raffay Clothing Database Setup

## Overview
Complete database setup and management for the Raffay Clothing website.

## Database Structure

### Collections
1. **Products** - Product catalog
2. **Users** - Customer accounts
3. **Orders** - Customer orders
4. **Cart** - Shopping cart items

### Product Schema
- name (String, required)
- description (String, required)
- price (Number, required)
- discountPrice (Number)
- images (Array)
- category (String: men, women, kids, accessories)
- subcategory (String)
- sizes (Array)
- colors (Array)
- stock (Number)
- featured (Boolean)
- createdAt (Date)

### User Schema
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- phone (String)
- address (Object)
- role (String: user, admin)
- createdAt (Date)

### Order Schema
- user (ObjectId, reference to User)
- items (Array of order items)
- shippingAddress (Object)
- paymentInfo (Object)
- orderStatus (String: pending, processing, shipped, delivered, cancelled)
- totalAmount (Number)
- createdAt (Date)

## Setup Instructions

### 1. Install MongoDB
- Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- Install and start MongoDB service

### 2. Setup Database
```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your MongoDB URI
MONGODB_URI=mongodb://localhost:27017/raffay-clothing

# Seed database with sample data
npm run seed
```

### 3. Database Commands
```bash
# Start database
npm run db:start

# Seed database
npm run db:seed

# Check database health
npm run db:health

# Reset database
npm run db:reset

# Backup database
npm run db:backup
```

### 4. Sample Data
The database comes pre-loaded with:
- 10 sample products across all categories
- 3 sample users (including admin)
- Sample orders for testing

### 5. MongoDB Compass
For visual database management:
1. Download MongoDB Compass
2. Connect to: mongodb://localhost:27017
3. Database: raffay-clothing

## Database Indexes
- Products: text search on name/description, category index, price index
- Users: unique email index
- Orders: user reference index, date index, status index

## API Integration
All backend routes are connected to the database:
- `/api/products` - Product management
- `/api/auth` - User authentication
- `/api/cart` - Shopping cart
- `/api/orders` - Order management
- `/api/payment` - Payment processing
