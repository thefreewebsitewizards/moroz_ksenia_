// Universal Navbar and Footer Loader
(function() {
    console.log('Navbar loader script started');
    
    function loadNavbar() {
        console.log('Loading navbar...');
        
        fetch('../components/navbar.html')
            .then(response => {
                console.log('Navbar fetch response:', response.status);
                return response.text();
            })
            .then(html => {
                console.log('Navbar HTML loaded');
                const placeholder = document.getElementById('navbar-placeholder');
                if (placeholder) {
                    placeholder.innerHTML = html;
                    console.log('Navbar inserted into placeholder');
                    
                    // Initialize both hamburger menu and dropdown immediately after loading
                    setTimeout(() => {
                        initHamburgerMenu();
                        initAdminDropdown();
                    }, 100);
                    
                    // Add logout functionality
                    window.logout = function() {
                        if (confirm('Are you sure you want to logout?')) {
                            console.log('Logging out...');
                            alert('Logout functionality - implement your logout logic here');
                        }
                    };
                } else {
                    console.error('Navbar placeholder not found!');
                }
            })
            .catch(error => {
                console.error('Error loading navbar:', error);
            });
    }
    
    function loadFooter() {
        console.log('Loading footer...');
        
        fetch('../components/footer.html')
            .then(response => response.text())
            .then(html => {
                const placeholder = document.getElementById('footer-placeholder');
                if (placeholder) {
                    placeholder.innerHTML = html;
                    console.log('Footer loaded successfully');
                }
            })
            .catch(error => {
                console.error('Error loading footer:', error);
            });
    }
    
    function initHamburgerMenu() {
        console.log('Initializing hamburger menu...');
        
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (hamburger && navMenu) {
            console.log('Hamburger elements found, adding event listeners');
            
            hamburger.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Hamburger clicked!');
                
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                console.log('Hamburger active:', hamburger.classList.contains('active'));
                console.log('NavMenu active:', navMenu.classList.contains('active'));
            });
            
            // Close menu when clicking nav links
            const navLinks = navMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
            
            console.log('Hamburger menu initialized successfully!');
        } else {
            console.error('Hamburger elements not found:', {
                hamburger: !!hamburger,
                navMenu: !!navMenu
            });
        }
    }
    
    function initAdminDropdown() {
        console.log('Initializing admin dropdown...');
        
        const adminUserDropdown = document.getElementById('adminUserDropdown');
        
        if (adminUserDropdown) {
            const trigger = adminUserDropdown.querySelector('.admin-user-trigger');
            
            if (trigger) {
                console.log('Admin dropdown trigger found, adding event listeners');
                
                trigger.addEventListener('click', function(e) {
                    e.stopPropagation();
                    console.log('Admin dropdown clicked!');
                    adminUserDropdown.classList.toggle('active');
                    console.log('Dropdown active:', adminUserDropdown.classList.contains('active'));
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
            
            // Close dropdown on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && adminUserDropdown.classList.contains('active')) {
                    adminUserDropdown.classList.remove('active');
                }
            });
            
            // Handle window resize - close dropdown on mobile
            window.addEventListener('resize', () => {
                if (window.innerWidth <= 768 && adminUserDropdown.classList.contains('active')) {
                    adminUserDropdown.classList.remove('active');
                }
            });
            
            console.log('Admin dropdown initialized successfully!');
        } else {
            console.error('Admin dropdown element not found');
        }
    }
    
    // Load components when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            loadNavbar();
            loadFooter();
        });
    } else {
        loadNavbar();
        loadFooter();
    }
    
})();