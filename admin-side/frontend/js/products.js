// Product Management System
class ProductManager {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.currentFilter = 'all';
        this.currentView = 'grid';
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.editingProductId = null;
        this.deleteProductId = null;
        
        this.init();
    }

    init() {
        this.loadProducts();
        this.setupEventListeners();
        this.renderProducts();
    }

    // Load products from localStorage or initialize with sample data
    loadProducts() {
        const savedProducts = localStorage.getItem('morozArtProducts');
        if (savedProducts) {
            this.products = JSON.parse(savedProducts);
        } else {
            // Initialize with sample products based on the client requirements
            this.products = [
                {
                    id: 1,
                    name: "Serene Lake Watercolor",
                    category: "postcards",
                    price: 20,
                    size: "5x7",
                    description: "A tranquil watercolor depicting a peaceful lake with perfect reflections of surrounding mountains and trees. Painted on high-quality watercolor paper.",
                    image: "../../../images/Serene Lake Watercolor Painting.jpeg",
                    stock: 5,
                    status: "active",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 2,
                    name: "Mt Hood at Sunset",
                    category: "postcards",
                    price: 20,
                    size: "5x7",
                    description: "Majestic mountain landscape captured in soft watercolor tones. Features snow-capped peaks and rolling hills in the distance.",
                    image: "../../../images/Mt Hood at Sunset.jpeg",
                    stock: 3,
                    status: "active",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 3,
                    name: "Horseshoe Bend Watercolor Painting",
                    category: "wall-art",
                    price: 100,
                    size: "24x30",
                    description: "Large format watercolor of the iconic Horseshoe Bend, professionally framed. Original artwork capturing the dramatic curves of the Colorado River.",
                    image: "../../../images/Horseshoe Bend Watercolor Painting - 24x30 Framed Original Art.jpeg",
                    stock: 1,
                    status: "active",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 4,
                    name: "Red Tulips Bookmark",
                    category: "bookmarks",
                    price: 15,
                    size: "8x2.5",
                    description: "Vibrant red tulips with braided tassel, hand-painted watercolor bookmark.",
                    image: "../../../images/Handmade Watercolor Red Tulips Bookmark with Braided Tassel.jpeg",
                    stock: 10,
                    status: "active",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 5,
                    name: "Custom House Portrait",
                    category: "custom",
                    price: 100,
                    size: "11x14",
                    description: "Original acrylic painting on canvas of your home or special building. Personalized architectural portrait with attention to detail.",
                    image: "../../../images/Custom House Portrait - Original Acrylic Painting on Canvas.jpeg",
                    stock: 0,
                    status: "active",
                    dateAdded: new Date().toISOString()
                }
            ];
            this.saveProducts();
        }
        this.filteredProducts = [...this.products];
    }

    // Save products to localStorage
    saveProducts() {
        localStorage.setItem('morozArtProducts', JSON.stringify(this.products));
    }

    // Setup event listeners
    setupEventListeners() {
        // Product form submission
        document.getElementById('productForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProduct();
        });

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
    }

    // Render products based on current filter and view
    renderProducts() {
        const container = document.getElementById('productsGrid');
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

        // Update container class based on view
        container.className = this.currentView === 'grid' ? 'products-grid' : 'products-list';

        if (productsToShow.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-box-open"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your filters or add a new product.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = productsToShow.map(product => this.createProductCard(product)).join('');
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
                            <div class="product-category">${categoryNames[product.category]}</div>
                        </div>
                    </div>
                    <div class="product-price">$${product.price}</div>
                    <div class="product-description">${product.description}</div>
                    <div class="product-meta">
                        <span>Stock: ${product.stock}</span>
                        <span>Size: ${product.size || 'N/A'}</span>
                    </div>
                    <div class="product-meta">
                        <span class="product-status status-${product.status}">${product.status}</span>
                        <span>ID: ${product.id}</span>
                    </div>
                    <div class="product-actions">
                        <button class="action-btn edit-btn" onclick="productManager.editProduct(${product.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="action-btn delete-btn" onclick="productManager.deleteProduct(${product.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Filter products
    filterProducts(category) {
        this.currentFilter = category;
        this.currentPage = 1;
        
        if (category === 'all') {
            this.filteredProducts = [...this.products];
        } else {
            this.filteredProducts = this.products.filter(product => product.category === category);
        }
        
        this.renderProducts();
        this.updateFilterButtons();
    }

    // Search products
    searchProducts() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        this.currentPage = 1;
        
        let filtered = this.currentFilter === 'all' ? [...this.products] : 
                      this.products.filter(product => product.category === this.currentFilter);
        
        if (searchTerm) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
        }
        
        this.filteredProducts = filtered;
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
        const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const paginationInfo = document.getElementById('paginationInfo');
        
        prevBtn.disabled = this.currentPage === 1;
        nextBtn.disabled = this.currentPage === totalPages || totalPages === 0;
        paginationInfo.textContent = `Page ${this.currentPage} of ${totalPages || 1}`;
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.renderProducts();
        }
    }

    nextPage() {
        const totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.renderProducts();
        }
    }

    // Product CRUD operations
    openAddProductModal() {
        this.editingProductId = null;
        document.getElementById('modalTitle').textContent = 'Add New Product';
        document.getElementById('productForm').reset();
        document.getElementById('imagePreview').innerHTML = '<i class="fas fa-image"></i><span>Click to upload image</span>';
        document.getElementById('imagePreview').classList.remove('has-image');
        document.getElementById('productModal').classList.add('show');
    }

    editProduct(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) return;
        
        this.editingProductId = id;
        document.getElementById('modalTitle').textContent = 'Edit Product';
        
        // Populate form
        document.getElementById('productId').value = product.id;
        document.getElementById('productName').value = product.name;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productSize').value = product.size || '';
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productStatus').value = product.status;
        
        // Handle image preview
        const imagePreview = document.getElementById('imagePreview');
        if (product.image) {
            imagePreview.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
            imagePreview.classList.add('has-image');
        } else {
            imagePreview.innerHTML = '<i class="fas fa-image"></i><span>Click to upload image</span>';
            imagePreview.classList.remove('has-image');
        }
        
        document.getElementById('productModal').classList.add('show');
    }

    saveProduct() {
        const formData = {
            name: document.getElementById('productName').value.trim(),
            category: document.getElementById('productCategory').value,
            price: parseFloat(document.getElementById('productPrice').value),
            size: document.getElementById('productSize').value.trim(),
            description: document.getElementById('productDescription').value.trim(),
            stock: parseInt(document.getElementById('productStock').value) || 0,
            status: document.getElementById('productStatus').value
        };

        // Validation
        if (!formData.name || !formData.category || !formData.price || !formData.description) {
            alert('Please fill in all required fields.');
            return;
        }

        if (this.editingProductId) {
            // Update existing product
            const productIndex = this.products.findIndex(p => p.id === this.editingProductId);
            if (productIndex !== -1) {
                this.products[productIndex] = {
                    ...this.products[productIndex],
                    ...formData,
                    dateModified: new Date().toISOString()
                };
            }
        } else {
            // Add new product
            const newProduct = {
                id: Date.now(), // Simple ID generation
                ...formData,
                image: '', // Handle image upload separately
                dateAdded: new Date().toISOString()
            };
            this.products.push(newProduct);
        }

        this.saveProducts();
        this.filterProducts(this.currentFilter); // Refresh display
        this.closeProductModal();
        
        // Show success message
        this.showNotification(this.editingProductId ? 'Product updated successfully!' : 'Product added successfully!', 'success');
    }

    deleteProduct(id) {
        this.deleteProductId = id;
        document.getElementById('deleteModal').classList.add('show');
    }

    confirmDelete() {
        if (this.deleteProductId) {
            this.products = this.products.filter(p => p.id !== this.deleteProductId);
            this.saveProducts();
            this.filterProducts(this.currentFilter);
            this.closeDeleteModal();
            this.showNotification('Product deleted successfully!', 'success');
            this.deleteProductId = null;
        }
    }

    // Modal management
    closeProductModal() {
        document.getElementById('productModal').classList.remove('show');
        this.editingProductId = null;
    }

    closeDeleteModal() {
        document.getElementById('deleteModal').classList.remove('show');
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
        
        if (file) {
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
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
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
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Export products data
    exportProducts() {
        const dataStr = JSON.stringify(this.products, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'moroz-art-products.json';
        link.click();
        URL.revokeObjectURL(url);
    }

    // Import products data
    importProducts(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedProducts = JSON.parse(e.target.result);
                    this.products = importedProducts;
                    this.saveProducts();
                    this.filterProducts('all');
                    this.showNotification('Products imported successfully!', 'success');
                } catch (error) {
                    this.showNotification('Error importing products. Please check the file format.', 'error');
                }
            };
            reader.readAsText(file);
        }
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