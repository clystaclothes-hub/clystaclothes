const mongoose = require('mongoose');

const paymentEventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['paypal', 'jazzcash', 'easypaisa', 'credit_card', 'debit_card', 'bank_transfer', 'cod'],
        required: true
    },
    eventType: {
        type: String,
        enum: ['payment_initiated', 'payment_success', 'payment_failed', 'payment_pending', 'payment_cancelled', 'payment_refunded'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'PKR'
    },
    transactionId: String,
    gatewayResponse: {
        type: Object,
        default: {}
    },
    errorMessage: String,
    failureReason: String,
    metadata: {
        ipAddress: String,
        userAgent: String,
        timestamp: { type: Date, default: Date.now },
        paymentGatewayResponse: Object
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Indexes for better query performance
paymentEventSchema.index({ userId: 1, createdAt: -1 });
paymentEventSchema.index({ orderId: 1 });
paymentEventSchema.index({ paymentMethod: 1, eventType: 1 });
paymentEventSchema.index({ transactionId: 1 });

module.exports = mongoose.model('PaymentEvent', paymentEventSchema);
