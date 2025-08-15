const mongoose = require('mongoose');

const cartEventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    eventType: {
        type: String,
        enum: ['add_to_cart', 'remove_from_cart', 'view_cart', 'proceed_to_checkout', 'cart_abandon'],
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    },
    priceAtTime: {
        type: Number,
        required: true
    },
    size: String,
    color: String,
    metadata: {
        ipAddress: String,
        userAgent: String,
        referrer: String,
        timestamp: { type: Date, default: Date.now },
        sessionId: String,
        pageUrl: String,
        deviceType: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Indexes for better query performance
cartEventSchema.index({ userId: 1, createdAt: -1 });
cartEventSchema.index({ productId: 1, eventType: 1 });
cartEventSchema.index({ createdAt: -1 });
cartEventSchema.index({ sessionId: 1 });

module.exports = mongoose.model('CartEvent', cartEventSchema);
