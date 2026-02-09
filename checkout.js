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

// ================== CHECKOUT PAGE FUNCTIONALITY ==================
let cartItems = [];
const shippingCosts = {
    standard: 0,
    express: 15,
    overnight: 35
};

const TAX_RATE = 0.08; // 8% tax

// Load cart items from localStorage
function loadCartItems() {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
        cartItems = JSON.parse(savedCartItems);
    }
    
    if (cartItems.length === 0) {
        showEmptyCartMessage();
    } else {
        displayOrderSummary();
        updateOrderTotal();
    }
}

// Display order summary
function displayOrderSummary() {
    const summaryContainer = document.getElementById('checkoutOrderSummary');
    summaryContainer.innerHTML = '';
    
    cartItems.forEach(item => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        const itemElement = document.createElement('div');
        itemElement.className = 'summary-item';
        itemElement.innerHTML = `
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-qty-price">Qty: ${item.quantity} × $${item.price.toFixed(2)}</div>
            </div>
            <div class="item-total">$${itemTotal}</div>
        `;
        summaryContainer.appendChild(itemElement);
    });
}

// Calculate and update order total
function updateOrderTotal() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const selectedShipping = document.querySelector('input[name="shippingMethod"]:checked');
    const shippingMethod = selectedShipping ? selectedShipping.value : 'standard';
    const shippingCost = shippingCosts[shippingMethod] || 0;
    const taxAmount = subtotal * TAX_RATE;
    const grandTotal = subtotal + shippingCost + taxAmount;
    
    // Update display
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('taxAmount').textContent = `$${taxAmount.toFixed(2)}`;
    document.getElementById('grandTotal').textContent = `$${grandTotal.toFixed(2)}`;
    
    // Update shipping cost display
    const shippingDisplay = document.getElementById('shippingCost');
    if (shippingCost === 0) {
        shippingDisplay.textContent = 'FREE';
    } else {
        shippingDisplay.textContent = `$${shippingCost.toFixed(2)}`;
    }
}

// Show empty cart message
function showEmptyCartMessage() {
    const summaryContainer = document.getElementById('checkoutOrderSummary');
    summaryContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: #999;">
            <i class="fas fa-shopping-cart" style="font-size: 48px; margin-bottom: 15px; display: block;"></i>
            <p>Your cart is empty. <a href="index.html" style="color: var(--amazon-orange);">Continue Shopping</a></p>
        </div>
    `;
    document.querySelector('.order-total-card').style.display = 'none';
}

// Handle shipping method change
document.querySelectorAll('input[name="shippingMethod"]').forEach(input => {
    input.addEventListener('change', updateOrderTotal);
});

// Validate form inputs
function validateForms() {
    const shippingForm = document.getElementById('shippingForm');
    const paymentForm = document.getElementById('paymentForm');
    
    if (!shippingForm.checkValidity()) {
        shippingForm.reportValidity();
        return false;
    }
    
    if (!paymentForm.checkValidity()) {
        paymentForm.reportValidity();
        return false;
    }
    
    // Validate card number (basic check)
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cardNumber)) {
        alert('Please enter a valid 16-digit card number.');
        return false;
    }
    
    // Validate expiry date
    const expiry = document.getElementById('expiry').value;
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        alert('Please enter expiry date in MM/YY format.');
        return false;
    }
    
    // Validate CVV
    const cvv = document.getElementById('cvv').value;
    if (!/^\d{3,4}$/.test(cvv)) {
        alert('Please enter a valid CVV (3 or 4 digits).');
        return false;
    }
    
    return true;
}

// Format card number input
document.getElementById('cardNumber').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
    e.target.value = formattedValue;
});

// Format expiry date input
document.getElementById('expiry').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
});

// Format CVV input
document.getElementById('cvv').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
});

// Place Order button
document.getElementById('placeOrderBtn').addEventListener('click', function() {
    if (cartItems.length === 0) {
        alert('Your cart is empty. Please add items before placing an order.');
        window.location.href = 'index.html';
        return;
    }
    
    if (!validateForms()) {
        return;
    }
    
    // Simulate order placement
    const orderBtn = this;
    orderBtn.disabled = true;
    orderBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
    
    setTimeout(() => {
        // Clear cart
        localStorage.removeItem('cartItems');
        
        // Show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success alert-dismissible fade show';
        successDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 9999;
            min-width: 400px;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        `;
        successDiv.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            <strong>Order Placed Successfully!</strong>
            <p style="margin-top: 10px; font-size: 0.9rem;">Thank you for your purchase. A confirmation email has been sent to your inbox.</p>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(successDiv);
        
        // Redirect after 3 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    }, 2000);
});

// Add CSS animation keyframes dynamically
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
`;
document.head.appendChild(style);

// Load cart items on page load
window.addEventListener('load', loadCartItems);

console.log('%cShopHub - Checkout Page', 'font-size: 16px; color: #FF9900; font-weight: bold;');
console.log('%cSecuring your payment...', 'font-size: 12px; color: #131921;');
