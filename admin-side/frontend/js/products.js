// js/products.js - Updated for Firebase Backend
class ProductManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentFilter = 'all';
        this.currentView = 'grid';
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.totalPages = 1;
        this.totalCount = 0;
        this.editingProductId = null;
        this.deleteProductId = null;
        this.apiBaseUrl = 'http://localhost:4000/api'; 
        
        this.init();
    }

    async init() {
        await this.loadProducts();
        this.setupEventListeners();
        this.renderProducts();
    }

    // Load products from Firebase via API
    async loadProducts() {
        try {
            this.showLoading(true);
            const params = new URLSearchParams({
                category: this.currentFilter,
                page: this.currentPage,
                limit: this.itemsPerPage
            });

            const searchTerm = document.getElementById('searchInput')?.value;
            if (searchTerm) {
                params.append('search', searchTerm);
            }

            const response = await fetch(`${this.apiBaseUrl}/products?${params}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.products = data.products;
            this.filteredProducts = data.products;
            this.totalCount = data.totalCount;
            this.totalPages = data.totalPages;
            this.currentPage = data.currentPage;

        } catch (error) {
            console.error('Error loading products:', error);
            this.showNotification('Failed to load products. Please try again.', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Product form submission
        const form = document.getElementById('productForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveProduct();
            });
        }

        // Modal close events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModals();
            }
        });

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModals();
            }
        });

        // Search input debounce
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            let debounceTimer;
            searchInput.addEventListener('input', () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    this.searchProducts();
                }, 300);
            });
        }
    }

    // Show/hide loading state
    // Fix the showLoading method
    showLoading(isLoading) {
        const container = document.getElementById('products-container'); // Changed from 'productsGrid'
        if (container && isLoading) {
            container.innerHTML = `
                <div class="loading-state">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Loading products...</p>
                </div>
            `;
        }
    }
    
    // Fix the renderProducts method
    renderProducts() {
        const container = document.getElementById('products-container'); // Changed from 'productsGrid'
        if (!container) {
            console.error('Products container not found');
            return;
        }
        
        container.className = this.currentView === 'grid' ? 'products-grid' : 'products-list';
    
        if (this.filteredProducts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-box-open"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.filteredProducts.map(product => this.createProductCard(product)).join('');
        this.updatePagination();
    }

    // Create product card HTML
    createProductCard(product) {
        const categoryNames = {
            'postcards': 'Postcards',
            'wall-art': 'Wall Art',
            'bookmarks': 'Bookmarks',
            'custom': 'Custom Pieces'
        };

        const formattedDate = product.dateAdded ? 
            new Date(product.dateAdded).toLocaleDateString() : 'N/A';

        return `
            <div class="product-card" data-category="${product.category}">
                <div class="product-image">
                    ${product.image ? 
                        `<img src="${product.image}" alt="${product.name}" onerror="this.parentElement.innerHTML='<i class=\"fas fa-image\"></i>'">` : 
                        '<i class="fas fa-image"></i>'
                    }
                </div>
                <div class="product-info">
                    <div class="product-header">
                        <div>
                            <h3 class="product-title">${product.name}</h3>
                            <div class="product-category">${categoryNames[product.category] || product.category}</div>
                        </div>
                    </div>
                    <div class="product-price">$${parseFloat(product.price).toFixed(2)}</div>
                    <div class="product-description">${product.description}</div>
                    <div class="product-meta">
                        <span>Stock: ${product.stock}</span>
                        <span>Size: ${product.size || 'N/A'}</span>
                    </div>
                    <div class="product-meta">
                        <span class="product-status status-${product.status}">${product.status}</span>
                        <span>Added: ${formattedDate}</span>
                    </div>
                    <div class="product-actions">
                        <button class="action-btn edit-btn" onclick="productManager.editProduct('${product.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="action-btn delete-btn" onclick="productManager.deleteProduct('${product.id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Filter products
    async filterProducts(category) {
        this.currentFilter = category;
        this.currentPage = 1;
        await this.loadProducts();
        this.renderProducts();
        this.updateFilterButtons();
    }

    // Search products
    async searchProducts() {
        this.currentPage = 1;
        await this.loadProducts();
        this.renderProducts();
    }

    // Toggle view (grid/list)
    toggleView(view) {
        this.currentView = view;
        this.renderProducts();
        this.updateViewButtons();
    }

    // Update filter buttons
    updateFilterButtons() {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === this.currentFilter);
        });
    }

    // Update view buttons
    updateViewButtons() {
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === this.currentView);
        });
    }

    // Pagination
    updatePagination() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const paginationInfo = document.getElementById('paginationInfo');
        
        if (prevBtn) prevBtn.disabled = this.currentPage === 1;
        if (nextBtn) nextBtn.disabled = this.currentPage === this.totalPages || this.totalPages === 0;
        if (paginationInfo) paginationInfo.textContent = `Page ${this.currentPage} of ${this.totalPages || 1}`;
    }

    async previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            await this.loadProducts();
            this.renderProducts();
        }
    }

    async nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            await this.loadProducts();
            this.renderProducts();
        }
    }

    // Product CRUD operations
    openAddProductModal() {
        this.editingProductId = null;
        const modalTitle = document.getElementById('modalTitle');
        const form = document.getElementById('productForm');
        const imagePreview = document.getElementById('imagePreview');
        
        if (modalTitle) modalTitle.textContent = 'Add New Product';
        if (form) form.reset();
        if (imagePreview) {
            imagePreview.innerHTML = '<i class="fas fa-image"></i><span>Click to upload image</span>';
            imagePreview.classList.remove('has-image');
        }
        
        const modal = document.getElementById('productModal');
        if (modal) modal.classList.add('show');
    }

    // Update the editProduct method around line 280
    async editProduct(id) {
        try {
            const response = await fetch(`${this.apiBaseUrl}/products/${id}`);
            if (!response.ok) {
                throw new Error('Product not found');
            }
            
            const product = await response.json();
            this.editingProductId = id;
            
            const modalTitle = document.getElementById('modalTitle');
            if (modalTitle) modalTitle.textContent = 'Edit Product';
            
            // Populate form with existing fields only
            const fields = {
                'productName': product.name,
                'productCategory': product.category,
                'productPrice': product.price,
                'productDimensions': product.size || product.dimensions || '', // Use dimensions field
                'productDescription': product.description,
                'productStock': product.stock,
                'productMaterial': product.material || '',
                'productFeatured': product.featured || false
            };
    
            Object.entries(fields).forEach(([fieldId, value]) => {
                const field = document.getElementById(fieldId);
                if (field) {
                    if (field.type === 'checkbox') {
                        field.checked = value;
                    } else {
                        field.value = value;
                    }
                }
            });
    
            // Handle image preview
            const imagePreview = document.getElementById('imagePreview');
            if (imagePreview) {
                if (product.image) {
                    imagePreview.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
                    imagePreview.classList.add('has-image');
                } else {
                    imagePreview.innerHTML = '<i class="fas fa-image"></i><span>Click to upload image</span>';
                    imagePreview.classList.remove('has-image');
                }
            }
            
            const modal = document.getElementById('productModal');
            if (modal) modal.classList.add('show');
    
        } catch (error) {
            console.error('Error loading product for edit:', error);
            this.showNotification('Failed to load product details.', 'error');
        }
    }

    async saveProduct() {
        try {
            const formData = new FormData();
            const form = document.getElementById('productForm');
            
            // Get form values
            const fields = {
                name: document.getElementById('productName')?.value?.trim(),
                category: document.getElementById('productCategory')?.value,
                price: document.getElementById('productPrice')?.value,
                size: document.getElementById('productSize')?.value?.trim(),
                description: document.getElementById('productDescription')?.value?.trim(),
                stock: document.getElementById('productStock')?.value,
                status: document.getElementById('productStatus')?.value
            };

            // Validation
            if (!fields.name || !fields.category || !fields.price || !fields.description) {
                this.showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Add fields to FormData
            Object.entries(fields).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value);
                }
            });

            // Add image if selected
            const imageInput = document.getElementById('productImage');
            if (imageInput?.files?.[0]) {
                formData.append('image', imageInput.files[0]);
            }

            const url = this.editingProductId ? 
                `${this.apiBaseUrl}/products/${this.editingProductId}` : 
                `${this.apiBaseUrl}/products`;
            
            const method = this.editingProductId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save product');
            }

            const result = await response.json();
            
            this.closeProductModal();
            await this.loadProducts();
            this.renderProducts();
            
            this.showNotification(
                this.editingProductId ? 'Product updated successfully!' : 'Product added successfully!', 
                'success'
            );

        } catch (error) {
            console.error('Error saving product:', error);
            this.showNotification(error.message || 'Failed to save product.', 'error');
        }
    }

    deleteProduct(id) {
        this.deleteProductId = id;
        const modal = document.getElementById('deleteModal');
        if (modal) modal.classList.add('show');
    }

    async confirmDelete() {
        if (!this.deleteProductId) return;

        try {
            const response = await fetch(`${this.apiBaseUrl}/products/${this.deleteProductId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete product');
            }

            this.closeDeleteModal();
            await this.loadProducts();
            this.renderProducts();
            this.showNotification('Product deleted successfully!', 'success');
            this.deleteProductId = null;

        } catch (error) {
            console.error('Error deleting product:', error);
            this.showNotification(error.message || 'Failed to delete product.', 'error');
        }
    }

    // Modal management
    closeProductModal() {
        const modal = document.getElementById('productModal');
        if (modal) modal.classList.remove('show');
        this.editingProductId = null;
    }

    closeDeleteModal() {
        const modal = document.getElementById('deleteModal');
        if (modal) modal.classList.remove('show');
        this.deleteProductId = null;
    }

    closeModals() {
        this.closeProductModal();
        this.closeDeleteModal();
    }

    // Image preview
    previewImage(event) {
        const file = event.target.files[0];
        const preview = document.getElementById('imagePreview');
        
        if (file && preview) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                preview.classList.add('has-image');
            };
            reader.readAsDataURL(file);
        }
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
            color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            z-index: 3000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Global functions for HTML onclick events
function filterProducts(category) {
    productManager.filterProducts(category);
}

function searchProducts() {
    productManager.searchProducts();
}

function toggleView(view) {
    productManager.toggleView(view);
}

function openAddProductModal() {
    productManager.openAddProductModal();
}

function closeProductModal() {
    productManager.closeProductModal();
}

function closeDeleteModal() {
    productManager.closeDeleteModal();
}

function confirmDelete() {
    productManager.confirmDelete();
}

// Add this function after the other global functions around line 530
function saveProduct() {
    productManager.saveProduct();
}

function previewImage(event) {
    productManager.previewImage(event);
}

function previousPage() {
    productManager.previousPage();
}

function nextPage() {
    productManager.nextPage();
}

// Initialize the product manager when the page loads
let productManager;
document.addEventListener('DOMContentLoaded', function() {
    productManager = new ProductManager();
});