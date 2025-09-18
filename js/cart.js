// Shopping Cart Management
let cart = JSON.parse(localStorage.getItem('animeWearCart')) || [];

// Add item to cart
function addToCart(productId, selectedSize = null) {
    const product = getProductById(productId);
    if (!product) return;
    
    // Get selected size from the product card or parameter
    let size = selectedSize;
    if (!size) {
        const productCard = document.querySelector(`[data-id="${productId}"]`);
        const selectedSizeBtn = productCard?.querySelector('.size-btn.selected');
        
        if (!selectedSizeBtn) {
            showMessage('Por favor selecciona una talla', 'error');
            return;
        }
        size = selectedSizeBtn.textContent;
    }
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.id === productId && item.size === size
    );
    
    if (existingItemIndex > -1) {
        // Increase quantity
        cart[existingItemIndex].quantity += 1;
        showMessage(`Se agregó otra unidad de ${product.name} (${size}) al carrito`, 'success');
    } else {
        // Add new item
        const cartItem = {
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            size: size,
            quantity: 1,
            category: product.category
        };
        cart.push(cartItem);
        showMessage(`${product.name} (${size}) agregado al carrito`, 'success');
    }
    
    updateCartUI();
    saveCartToStorage();
    
    // Add animation effect to cart button
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.style.animation = 'none';
    cartBtn.offsetHeight; // Trigger reflow
    cartBtn.style.animation = 'pulse 0.6s ease';
}

// Remove item from cart
function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    updateCartUI();
    saveCartToStorage();
    showMessage('Producto eliminado del carrito', 'success');
}

// Update item quantity
function updateQuantity(productId, size, newQuantity) {
    const itemIndex = cart.findIndex(item => 
        item.id === productId && item.size === size
    );
    
    if (itemIndex > -1) {
        if (newQuantity <= 0) {
            removeFromCart(productId, size);
        } else {
            cart[itemIndex].quantity = newQuantity;
            updateCartUI();
            saveCartToStorage();
        }
    }
}

// Increase quantity
function increaseQuantity(productId, size) {
    const item = cart.find(item => item.id === productId && item.size === size);
    if (item) {
        updateQuantity(productId, size, item.quantity + 1);
    }
}

// Decrease quantity
function decreaseQuantity(productId, size) {
    const item = cart.find(item => item.id === productId && item.size === size);
    if (item) {
        updateQuantity(productId, size, item.quantity - 1);
    }
}

// Calculate cart total
function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
function getCartItemCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// Update cart UI
function updateCartUI() {
    updateCartCount();
    updateCartItems();
    updateCartTotal();
}

// Update cart count badge
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const itemCount = getCartItemCount();
    cartCount.textContent = itemCount;
    cartCount.style.display = itemCount > 0 ? 'flex' : 'none';
}

// Update cart items display
function updateCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3>Tu carrito está vacío</h3>
                <p>Agrega algunos productos increíbles a tu carrito.</p>
                <button class="cta-btn" onclick="toggleCart(); scrollToProducts();">
                    Ir a comprar <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}" data-size="${item.size}">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-size">Talla: ${item.size}</div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
                <div class="item-quantity">
                    <button class="quantity-btn" onclick="decreaseQuantity(${item.id}, '${item.size}')">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="increaseQuantity(${item.id}, '${item.size}')">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id}, '${item.size}')" title="Eliminar producto">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// Update cart total
function updateCartTotal() {
    const cartTotal = document.getElementById('cart-total');
    const total = calculateCartTotal();
    cartTotal.textContent = total.toFixed(2);
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');
    
    if (cartSidebar.classList.contains('open')) {
        cartSidebar.classList.remove('open');
        overlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    } else {
        cartSidebar.classList.add('open');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Close favorites if open
        const favoritesSidebar = document.getElementById('favorites-sidebar');
        favoritesSidebar.classList.remove('open');
    }
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('animeWearCart', JSON.stringify(cart));
}

// Clear cart
function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        cart = [];
        updateCartUI();
        saveCartToStorage();
        showMessage('Carrito vaciado', 'success');
    }
}

// Checkout process
function checkout() {
    if (cart.length === 0) {
        showMessage('Tu carrito está vacío', 'error');
        return;
    }
    
    const total = calculateCartTotal();
    const itemCount = getCartItemCount();
    
    // Simulate checkout process
    showMessage('Procesando pedido...', 'success');
    
    setTimeout(() => {
        // Create order summary
        const orderSummary = cart.map(item => 
            `${item.name} (${item.size}) x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
        ).join('\n');
        
        alert(`¡Pedido realizado con éxito!\n\nResumen del pedido:\n${orderSummary}\n\nTotal: $${total.toFixed(2)}\n\nRecibirás un email de confirmación pronto.`);
        
        // Clear cart after successful checkout
        cart = [];
        updateCartUI();
        saveCartToStorage();
        toggleCart();
        
        showMessage('¡Pedido realizado con éxito!', 'success');
    }, 2000);
}

// Get cart summary for display
function getCartSummary() {
    const itemCount = getCartItemCount();
    const total = calculateCartTotal();
    
    return {
        itemCount,
        total,
        items: cart
    };
}

// Apply discount code
function applyDiscountCode(code) {
    const discountCodes = {
        'ANIME10': 0.10,
        'WELCOME15': 0.15,
        'NARUTO20': 0.20,
        'ONEPIECE25': 0.25
    };
    
    const discount = discountCodes[code.toUpperCase()];
    
    if (discount) {
        const total = calculateCartTotal();
        const discountAmount = total * discount;
        const finalTotal = total - discountAmount;
        
        showMessage(`¡Código aplicado! Descuento de ${(discount * 100)}% - Ahorras $${discountAmount.toFixed(2)}`, 'success');
        
        return {
            isValid: true,
            discount: discount,
            discountAmount: discountAmount,
            finalTotal: finalTotal
        };
    } else {
        showMessage('Código de descuento inválido', 'error');
        return {
            isValid: false
        };
    }
}

// Initialize cart on page load
function initializeCart() {
    updateCartUI();
    
    // Add event listeners
    document.addEventListener('click', function(e) {
        // Close cart when clicking outside
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartBtn = document.querySelector('.cart-btn');
        
        if (cartSidebar.classList.contains('open') && 
            !cartSidebar.contains(e.target) && 
            !cartBtn.contains(e.target)) {
            // Don't close if clicking on overlay (handled separately)
            if (!e.target.classList.contains('overlay')) {
                return;
            }
        }
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            toggleCart();
        }
    });
}

// Add items to cart in bulk (for promotional purposes)
function addBulkToCart(productIds) {
    let addedCount = 0;
    
    productIds.forEach(productId => {
        const product = getProductById(productId);
        if (product) {
            const cartItem = {
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                size: 'M', // Default size for bulk adds
                quantity: 1,
                category: product.category
            };
            cart.push(cartItem);
            addedCount++;
        }
    });
    
    if (addedCount > 0) {
        updateCartUI();
        saveCartToStorage();
        showMessage(`${addedCount} productos agregados al carrito`, 'success');
    }
}

// Get recommended products based on cart contents
function getRecommendedProducts() {
    if (cart.length === 0) return [];
    
    const cartCategories = [...new Set(cart.map(item => item.category))];
    const recommendedProducts = products.filter(product => 
        cartCategories.includes(product.category) && 
        !cart.some(cartItem => cartItem.id === product.id)
    );
    
    return recommendedProducts.slice(0, 4); // Return max 4 recommendations
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCart();
    
    // Add escape key listener for cart
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const cartSidebar = document.getElementById('cart-sidebar');
            if (cartSidebar.classList.contains('open')) {
                toggleCart();
            }
        }
    });
    
    // Add cart icon animation on page load if cart has items
    if (getCartItemCount() > 0) {
        const cartBtn = document.querySelector('.cart-btn');
        cartBtn.style.animation = 'pulse 1s ease';
    }
});
