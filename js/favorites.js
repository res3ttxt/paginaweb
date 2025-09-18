// Favorites Management
let favorites = JSON.parse(localStorage.getItem('animeWearFavorites')) || [];

// Toggle favorite status
function toggleFavorite(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const existingIndex = favorites.findIndex(fav => fav.id === productId);
    
    if (existingIndex > -1) {
        // Remove from favorites
        favorites.splice(existingIndex, 1);
        showMessage(`${product.name} eliminado de favoritos`, 'success');
    } else {
        // Add to favorites
        const favoriteItem = {
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            addedAt: new Date().toISOString()
        };
        favorites.push(favoriteItem);
        showMessage(`${product.name} agregado a favoritos`, 'success');
        
        // Add heart animation
        const favoriteBtn = document.querySelector(`[data-product-id="${productId}"]`);
        if (favoriteBtn) {
            favoriteBtn.style.animation = 'none';
            favoriteBtn.offsetHeight; // Trigger reflow
            favoriteBtn.style.animation = 'pulse 0.6s ease';
        }
    }
    
    updateFavoritesUI();
    saveFavoritesToStorage();
}

// Check if product is in favorites
function isFavorite(productId) {
    return favorites.some(fav => fav.id === productId);
}

// Get favorite status for display
function getFavoriteStatus(productId) {
    return isFavorite(productId) ? 'active' : '';
}

// Update favorites UI
function updateFavoritesUI() {
    updateFavoritesCount();
    updateFavoritesItems();
    updateFavoriteButtons();
}

// Update favorites count badge
function updateFavoritesCount() {
    const favoritesCount = document.getElementById('favorites-count');
    const count = favorites.length;
    favoritesCount.textContent = count;
    favoritesCount.style.display = count > 0 ? 'flex' : 'none';
}

// Update favorite buttons state
function updateFavoriteButtons() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(btn => {
        const productId = parseInt(btn.getAttribute('data-product-id'));
        if (isFavorite(productId)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update modal favorite button if modal is open
    const modalFavoriteBtn = document.querySelector('.favorite-btn-large');
    if (modalFavoriteBtn) {
        const modalBody = document.getElementById('modal-body');
        const productTitle = modalBody.querySelector('h2');
        if (productTitle) {
            const product = products.find(p => p.name === productTitle.textContent);
            if (product) {
                if (isFavorite(product.id)) {
                    modalFavoriteBtn.classList.add('active');
                    modalFavoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Quitar de Favoritos';
                } else {
                    modalFavoriteBtn.classList.remove('active');
                    modalFavoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Agregar a Favoritos';
                }
            }
        }
    }
}

// Update favorites items display
function updateFavoritesItems() {
    const favoritesItemsContainer = document.getElementById('favorites-items');
    
    if (favorites.length === 0) {
        favoritesItemsContainer.innerHTML = `
            <div class="empty-favorites">
                <i class="fas fa-heart" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3>No tienes favoritos</h3>
                <p>Agrega productos a tus favoritos para verlos aquí.</p>
                <button class="cta-btn" onclick="toggleFavorites(); scrollToProducts();">
                    Explorar productos <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;
        return;
    }
    
    favoritesItemsContainer.innerHTML = favorites.map(item => `
        <div class="favorites-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-category">${getCategoryName(item.category)}</div>
                <div class="item-price">$${item.price.toFixed(2)}</div>
                <div class="item-actions">
                    <button class="add-to-cart-btn small" onclick="quickAddToCart(${item.id})">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                    <button class="view-product-btn" onclick="openProductModal(${item.id}); toggleFavorites();">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <button class="remove-favorite" onclick="toggleFavorite(${item.id})" title="Quitar de favoritos">
                <i class="fas fa-heart"></i>
            </button>
        </div>
    `).join('');
}

// Toggle favorites sidebar
function toggleFavorites() {
    const favoritesSidebar = document.getElementById('favorites-sidebar');
    const overlay = document.getElementById('overlay');
    
    if (favoritesSidebar.classList.contains('open')) {
        favoritesSidebar.classList.remove('open');
        overlay.classList.remove('show');
        document.body.style.overflow = 'auto';
    } else {
        favoritesSidebar.classList.add('open');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Close cart if open
        const cartSidebar = document.getElementById('cart-sidebar');
        cartSidebar.classList.remove('open');
    }
}

// Quick add to cart from favorites
function quickAddToCart(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    // Add with default size (M) or first available size
    const defaultSize = product.sizes.includes('M') ? 'M' : product.sizes[0];
    addToCart(productId, defaultSize);
}

// Save favorites to localStorage
function saveFavoritesToStorage() {
    localStorage.setItem('animeWearFavorites', JSON.stringify(favorites));
}

// Clear all favorites
function clearFavorites() {
    if (favorites.length === 0) return;
    
    if (confirm('¿Estás seguro de que quieres eliminar todos los favoritos?')) {
        favorites = [];
        updateFavoritesUI();
        saveFavoritesToStorage();
        showMessage('Favoritos eliminados', 'success');
    }
}

// Get favorites by category
function getFavoritesByCategory(category) {
    return favorites.filter(fav => fav.category === category);
}

// Get most favorited products (for analytics/recommendations)
function getMostFavoritedCategories() {
    const categoryCount = {};
    
    favorites.forEach(fav => {
        categoryCount[fav.category] = (categoryCount[fav.category] || 0) + 1;
    });
    
    return Object.entries(categoryCount)
        .sort(([,a], [,b]) => b - a)
        .map(([category, count]) => ({ category, count }));
}

// Add multiple products to favorites (for bulk operations)
function addBulkToFavorites(productIds) {
    let addedCount = 0;
    
    productIds.forEach(productId => {
        if (!isFavorite(productId)) {
            const product = getProductById(productId);
            if (product) {
                const favoriteItem = {
                    id: productId,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    category: product.category,
                    addedAt: new Date().toISOString()
                };
                favorites.push(favoriteItem);
                addedCount++;
            }
        }
    });
    
    if (addedCount > 0) {
        updateFavoritesUI();
        saveFavoritesToStorage();
        showMessage(`${addedCount} productos agregados a favoritos`, 'success');
    }
}

// Get recently added favorites
function getRecentFavorites(limit = 5) {
    return favorites
        .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
        .slice(0, limit);
}

// Export favorites (for sharing or backup)
function exportFavorites() {
    if (favorites.length === 0) {
        showMessage('No tienes favoritos para exportar', 'error');
        return;
    }
    
    const exportData = {
        favorites: favorites,
        exportDate: new Date().toISOString(),
        totalItems: favorites.length
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `animewear-favorites-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showMessage('Favoritos exportados exitosamente', 'success');
}

// Import favorites (from backup file)
function importFavorites(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const importData = JSON.parse(e.target.result);
            
            if (importData.favorites && Array.isArray(importData.favorites)) {
                // Merge with existing favorites (avoid duplicates)
                const existingIds = new Set(favorites.map(fav => fav.id));
                const newFavorites = importData.favorites.filter(fav => !existingIds.has(fav.id));
                
                favorites = [...favorites, ...newFavorites];
                updateFavoritesUI();
                saveFavoritesToStorage();
                
                showMessage(`${newFavorites.length} nuevos favoritos importados`, 'success');
            } else {
                showMessage('Archivo de favoritos inválido', 'error');
            }
        } catch (error) {
            showMessage('Error al importar favoritos', 'error');
        }
    };
    
    reader.readAsText(file);
}

// Get favorites statistics
function getFavoritesStats() {
    const categoryStats = getMostFavoritedCategories();
    const totalFavorites = favorites.length;
    const recentFavorites = getRecentFavorites(3);
    
    return {
        totalFavorites,
        categoryStats,
        recentFavorites,
        averagePrice: totalFavorites > 0 ? 
            (favorites.reduce((sum, fav) => sum + fav.price, 0) / totalFavorites).toFixed(2) : 0
    };
}

// Initialize favorites
function initializeFavorites() {
    updateFavoritesUI();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            toggleFavorites();
        }
    });
    
    // Add escape key listener for favorites
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const favoritesSidebar = document.getElementById('favorites-sidebar');
            if (favoritesSidebar.classList.contains('open')) {
                toggleFavorites();
            }
        }
    });
}

// Add to favorites with animation from any button
function addToFavoriteWithAnimation(productId, buttonElement) {
    if (!isFavorite(productId)) {
        toggleFavorite(productId);
        
        // Create floating heart animation
        const heart = document.createElement('div');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.cssText = `
            position: fixed;
            color: #ff6b6b;
            font-size: 2rem;
            pointer-events: none;
            z-index: 9999;
            animation: floatHeart 2s ease-out forwards;
        `;
        
        const rect = buttonElement.getBoundingClientRect();
        heart.style.left = rect.left + rect.width / 2 + 'px';
        heart.style.top = rect.top + rect.height / 2 + 'px';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 2000);
    }
}

// Add CSS for floating heart animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatHeart {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize favorites when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeFavorites();
    
    // Add favorites icon animation on page load if favorites exist
    if (favorites.length > 0) {
        const favoritesBtn = document.querySelector('.favorites-btn');
        favoritesBtn.style.animation = 'pulse 1s ease';
    }
});
