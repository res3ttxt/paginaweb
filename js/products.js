// Products Database
const products = [
    {
        id: 1,
        name: "Polo Naruto Uzumaki",
        category: "naruto",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
        description: "Polo premium con diseño de Naruto Uzumaki. Material 100% algodón de alta calidad.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        badge: "Nuevo",
        rating: 4.8,
        reviews: 156
    },
    {
        id: 2,
        name: "Polo Sasuke Uchiha",
        category: "naruto",
        price: 32.99,
        image: "https://images.unsplash.com/photo-1583743814966-8936f37f86e2?w=400&h=400&fit=crop&crop=center",
        description: "Diseño exclusivo de Sasuke Uchiha con el emblema del clan Uchiha.",
        sizes: ["S", "M", "L", "XL"],
        badge: "Popular",
        rating: 4.9,
        reviews: 203
    },
    {
        id: 3,
        name: "Polo Luffy Gear 5",
        category: "onepiece",
        price: 35.99,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop&crop=center",
        description: "Polo con el diseño más reciente de Luffy en su forma Gear 5.",
        sizes: ["M", "L", "XL", "XXL"],
        badge: "Exclusivo",
        rating: 5.0,
        reviews: 89
    },
    {
        id: 4,
        name: "Polo Roronoa Zoro",
        category: "onepiece",
        price: 31.99,
        image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=400&fit=crop&crop=center",
        description: "Diseño minimalista del espadachín Roronoa Zoro con sus tres espadas.",
        sizes: ["S", "M", "L", "XL"],
        badge: "",
        rating: 4.7,
        reviews: 134
    },
    {
        id: 5,
        name: "Polo Goku Ultra Instinto",
        category: "dragonball",
        price: 38.99,
        image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop&crop=center",
        description: "Polo con el diseño de Goku en su forma Ultra Instinto dominado.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        badge: "Limitado",
        rating: 4.9,
        reviews: 278
    },
    {
        id: 6,
        name: "Polo Vegeta Príncipe",
        category: "dragonball",
        price: 33.99,
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center",
        description: "Diseño elegante de Vegeta con el emblema real de los Saiyajin.",
        sizes: ["M", "L", "XL"],
        badge: "",
        rating: 4.6,
        reviews: 167
    },
    {
        id: 7,
        name: "Polo Eren Titán",
        category: "attackontitan",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop&crop=center",
        description: "Diseño impactante de Eren en su forma de Titán de Ataque.",
        sizes: ["S", "M", "L", "XL"],
        badge: "Nuevo",
        rating: 4.8,
        reviews: 95
    },
    {
        id: 8,
        name: "Polo Levi Ackerman",
        category: "attackontitan",
        price: 36.99,
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop&crop=center",
        description: "Polo con el diseño del Capitán Levi y las alas de la libertad.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        badge: "Popular",
        rating: 4.9,
        reviews: 312
    },
    {
        id: 9,
        name: "Polo Tanjiro Kamado",
        category: "demonslayer",
        price: 30.99,
        image: "https://images.unsplash.com/photo-1564584217132-2271339eb2ee?w=400&h=400&fit=crop&crop=center",
        description: "Polo con el patrón distintivo del haori de Tanjiro Kamado.",
        sizes: ["S", "M", "L", "XL"],
        badge: "",
        rating: 4.7,
        reviews: 189
    },
    {
        id: 10,
        name: "Polo Nezuko Demon",
        category: "demonslayer",
        price: 32.99,
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop&crop=center",
        description: "Diseño adorable de Nezuko con su característico bambú.",
        sizes: ["S", "M", "L", "XL"],
        badge: "Nuevo",
        rating: 4.8,
        reviews: 145
    },
    {
        id: 11,
        name: "Polo Deku One For All",
        category: "myheroacademia",
        price: 33.99,
        image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop&crop=center",
        description: "Polo con el diseño de Izuku Midoriya y su Quirk One For All.",
        sizes: ["M", "L", "XL", "XXL"],
        badge: "Popular",
        rating: 4.8,
        reviews: 267
    },
    {
        id: 12,
        name: "Polo All Might Symbol",
        category: "myheroacademia",
        price: 35.99,
        image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop&crop=center",
        description: "Polo inspirado en el Symbol of Peace, All Might.",
        sizes: ["S", "M", "L", "XL"],
        badge: "Exclusivo",
        rating: 4.9,
        reviews: 198
    }
];

let displayedProducts = [];
let currentPage = 1;
const productsPerPage = 8;
let filteredProducts = [...products];

// Initialize products display
function initializeProducts() {
    displayedProducts = filteredProducts.slice(0, productsPerPage);
    renderProducts();
    updateLoadMoreButton();
}

// Render products in the grid
function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    
    if (displayedProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3>No se encontraron productos</h3>
                <p>Intenta con otros filtros o términos de búsqueda.</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = displayedProducts.map(product => `
        <div class="product-card" data-category="${product.category}" data-price="${product.price}" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <button class="favorite-btn" onclick="toggleFavorite(${product.id})" data-product-id="${product.id}">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-category">${getCategoryName(product.category)}</p>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span>(${product.reviews} reseñas)</span>
                </div>
                <div class="product-price">$${product.price}</div>
                <div class="product-sizes">
                    ${product.sizes.map(size => `
                        <button class="size-btn" onclick="selectSize(this, '${size}')">${size}</button>
                    `).join('')}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Agregar
                    </button>
                    <button class="quick-view-btn" onclick="openProductModal(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Update favorite buttons state
    updateFavoriteButtons();
    
    // Add animation to new products
    const productCards = productsGrid.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
        card.style.opacity = '0';
    });
}

// Generate star rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star" style="color: #ffd93d;"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt" style="color: #ffd93d;"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star" style="color: #ddd;"></i>';
    }
    
    return `<div class="stars">${starsHTML}</div>`;
}

// Get category display name
function getCategoryName(category) {
    const categoryNames = {
        naruto: 'Naruto',
        onepiece: 'One Piece',
        dragonball: 'Dragon Ball',
        attackontitan: 'Attack on Titan',
        demonslayer: 'Demon Slayer',
        myheroacademia: 'My Hero Academia'
    };
    return categoryNames[category] || category;
}

// Filter products
function filterProducts() {
    const categoryFilter = document.getElementById('category-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    const sizeFilter = document.getElementById('size-filter').value;
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    filteredProducts = products.filter(product => {
        // Category filter
        if (categoryFilter && product.category !== categoryFilter) {
            return false;
        }
        
        // Price filter
        if (priceFilter) {
            const [min, max] = priceFilter.split('-').map(p => p.replace('+', ''));
            const minPrice = parseFloat(min);
            const maxPrice = max ? parseFloat(max) : Infinity;
            
            if (product.price < minPrice || product.price > maxPrice) {
                return false;
            }
        }
        
        // Size filter
        if (sizeFilter && !product.sizes.includes(sizeFilter)) {
            return false;
        }
        
        // Search filter
        if (searchTerm && !product.name.toLowerCase().includes(searchTerm) && 
            !product.description.toLowerCase().includes(searchTerm)) {
            return false;
        }
        
        return true;
    });
    
    // Reset pagination
    currentPage = 1;
    displayedProducts = filteredProducts.slice(0, productsPerPage);
    renderProducts();
    updateLoadMoreButton();
    
    // Show filter results message
    showMessage(`Se encontraron ${filteredProducts.length} productos`, 'success');
}

// Search products
function searchProducts() {
    filterProducts();
}

// Clear filters
function clearFilters() {
    document.getElementById('category-filter').value = '';
    document.getElementById('price-filter').value = '';
    document.getElementById('size-filter').value = '';
    document.getElementById('search-input').value = '';
    
    filteredProducts = [...products];
    currentPage = 1;
    displayedProducts = filteredProducts.slice(0, productsPerPage);
    renderProducts();
    updateLoadMoreButton();
    
    showMessage('Filtros limpiados', 'success');
}

// Load more products
function loadMoreProducts() {
    const startIndex = currentPage * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const newProducts = filteredProducts.slice(startIndex, endIndex);
    
    if (newProducts.length > 0) {
        displayedProducts = [...displayedProducts, ...newProducts];
        currentPage++;
        
        // Add only new products to the grid
        const productsGrid = document.getElementById('products-grid');
        const newProductsHTML = newProducts.map(product => `
            <div class="product-card" data-category="${product.category}" data-price="${product.price}" data-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                    <button class="favorite-btn" onclick="toggleFavorite(${product.id})" data-product-id="${product.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-category">${getCategoryName(product.category)}</p>
                    <div class="product-rating">
                        ${generateStars(product.rating)}
                        <span>(${product.reviews} reseñas)</span>
                    </div>
                    <div class="product-price">$${product.price}</div>
                    <div class="product-sizes">
                        ${product.sizes.map(size => `
                            <button class="size-btn" onclick="selectSize(this, '${size}')">${size}</button>
                        `).join('')}
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i> Agregar
                        </button>
                        <button class="quick-view-btn" onclick="openProductModal(${product.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
        
        productsGrid.insertAdjacentHTML('beforeend', newProductsHTML);
        
        // Update favorite buttons for new products
        updateFavoriteButtons();
        
        // Animate new products
        const newCards = productsGrid.querySelectorAll('.product-card:nth-last-child(-n+' + newProducts.length + ')');
        newCards.forEach((card, index) => {
            card.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
            card.style.opacity = '0';
        });
        
        updateLoadMoreButton();
    }
}

// Update load more button visibility
function updateLoadMoreButton() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const hasMoreProducts = displayedProducts.length < filteredProducts.length;
    
    if (hasMoreProducts) {
        loadMoreBtn.style.display = 'inline-flex';
        loadMoreBtn.innerHTML = `Cargar más productos (${filteredProducts.length - displayedProducts.length} restantes) <i class="fas fa-chevron-down"></i>`;
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

// Select size
function selectSize(button, size) {
    // Remove selected class from siblings
    const siblings = button.parentNode.querySelectorAll('.size-btn');
    siblings.forEach(btn => btn.classList.remove('selected'));
    
    // Add selected class to clicked button
    button.classList.add('selected');
    
    // Store selected size in button's parent card
    const productCard = button.closest('.product-card');
    productCard.setAttribute('data-selected-size', size);
}

// Get product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Open product modal
function openProductModal(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="product-modal-content">
            <div class="product-modal-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-modal-info">
                <h2>${product.name}</h2>
                <p class="modal-category">${getCategoryName(product.category)}</p>
                <div class="modal-rating">
                    ${generateStars(product.rating)}
                    <span>(${product.reviews} reseñas)</span>
                </div>
                <div class="modal-price">$${product.price}</div>
                <p class="modal-description">${product.description}</p>
                
                <div class="modal-sizes">
                    <h4>Tallas disponibles:</h4>
                    <div class="sizes-container">
                        ${product.sizes.map(size => `
                            <button class="size-btn" onclick="selectSize(this, '${size}')">${size}</button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="add-to-cart-btn large" onclick="addToCartFromModal(${product.id})">
                        <i class="fas fa-cart-plus"></i> Agregar al Carrito
                    </button>
                    <button class="favorite-btn-large ${getFavoriteStatus(product.id)}" onclick="toggleFavorite(${product.id})">
                        <i class="fas fa-heart"></i> ${getFavoriteStatus(product.id) ? 'Quitar de' : 'Agregar a'} Favoritos
                    </button>
                </div>
                
                <div class="product-features">
                    <div class="feature-item">
                        <i class="fas fa-truck"></i>
                        <span>Envío gratis en compras mayores a $50</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-undo"></i>
                        <span>30 días para devoluciones</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-shield-alt"></i>
                        <span>Garantía de calidad</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('product-modal').classList.add('show');
    document.getElementById('overlay').classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    document.getElementById('product-modal').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Add to cart from modal
function addToCartFromModal(productId) {
    const modal = document.getElementById('product-modal');
    const selectedSizeBtn = modal.querySelector('.size-btn.selected');
    
    if (!selectedSizeBtn) {
        showMessage('Por favor selecciona una talla', 'error');
        return;
    }
    
    const size = selectedSizeBtn.textContent;
    addToCart(productId, size);
    closeModal();
}

// Show message
function showMessage(text, type = 'success') {
    // Remove existing message
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    
    // Add event listeners for real-time search
    const searchInput = document.getElementById('search-input');
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterProducts();
        }, 300);
    });
    
    // Close modal when clicking overlay
    document.getElementById('overlay').addEventListener('click', closeModal);
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});
