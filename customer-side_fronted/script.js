// Product data
const products = [
    // Postcards
    { id: 1, name: "Serene Lake Watercolor", category: "postcards", price: 20, image: "images/Serene Lake Watercolor Painting.jpeg", description: "A tranquil watercolor depicting a peaceful lake with perfect reflections of surrounding mountains and trees. Painted on high-quality watercolor paper." },
    { id: 2, name: "Mt Hood at Sunset", category: "postcards", price: 20, image: "images/Mt Hood at Sunset.jpeg", description: "Majestic mountain landscape captured in soft watercolor tones. Features snow-capped peaks and rolling hills in the distance." },
    { id: 3, name: "Misty Forest", category: "postcards", price: 20, image: "images/Misty forest.jpeg", description: "A winding path through a lush forest, painted with vibrant greens and dappled sunlight filtering through the canopy." },
    { id: 4, name: "Forest Lake", category: "postcards", price: 20, image: "images/Forest lake.jpeg", description: "Dynamic watercolor of a serene forest lake with reflections and natural beauty." },
    { id: 5, name: "Abstract Sunset Mountains", category: "postcards", price: 20, image: "images/Abstract Sunset Mountains.jpeg", description: "A breathtaking sunset with warm oranges, pinks, and purples bleeding across the sky and reflecting on calm waters." },
    { id: 6, name: "Desert Saguaro", category: "postcards", price: 20, image: "images/Desert Saguaro.jpeg", description: "Vast desert scene with majestic saguaro cacti, painted in warm earth tones and soft shadows." },
    { id: 7, name: "Sedona Red Rocks", category: "postcards", price: 20, image: "images/Sedona Red Rocks.jpeg", description: "Iconic red rock formations of Sedona, painted with vibrant reds and oranges against a clear blue sky." },
    { id: 8, name: "Sedona Landscape", category: "postcards", price: 20, image: "images/Sedona.jpeg", description: "Beautiful Sedona landscape with distinctive rock formations and desert vegetation." },
    { id: 9, name: "Horseshoe Bend", category: "postcards", price: 20, image: "images/Horseshoe Bend.jpeg", description: "Dramatic view of the famous Horseshoe Bend with the Colorado River winding through red canyon walls." },
    { id: 10, name: "Power Lines Sky", category: "postcards", price: 20, image: "images/Power Lines Sky.jpeg", description: "Artistic interpretation of power lines against a dramatic sky, capturing modern landscape elements." },
    
    // Wall Art
    { id: 11, name: "Horseshoe Bend Watercolor Painting", category: "wall-art", price: 100, image: "images/Horseshoe Bend Watercolor Painting - 24x30 Framed Original Art.jpeg", description: "Large format watercolor of the iconic Horseshoe Bend, professionally framed. Original artwork capturing the dramatic curves of the Colorado River. Size: 24x30 inches." },
    { id: 12, name: "Peaceful Lake with Driftwood", category: "wall-art", price: 60, image: "images/Peaceful Lake with Driftwood Watercolor Painting - Framed Original Art.jpeg", description: "Serene lake scene with driftwood, professionally framed original watercolor. Perfect for creating a calming atmosphere. Size: 16x20 inches." },
    { id: 13, name: "Water Drops", category: "wall-art", price: 40, image: "images/Water drops.jpeg", description: "Delicate study of water droplets, capturing light and reflection in watercolor. Size: 11x14 inches." },
    { id: 14, name: "Raindrops on Window", category: "wall-art", price: 45, image: "images/Raindrops on window .jpg", description: "Atmospheric watercolor of raindrops on glass, creating a moody and contemplative piece. Size: 12x16 inches." },
    
    // Bookmarks
    { id: 15, name: "Red Tulips Bookmark", category: "bookmarks", price: 15, image: "images/Handmade Watercolor Red Tulips Bookmark with Braided Tassel.jpeg", description: "Vibrant red tulips with braided tassel, hand-painted watercolor bookmark. Size: 8x2.5 inches." },
    { id: 16, name: "Desert Arch Bookmark", category: "bookmarks", price: 15, image: "images/Handmade Watercolor Desert Arch Bookmark with Black Tassel.jpeg", description: "Stunning desert arch landscape with black tassel, capturing the beauty of natural rock formations. Size: 8x2.5 inches." },
    { id: 17, name: "Canyon River Bookmark", category: "bookmarks", price: 15, image: "images/Handmade Watercolor Canyon River Bookmark.jpeg", description: "Winding canyon river scene, hand-painted with detailed rock formations and flowing water. Size: 8x2.5 inches." },
    { id: 18, name: "Bryce Canyon Bookmark", category: "bookmarks", price: 15, image: "images/Bryce Canyon Watercolor Bookmark - Handpainted Utah National Park Art.jpeg", description: "Hand-painted Utah National Park art featuring the iconic hoodoos and spires of Bryce Canyon. Size: 8x2.5 inches." },
    { id: 19, name: "California Poppy Bookmark", category: "bookmarks", price: 15, image: "images/California Poppy Watercolor Bookmark - Hand-Painted Wildflower Art.jpeg", description: "Bright orange California poppies, hand-painted wildflower art perfect for nature lovers. Size: 8x2.5 inches." },
    { id: 20, name: "Beach Scene Bookmark", category: "bookmarks", price: 15, image: "images/Beach Scene Watercolor Bookmark - Coastal Paradise Art.jpeg", description: "Coastal paradise art featuring serene beach scenes with gentle waves and peaceful atmosphere. Size: 8x2.5 inches." },
    { id: 21, name: "Wildflower Meadow Bookmark", category: "bookmarks", price: 15, image: "images/Wildflower Meadow Watercolor Bookmark - Golden Field Art.jpeg", description: "Golden field art with mixed wildflowers swaying in the breeze, painted with vibrant colors. Size: 8x2.5 inches." },
    { id: 22, name: "Desert Landscape Bookmark", category: "bookmarks", price: 15, image: "images/Handmade Watercolor Desert Landscape Bookmark with Braided Tassel.jpeg", description: "Desert landscape with braided tassel, featuring cacti and warm earth tones. Size: 8x2.5 inches." },
    { id: 23, name: "Sunflower Bookmark", category: "bookmarks", price: 15, image: "images/Handmade Watercolor Sunflower Bookmark with Braided Tassel.jpeg", description: "Cheerful sunflower design with braided tassel, bringing sunshine to your reading. Size: 8x2.5 inches." },
    { id: 24, name: "Daffodil Bookmark", category: "bookmarks", price: 15, image: "images/Handmade Watercolor Daffodil Bookmark with Braided Tassel.jpeg", description: "Spring daffodils with braided tassel, painted in soft yellows and greens. Size: 8x2.5 inches." },
    { id: 25, name: "Bluebell Bookmark", category: "bookmarks", price: 15, image: "images/Handmade Watercolor Bluebell Bookmark with Braided Tassel.jpeg", description: "Delicate bluebells with braided tassel, capturing the essence of woodland flowers. Size: 8x2.5 inches." },
    { id: 26, name: "Golden Canyon Night Sky Bookmark", category: "bookmarks", price: 15, image: "images/Handmade Watercolor Bookmark - Golden Canyon Night Sky.jpeg", description: "Mystical night sky over golden canyon, painted with deep blues and warm earth tones. Size: 8x2.5 inches." },
    { id: 27, name: "Yellow Desert Wildflowers Bookmark", category: "bookmarks", price: 15, image: "images/Hand-Painted Watercolor Bookmark - Yellow Desert Wildflowers.jpeg", description: "Delicate yellow desert wildflowers, hand-painted with attention to botanical detail. Size: 8x2.5 inches." },
    { id: 28, name: "Purple Flower Bookmark", category: "bookmarks", price: 15, image: "images/Hand-Painted Purple Flower Watercolor Bookmark.jpeg", description: "Beautiful purple flowers in various shades, hand-painted with artistic flair. Size: 8x2.5 inches." },
    { id: 29, name: "Cactus Bookmark", category: "bookmarks", price: 15, image: "images/Hand-Painted Cactus Watercolor Bookmark - Desert Art.jpeg", description: "Desert art featuring various cacti species, painted with authentic southwestern style. Size: 8x2.5 inches." },
    { id: 30, name: "Pink Floral Bookmark", category: "bookmarks", price: 15, image: "images/Pink Floral Watercolor Bookmark - Hand-Painted Botanical Art.jpeg", description: "Hand-painted botanical art with soft pink florals, perfect for spring reading. Size: 8x2.5 inches." },
    { id: 31, name: "Botanical Study Bookmark", category: "bookmarks", price: 15, image: "images/Minimalist Botanical Watercolor Bookmark - Simple Leaf Art.jpeg", description: "Minimalist botanical study with simple leaf art, elegant and understated design. Size: 8x2.5 inches." },
    { id: 32, name: "Saguaro National Park Bookmark", category: "bookmarks", price: 15, image: "images/Saguaro National Park Watercolor Bookmark - Arizona Desert Cactus Art.jpeg", description: "Arizona desert cactus art featuring the iconic saguaro cacti of the national park. Size: 8x2.5 inches." },
    { id: 33, name: "Smoky Mountain Forest Bookmark", category: "bookmarks", price: 15, image: "images/Smoky Mountain Forest Watercolor Bookmark - Misty Night Rain Scene.jpeg", description: "Misty night rain scene in the Smoky Mountains, capturing the atmospheric beauty of the forest. Size: 8x2.5 inches." },
    
    // Custom Pieces
    { id: 34, name: "Custom House Portrait", category: "custom", price: 100, image: "images/Custom House Portrait - Original Acrylic Painting on Canvas.jpeg", description: "Original acrylic painting on canvas of your home or special building. Personalized architectural portrait with attention to detail. Size: 11x14 inches." },
    { id: 35, name: "Custom Football Stadium Painting", category: "custom", price: 100, image: "images/Custom Hand-Painted Football Stadium .JPEG", description: "Hand-painted football stadium of your favorite team. Perfect gift for sports enthusiasts. Size: 11x14 inches." },
    { id: 36, name: "Custom Banana Print Top", category: "custom", price: 80, image: "images/Custom Hand-Painted Banana Print Top - Andy Warhol Inspired.jpeg", description: "Andy Warhol inspired hand-painted banana print top. Wearable art that makes a statement. Custom sizing available." },
    { id: 37, name: "Honey Dipper Art", category: "custom", price: 50, image: "images/Honey Dipper.jpeg", description: "Artistic rendering of a honey dipper with golden honey. Perfect for kitchen decor or gift for food enthusiasts. Size: 8x10 inches." }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';

// DOM elements
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCartBtn = document.querySelector('.close-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const cartTotal = document.querySelector('.cart-total');
const productsGrid = document.querySelector('.products-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-body');
const closeModal = document.querySelector('.close');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Tab functionality for artist info section
function showTab(tabId) {
    // Hide all tab panes
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab pane
    const selectedPane = document.getElementById(tabId);
    if (selectedPane) {
        selectedPane.classList.add('active');
    }
    
    // Add active class to clicked button
    const clickedBtn = event.target;
    clickedBtn.classList.add('active');
}

// Read more functionality
function toggleReadMore() {
    const bioText = document.querySelector('.artist-bio p');
    const readMoreBtn = document.querySelector('.read-more-btn');
    
    if (bioText && readMoreBtn) {
        if (readMoreBtn.textContent === 'READ MORE') {
            bioText.style.maxHeight = 'none';
            readMoreBtn.textContent = 'READ LESS';
        } else {
            bioText.style.maxHeight = '4.5em';
            readMoreBtn.textContent = 'READ MORE';
        }
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the homepage or products page
    const featuredGrid = document.getElementById('featured-products-grid');
    const productsGrid = document.querySelector('.products-grid');
    
    if (featuredGrid) {
        // Homepage - display featured products
        displayFeaturedProducts();
    } else if (productsGrid) {
        // Products page - display all products
        displayProducts(products);
    }
    
    // Check if we're on product detail page
    const productDetailContainer = document.querySelector('.product-detail-container');
    if (productDetailContainer) {
        loadProductDetail();
        loadRelatedProducts();
        
        // Initialize read more functionality
        const bioText = document.querySelector('.artist-bio p');
        if (bioText) {
            bioText.style.maxHeight = '4.5em';
            bioText.style.overflow = 'hidden';
        }
    }
    
    updateCartUI();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Cart toggle
    cartIcon.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            setActiveFilter(filter);
            filterProducts(filter);
        });
    });
    
    // Modal close
    closeModal.addEventListener('click', closeProductModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProductModal();
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

// Display products
function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Display featured products (6 items) for homepage
function displayFeaturedProducts() {
    const grid = document.getElementById('featured-products-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Select 6 featured products (mix from different categories)
    const featuredProducts = [
        products.find(p => p.id === 1), // Serene Lake postcard
        products.find(p => p.id === 11), // Horseshoe Bend wall art
        products.find(p => p.id === 15), // Red Tulips bookmark
        products.find(p => p.id === 34), // Custom House Portrait
        products.find(p => p.id === 9), // Horseshoe Bend postcard
        products.find(p => p.id === 29) // Cactus bookmark
    ].filter(Boolean); // Remove any undefined products
    
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        grid.appendChild(productCard);
    });
}

// Display all products for products page
function displayAllProducts() {
    displayProducts(products);
}

// Setup product filters for products page
function setupProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            filterProducts(filter);
        });
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    
    card.innerHTML = `
        <img class="product-image" src="${product.image}" alt="${product.name}" onclick="goToProductDetail(${product.id})" onerror="this.src='images/placeholder.jpg'">
        <div class="product-info">
            <div class="product-content">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-title" onclick="goToProductDetail(${product.id})">${product.name}</h3>
                <div class="product-price">$${product.price}</div>
                <p class="product-description">${product.description}</p>
            </div>
            <div class="product-buttons">
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
                <button class="view-details-btn" onclick="goToProductDetail(${product.id})">View Details</button>
            </div>
        </div>
    `;
    
    return card;
}

// Navigate to product detail page
function goToProductDetail(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// Get URL parameter
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Load product detail page
function loadProductDetail() {
    const productId = parseInt(getUrlParameter('id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        window.location.href = 'products.html';
        return;
    }
    
    // Update page title
    document.title = `${product.name} - Ksenia Moroz Watercolor Art`;
    
    // Update breadcrumb
    const breadcrumbProduct = document.getElementById('breadcrumb-product');
    if (breadcrumbProduct) {
        breadcrumbProduct.textContent = product.name;
    }
    
    // Update product details
    const detailImage = document.getElementById('detail-image');
    const detailTitle = document.getElementById('detail-title');
    const detailCategory = document.getElementById('detail-category');
    const detailPrice = document.getElementById('detail-price');
    const detailDescription = document.getElementById('detail-description');
    
    if (detailImage) {
        detailImage.src = product.image;
        detailImage.alt = product.name;
    }
    if (detailTitle) detailTitle.textContent = product.name;
    if (detailCategory) detailCategory.textContent = getCategoryDisplayName(product.category);
    if (detailPrice) detailPrice.textContent = product.price;
    if (detailDescription) detailDescription.textContent = product.description;
    
    // Update product specifications
    const specsContainer = document.getElementById('detail-specs');
    if (specsContainer) {
        const specs = getProductSpecs(product);
        specsContainer.innerHTML = specs.map(spec => `<li><strong>${spec.label}:</strong> ${spec.value}</li>`).join('');
    }
    
    // Setup add to cart button
    const addToCartDetail = document.getElementById('add-to-cart-detail');
    if (addToCartDetail) {
        addToCartDetail.onclick = () => addToCart(product.id);
    }
}

// Get category display name
function getCategoryDisplayName(category) {
    const categoryNames = {
        'postcards': 'Postcards',
        'wall-art': 'Wall Art',
        'bookmarks': 'Bookmarks',
        'custom': 'Custom Pieces'
    };
    return categoryNames[category] || category;
}

// Get product specifications
function getProductSpecs(product) {
    const baseSpecs = [
        { label: 'Category', value: getCategoryDisplayName(product.category) },
        { label: 'Price', value: `$${product.price}` },
        { label: 'Medium', value: 'Watercolor on Paper' },
        { label: 'Style', value: 'Contemporary Watercolor' }
    ];
    
    // Add category-specific specs
    if (product.category === 'postcards') {
        baseSpecs.push(
            { label: 'Size', value: '4" x 6"' },
            { label: 'Paper', value: 'High-quality cardstock' }
        );
    } else if (product.category === 'wall-art') {
        baseSpecs.push(
            { label: 'Size', value: '11" x 14" to 24" x 30"' },
            { label: 'Frame', value: 'Included' },
            { label: 'Ready to Hang', value: 'Yes' }
        );
    } else if (product.category === 'bookmarks') {
        baseSpecs.push(
            { label: 'Size', value: '2" x 6"' },
            { label: 'Features', value: 'Braided tassel included' },
            { label: 'Laminated', value: 'Yes' }
        );
    } else if (product.category === 'custom') {
        baseSpecs.push(
            { label: 'Size', value: 'Variable (8" x 10" to 16" x 20")' },
            { label: 'Turnaround', value: '2-3 weeks' },
            { label: 'Consultation', value: 'Included' }
        );
    }
    
    return baseSpecs;
}

// Related products pagination
let currentRelatedPage = 0;
const relatedProductsPerPage = 4;

// Load related products
function loadRelatedProducts() {
    const productId = parseInt(getUrlParameter('id'));
    const currentProduct = products.find(p => p.id === productId);
    
    if (!currentProduct) return;
    
    // Get products from the same category, excluding current product
    let relatedProducts = products.filter(p => 
        p.category === currentProduct.category && p.id !== productId
    );
    
    // If not enough products in same category, add products from other categories
    if (relatedProducts.length < 8) {
        const otherProducts = products.filter(p => 
            p.category !== currentProduct.category && p.id !== productId
        );
        relatedProducts = [...relatedProducts, ...otherProducts];
    }
    
    // Store related products globally
    window.allRelatedProducts = relatedProducts;
    
    // Display first page
    displayRelatedProducts();
}

// Display related products for current page
function displayRelatedProducts() {
    const startIndex = currentRelatedPage * relatedProductsPerPage;
    const endIndex = startIndex + relatedProductsPerPage;
    const productsToShow = window.allRelatedProducts.slice(startIndex, endIndex);
    
    const grid = document.getElementById('related-products-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    // Add products with staggered animation
    productsToShow.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.opacity = '0';
        productCard.style.transform = 'translateY(30px)';
        grid.appendChild(productCard);
        
        // Trigger animation with delay
        setTimeout(() => {
            productCard.style.opacity = '1';
            productCard.style.transform = 'translateY(0)';
        }, index * 100 + 50);
    });
    
    // Update pagination info
    const totalProducts = window.allRelatedProducts.length;
    const currentStart = startIndex + 1;
    const currentEnd = Math.min(endIndex, totalProducts);
    const paginationText = document.getElementById('pagination-text');
    if (paginationText) {
        paginationText.textContent = 
            `Showing ${currentStart}-${currentEnd} of ${totalProducts} products`;
    }
    
    // Update navigation buttons
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) prevBtn.disabled = currentRelatedPage === 0;
    if (nextBtn) nextBtn.disabled = endIndex >= totalProducts;
}

// Navigate related products
function navigateRelatedProducts(direction) {
    const totalPages = Math.ceil(window.allRelatedProducts.length / relatedProductsPerPage);
    const grid = document.getElementById('related-products-grid');
    
    if (!grid) return;
    
    // Add transitioning class for fade out effect
    grid.classList.add('transitioning');
    
    // Wait for fade out, then update content
    setTimeout(() => {
        currentRelatedPage += direction;
        
        if (currentRelatedPage < 0) {
            currentRelatedPage = 0;
        } else if (currentRelatedPage >= totalPages) {
            currentRelatedPage = totalPages - 1;
        }
        
        displayRelatedProducts();
        
        // Remove transitioning class and trigger fade in
        setTimeout(() => {
            grid.classList.remove('transitioning');
        }, 50);
    }, 250);
}

// Get category display name
function getCategoryName(category) {
    const categoryNames = {
        'postcards': 'Postcards',
        'wall-art': 'Wall Art',
        'bookmarks': 'Bookmarks',
        'custom': 'Custom Pieces'
    };
    return categoryNames[category] || category;
}

// Filter products
function filterProducts(filter) {
    currentFilter = filter;
    let filteredProducts;
    
    if (filter === 'all') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === filter);
    }
    
    displayProducts(filteredProducts);
}

// Set active filter button
function setActiveFilter(filter) {
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    // Update cart items
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #7f8c8d; padding: 2rem;">Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            const cartItem = createCartItem(item);
            cartItemsContainer.appendChild(cartItem);
        });
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Create cart item
function createCartItem(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" onerror="this.src='images/placeholder.jpg'">
        <div class="cart-item-info">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">$${item.price} x ${item.quantity}</div>
        </div>
        <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
    `;
    return cartItem;
}

// Toggle cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('open');
}

// Toggle mobile menu
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Open product modal
function openProductModal(product) {
    modalContent.innerHTML = `
        <div class="modal-product">
            <div class="modal-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
            </div>
            <div class="modal-info">
                <div class="modal-category">${getCategoryName(product.category)}</div>
                <h2>${product.name}</h2>
                <div class="modal-price">$${product.price}</div>
                <div class="modal-description">${product.description}</div>
                <button class="modal-add-to-cart" onclick="addToCart(${product.id}); closeProductModal();">Add to Cart</button>
            </div>
        </div>
    `;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close product modal
function closeProductModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1003;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
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

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    showNotification('Thank you for your message! We\'ll get back to you soon.');
    
    // Reset form
    e.target.reset();
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = total >= 50 ? 0 : 8;
    const finalTotal = total + shippingCost;
    
    // Create checkout summary
    const checkoutSummary = `
        Order Summary:
        ${cart.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}
        
        Subtotal: $${total.toFixed(2)}
        Shipping: ${shippingCost === 0 ? 'FREE' : '$' + shippingCost.toFixed(2)}
        Total: $${finalTotal.toFixed(2)}
        
        Payment Methods Available:
        • PayPal
        • Venmo
        • Zelle
        
        Please contact us to complete your order!
    `;
    
    alert(checkoutSummary);
}

// Add checkout event listener
document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
});

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.product-card, .feature, .policy-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
window.addEventListener('scroll', animateOnScroll);

// Set initial opacity for animated elements
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.product-card, .feature, .policy-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial animation check
    setTimeout(animateOnScroll, 100);
});

// Cart Page Functions
function loadCartPage() {
    const cartItemsList = document.getElementById('cart-items-list');
    const emptyCart = document.getElementById('empty-cart');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (cart.length === 0) {
        cartItemsList.style.display = 'none';
        emptyCart.style.display = 'block';
        checkoutBtn.disabled = true;
    } else {
        cartItemsList.style.display = 'block';
        emptyCart.style.display = 'none';
        checkoutBtn.disabled = false;
        
        cartItemsList.innerHTML = '';
        cart.forEach(item => {
            const cartItemElement = createFullCartItem(item);
            cartItemsList.appendChild(cartItemElement);
        });
    }
    
    updateCartTotals();
}

function createFullCartItem(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item-full';
    cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='images/placeholder.jpg'">
        <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p>${getCategoryName(item.category)}</p>
        </div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <div class="quantity-controls">
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
            <span class="quantity-display">${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeFromCartPage(${item.id})">Remove</button>
    `;
    return cartItem;
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCartPage(productId);
        } else {
            loadCartPage();
            updateCartUI();
        }
    }
}

function removeFromCartPage(productId) {
    cart = cart.filter(item => item.id !== productId);
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartPage();
    updateCartUI();
    showNotification('Item removed from cart');
}

function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartPage();
        updateCartUI();
        showNotification('Cart cleared');
    }
}

function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 50 ? 0 : 8;
    const total = subtotal + shipping;
    
    const subtotalElement = document.getElementById('cart-subtotal');
    const shippingElement = document.getElementById('cart-shipping');
    const totalElement = document.getElementById('cart-total');
    const navCartCount = document.getElementById('nav-cart-count');
    
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingElement) {
        shippingElement.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
        shippingElement.style.color = shipping === 0 ? '#27ae60' : '#2c3e50';
    }
    if (totalElement) totalElement.innerHTML = `<strong>$${total.toFixed(2)}</strong>`;
    
    // Update navigation cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (navCartCount) {
        navCartCount.textContent = totalItems;
        navCartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = total >= 50 ? 0 : 8;
    const finalTotal = total + shippingCost;
    
    const checkoutSummary = `
Order Summary:
${cart.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

Subtotal: $${total.toFixed(2)}
Shipping: ${shippingCost === 0 ? 'FREE' : '$' + shippingCost.toFixed(2)}
Total: $${finalTotal.toFixed(2)}

Payment Methods Available:
• PayPal
• Venmo  
• Zelle

Please contact us to complete your order!
Email: ksenia@watercolorart.com
Phone: (555) 123-4567`;
    
    alert(checkoutSummary);
}

// ... existing code ...