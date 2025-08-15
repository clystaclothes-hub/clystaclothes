const express = require('express');
const router = express.Router();

// Mock cart data (in production, use database)
let cart = [];

// Get cart
router.get('/', (req, res) => {
    res.json(cart);
});

// Add to cart
router.post('/add', (req, res) => {
    const { productId, quantity, size, color } = req.body;

    const existingItem = cart.find(item =>
        item.productId === productId &&
        item.size === size &&
        item.color === color
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ productId, quantity, size, color });
    }

    res.json({ message: 'Item added to cart', cart });
});

// Remove from cart
router.delete('/remove/:productId', (req, res) => {
    const { productId } = req.params;
    cart = cart.filter(item => item.productId !== productId);
    res.json({ message: 'Item removed from cart', cart });
});

// Clear cart
router.delete('/clear', (req, res) => {
    cart = [];
    res.json({ message: 'Cart cleared', cart });
});

module.exports = router;
