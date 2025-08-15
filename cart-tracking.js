// Enhanced cart tracking for cart.html
document.addEventListener('DOMContentLoaded', function () {
    // Initialize tracking
    const tracker = window.analyticsTracker || new AnalyticsTracker();

    // Track cart interactions
    function trackCartInteraction(productId, eventType, quantity = 1, price = 0, size = null, color = null) {
        tracker.trackCartEvent(productId, eventType, quantity, price, size, color);
    }

    // Track add to cart
    window.trackAddToCart = function (productId, price, size = null, color = null) {
        trackCartInteraction(productId, 'add_to_cart', 1, price, size, color);
    };

    // Track remove from cart
    window.trackRemoveFromCart = function (productId, price, size = null, color = null) {
        trackCartInteraction(productId, 'remove_from_cart', 1, price, size, color);
    };

    // Track proceed to checkout
    window.trackProceedToCheckout = function () {
        trackCartInteraction(null, 'proceed_to_checkout');
    };

    // Track cart view
    window.trackCartView = function () {
        trackCartInteraction(null, 'view_cart');
    };

    // Track cart abandonment
    window.trackCartAbandon = function () {
        trackCartInteraction(null, 'cart_abandon');
    };

    // Add tracking to existing cart interactions
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            trackProceedToCheckout();
        });
    }

    // Track cart view on page load
    trackCartView();
});
