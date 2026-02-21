/**
 * Mobile Menu Handler
 * Maneja la apertura y cierre del menú móvil
 */

document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-link');
    const megaMenuItems = document.querySelectorAll('.nav-item-mega');
    const megaMenuLinks = document.querySelectorAll('.mega-menu a');

    if (!burgerMenu || !nav) {
        console.warn('Mobile menu elements not found');
        return;
    }

    // Toggle menu cuando se hace click en el botón burger
    burgerMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Manejar mega menus en mobile - toggle al hacer click
    megaMenuItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    
                    // Cerrar otros mega menus
                    megaMenuItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle este mega menu
                    item.classList.toggle('active');
                }
            });
        }
    });

    // Cerrar menú cuando se hace click en un link de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    // Cerrar menú cuando se hace click en un link del mega menu
    megaMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                closeMenu();
                // Cerrar todos los mega menus
                megaMenuItems.forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    });

    // Cerrar menú cuando se hace click fuera de él
    document.addEventListener('click', function(e) {
        const isClickInsideNav = nav.contains(e.target);
        const isClickOnBurger = burgerMenu.contains(e.target);
        
        if (!isClickInsideNav && !isClickOnBurger && nav.classList.contains('active')) {
            closeMenu();
        }
    });

    // Cerrar menú con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            closeMenu();
        }
    });

    // Cerrar menú al cambiar de orientación o resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            if (nav.classList.contains('active')) {
                closeMenu();
            }
            // Limpiar estados de mega menus
            megaMenuItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // Feedback táctil para links
    const allLinks = document.querySelectorAll('.nav-link, .mega-menu a');
    allLinks.forEach(link => {
        link.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });
        
        link.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });

    function toggleMenu() {
        const isActive = nav.classList.contains('active');
        
        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        nav.classList.add('active');
        burgerMenu.classList.add('active');
        body.classList.add('menu-open');
        burgerMenu.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        nav.classList.remove('active');
        burgerMenu.classList.remove('active');
        body.classList.remove('menu-open');
        burgerMenu.setAttribute('aria-expanded', 'false');
        
        // Cerrar todos los mega menus al cerrar el menu principal
        megaMenuItems.forEach(item => {
            item.classList.remove('active');
        });
    }
});
