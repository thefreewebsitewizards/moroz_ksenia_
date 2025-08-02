// Navbar functionality
function initializeNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navClose = document.getElementById('navClose');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const adminUserDropdown = document.getElementById('adminUserDropdown');
    const body = document.body;
    
    if (!hamburger || !navMenu) {
        console.warn('Navbar elements not found');
        return;
    }
    
    // Initialize desktop dropdown
    if (adminUserDropdown) {
        const trigger = adminUserDropdown.querySelector('.admin-user-trigger');
        
        if (trigger) {
            trigger.addEventListener('click', function(e) {
                e.stopPropagation();
                adminUserDropdown.classList.toggle('active');
            });
        }
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!adminUserDropdown.contains(e.target)) {
                adminUserDropdown.classList.remove('active');
            }
        });
        
        // Close dropdown when clicking dropdown items
        const dropdownItems = adminUserDropdown.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                adminUserDropdown.classList.remove('active');
            });
        });
    }
    
    // Toggle mobile menu
    function toggleMenu() {
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    }
    
    // Open mobile menu
    function openMenu() {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        if (navOverlay) navOverlay.classList.add('active');
        body.classList.add('nav-open');
        
        // Store current scroll position
        const scrollY = window.scrollY;
        body.style.top = `-${scrollY}px`;
    }
    
    // Close mobile menu
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        body.classList.remove('nav-open');
        
        // Restore scroll position
        const scrollY = body.style.top;
        body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
    
    // Event listeners
    hamburger.addEventListener('click', toggleMenu);
    
    if (navClose) {
        navClose.addEventListener('click', closeMenu);
    }
    
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMenu);
    }
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (navMenu.classList.contains('active')) {
                closeMenu();
            }
            if (adminUserDropdown && adminUserDropdown.classList.contains('active')) {
                adminUserDropdown.classList.remove('active');
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            closeMenu();
        }
        if (window.innerWidth <= 768 && adminUserDropdown && adminUserDropdown.classList.contains('active')) {
            adminUserDropdown.classList.remove('active');
        }
    });
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Add your logout logic here
        console.log('Logging out...');
        // window.location.href = '/login';
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavbar);
} else {
    initializeNavbar();
}

// Export for manual initialization if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initializeNavbar, logout };
}