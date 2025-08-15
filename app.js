// Frontend JavaScript for Raffay Clothing Website
const API_BASE_URL = 'http://localhost:5000/api';

// Utility functions
const showMessage = (message, type = 'info') => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
};

// API helper
const apiRequest = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        showMessage('Network error. Please check your connection.', 'error');
    }
};

// Authentication
class AuthService {
    static async login(email, password) {
        const response = await apiRequest('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            showMessage('Login successful!');
            window.location.href = 'index.html';
        }
        return response;
    }

    static async register(userData) {
        const response = await apiRequest('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });

        if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            showMessage('Registration successful!');
            window.location.href = 'index.html';
        }
        return response;
    }

    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }

    static isAuthenticated() {
        return !!localStorage.getItem('token');
    }

    static getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
}

// Product Service
class ProductService {
    static async getAllProducts(filters = {}) {
        const query = new URLSearchParams(filters).toString();
        return await apiRequest(`/products?${query}`);
    }

    static async getProductById(id) {
        return await apiRequest(`/products/${id}`);
    }

    static async getProductsByCategory(category) {
        return await apiRequest(`/products/category/${category}`);
    }
}

// Cart Service
class CartService {
    static getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    static addToCart(product) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.productId === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                productId: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateCartCount();
        showMessage(`${product.name} added to cart!`);
    }

    static removeFromCart(productId) {
        let cart = this.getCart();
        cart = cart.filter(item => item.productId !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateCartCount();
        this.displayCart();
    }

    static updateCartCount() {
        const cart = this.getCart();
        const count = cart.reduce((total, item) => total + item.quantity, 0);

        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(el => el.textContent = count);
    }

    static getTotalPrice() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    static displayCart() {
        const cart = this.getCart();
        const cartContainer = document.getElementById('cart-items');

        if (!cartContainer) return;

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty</p>';
            return;
        }

        cartContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
                <div>
                    <h4>${item.name}</h4>
                    <p>Price: $${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <button onclick="CartService.removeFromCart('${item.productId}')">Remove</button>
            </div>
        `).join('');

        document.getElementById('cart-total').textContent = `$${this.getTotalPrice().toFixed(2)}`;
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart count
    CartService.updateCartCount();

    // Setup navigation
    setupNavigation();

    // Setup forms
    setupForms();

    // Setup product interactions
    setupProductInteractions();
});

function setupNavigation() {
    // Update navigation based on authentication
    const user = AuthService.getCurrentUser();
    const navLinks = document.querySelectorAll('.nav-links');

    navLinks.forEach(nav => {
        if (user) {
            // Show user-specific links
            const userNav = document.createElement('li');
            userNav.innerHTML = `
                <span>Hello, ${user.name}</span>
                <button onclick="AuthService.logout()">Logout</button>
            `;
            nav.appendChild(userNav);
        }
    });
}

function setupForms() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            await AuthService.login(email, password);
        });
    }

    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirm').value;

            if (password !== confirmPassword) {
                showMessage('Passwords do not match!', 'error');
                return;
            }

            await AuthService.register({ name, email, password });
        });
    }
}

function setupProductInteractions() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const product = {
                id: productCard.dataset.productId,
                name: productCard.querySelector('h3').textContent,
                price: parseFloat(productCard.querySelector('.price').textContent.replace('$', '')),
                images: [productCard.querySelector('img').src]
            };

            CartService.addToCart(product);
        });
    });
}

// Global functions for HTML onclick events
window.CartService = CartService;
window.AuthService = AuthService;

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AuthService, ProductService, CartService };
}
