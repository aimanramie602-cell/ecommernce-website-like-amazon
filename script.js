// ================== SCROLL ANIMATIONS ==================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            scrollObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all scroll-animate elements
document.querySelectorAll('.scroll-animate').forEach(element => {
    scrollObserver.observe(element);
});

// ================== SHOPPING CART FUNCTIONALITY ==================
let cartItems = [];
const cartCountElement = document.querySelector('.cart-count');
const cartDropdown = document.getElementById('cartDropdown');
const cartToggle = document.getElementById('cartToggle');
const cartClose = document.querySelector('.cart-close');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartFooter = document.getElementById('cartFooter');

// Price mapping for products
const productPrices = {
    'Premium Headphones': 239,
    'Smart Watch Pro': 349,
    '4K Camera': 679,
    'Mechanical Keyboard': 199,
    'Wireless Mouse': 37,
    'Laptop Stand': 79,
    'USB-C Hub': 59,
    'Bluetooth Speaker': 89,
    'Earbuds Pro': 129,
    'Game Controller': 69,
    'Phone Stand': 29,
    'Fast Charger': 39
};

// Toggle cart dropdown
cartToggle.addEventListener('click', function(e) {
    e.preventDefault();
    cartDropdown.classList.toggle('active');
});

// Close cart dropdown
cartClose.addEventListener('click', function(e) {
    e.preventDefault();
    cartDropdown.classList.remove('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!cartDropdown.contains(e.target) && !cartToggle.contains(e.target)) {
        cartDropdown.classList.remove('active');
    }
});

// Add to Cart Button Handlers
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const productName = this.getAttribute('data-product');
        const price = productPrices[productName] || 0;
        addToCart(productName, price);
        
        // Show feedback
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Added!';
        this.disabled = true;
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.disabled = false;
        }, 2000);
    });
});

function addToCart(productName, price) {
    // Check if product already exists in cart
    const existingItem = cartItems.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            name: productName,
            price: price,
            quantity: 1,
            id: Date.now()
        });
    }
    
    updateCartCount();
    updateCartDisplay();
    showNotification(productName, price);
}

function updateCartCount() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    cartCountElement.classList.add('pulse');
    setTimeout(() => cartCountElement.classList.remove('pulse'), 300);
}

function updateCartDisplay() {
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        cartFooter.style.display = 'none';
        return;
    }

    cartItemsContainer.innerHTML = cartItems.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-qty">Qty: <span id="qty-${item.id}">${item.quantity}</span></div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}" onclick="removeFromCart(${item.id}); return false;">Remove</button>
        </div>
    `).join('');

    // Calculate and show total
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
    cartFooter.style.display = 'block';
}

function removeFromCart(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);
    updateCartCount();
    updateCartDisplay();
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'alert alert-warning alert-dismissible fade show';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    `;
    notification.innerHTML = `
        <i class="fas fa-trash me-2"></i>
        Item removed from cart
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

function showNotification(productName, price) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success alert-dismissible fade show';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    `;
    notification.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        <strong>${productName}</strong> ($${price.toFixed(2)}) added to cart!
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// ================== NEWSLETTER FORM ==================
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (email) {
            const notification = document.createElement('div');
            notification.className = 'alert alert-info alert-dismissible fade show';
            notification.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 9999;
                min-width: 300px;
                animation: slideInRight 0.3s ease;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            `;
            notification.innerHTML = `
                <i class="fas fa-envelope me-2"></i>
                Thank you! Check your email for exclusive offers.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            document.body.appendChild(notification);
            
            this.reset();
            
            setTimeout(() => {
                notification.remove();
            }, 5000);
        }
    });
}

// ================== SMOOTH SCROLL FOR ANCHOR LINKS ==================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================== SEARCH FUNCTIONALITY ==================
const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');

if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            alert(`Searching for: ${query}`);
            searchInput.value = '';
        }
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                alert(`Searching for: ${query}`);
                this.value = '';
            }
        }
    });
}

// ================== MOBILE MENU CLOSE ON LINK CLICK ==================
document.querySelectorAll('.nav-link, .nav-item-link').forEach(link => {
    link.addEventListener('click', function() {
        // Close any open dropdowns if needed
        console.log('Navigation item clicked:', this.textContent);
    });
});

// ================== ADD CSS ANIMATION KEYFRAMES DYNAMICALLY ==================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes cartPulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
    }
    
    .cart-count.pulse {
        animation: cartPulse 0.3s ease;
    }
`;
document.head.appendChild(style);

// ================== CLEAR CART FUNCTIONALITY ==================
function clearCart() {
    if (cartItems.length === 0) {
        showNotification('Cart is already empty!', 0);
        return;
    }
    
    cartItems = [];
    updateCartCount();
    updateCartDisplay();
    
    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'alert alert-success alert-dismissible fade show';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    `;
    notification.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        Cart cleared successfully!
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// Attach event listener to Clear Cart button
document.addEventListener('DOMContentLoaded', function() {
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }
});

// ================== LOAD CART ON PAGE LOAD ==================
window.addEventListener('load', function() {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
        cartItems = JSON.parse(savedCartItems);
        updateCartCount();
        updateCartDisplay();
    }
});

// ================== PRODUCT HOVER EFFECTS ==================
document.querySelectorAll('.product-box, .product-item-grid').forEach(product => {
    product.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
});

// ================== CONSOLE WELCOME MESSAGE ==================
console.log('%cShopHub - Amazon Style Ecommerce Platform', 'font-size: 20px; color: #FF9900; font-weight: bold;');
console.log('%cReady to serve you!', 'font-size: 14px; color: #131921;');
 