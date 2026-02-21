/**
 * Header Component
 * Carga el header de forma consistente en todas las páginas
 */

// Detectar si estamos en un artículo de blog
const isArticlePage = window.location.pathname.includes('/blog/');
const pathPrefix = isArticlePage ? '../' : '';

const headerHTML = isArticlePage ? `
<header class="header">
    <div class="header-container">
        <a href="${pathPrefix}index.html#inicio" class="logo">
            <img src="${pathPrefix}images/image_logo_white.png" alt="deeb" class="logo-img">
            <span class="logo-text">deeb</span>
        </a>
        <nav class="nav">
            <a href="${pathPrefix}blog.html" class="nav-link">← Volver al Blog</a>
        </nav>
        <div class="nav-actions">
            <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
                <svg class="sun-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="4" fill="currentColor"/>
                    <path d="M10 0V3M10 17V20M20 10H17M3 10H0M16.66 16.66L14.83 14.83M5.17 5.17L3.34 3.34M16.66 3.34L14.83 5.17M5.17 14.83L3.34 16.66" stroke="currentColor" stroke-width="2"/>
                </svg>
                <svg class="moon-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" fill="currentColor"/>
                </svg>
            </button>
        </div>
    </div>
</header>
` : `
<header class="header">
    <div class="header-container">
        <a href="${pathPrefix}index.html#inicio" class="logo">
            <img src="${pathPrefix}images/image_logo_white.png" alt="deeb" class="logo-img">
            <span class="logo-text">deeb</span>
        </a>
        
        <nav class="nav">
            <a href="${pathPrefix}index.html#servicios" class="nav-link">Servicios</a>
            <a href="${pathPrefix}maturity-model.html" class="nav-link">Modelo</a>
            <a href="${pathPrefix}blog.html" class="nav-link">Blog</a>
        </nav>

        <div class="nav-actions">
            <button class="btn-login">
                <span>Iniciar sesión</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 0L10 2L6 6H16V10H6L10 14L8 16L0 8L8 0Z" fill="currentColor" transform="rotate(180 8 8)"/>
                </svg>
            </button>
            
            <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
                <svg class="sun-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="4" fill="currentColor"/>
                    <path d="M10 0V3M10 17V20M20 10H17M3 10H0M16.66 16.66L14.83 14.83M5.17 5.17L3.34 3.34M16.66 3.34L14.83 5.17M5.17 14.83L3.34 16.66" stroke="currentColor" stroke-width="2"/>
                </svg>
                <svg class="moon-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" fill="currentColor"/>
                </svg>
            </button>
            
            <button class="burger-menu" id="mobile-menu-toggle" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </div>
</header>
`;

// Función para cargar el header
function loadHeader() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;
        
        // Marcar el link activo según la página actual (solo para páginas principales)
        if (!isArticlePage) {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const currentHash = window.location.hash;
            const navLinks = document.querySelectorAll('.nav-link');
            
            navLinks.forEach(link => {
                const linkHref = link.getAttribute('href');
                const linkPage = linkHref.split('#')[0];
                const linkHash = linkHref.split('#')[1];
                
                // Marcar como activo solo si coincide exactamente
                if (linkPage === 'blog.html' && currentPage === 'blog.html') {
                    link.classList.add('active');
                } else if (linkPage === 'index.html' && (currentPage === 'index.html' || currentPage === '')) {
                    // En index.html, no marcar ninguno como activo (o solo si hay un hash específico)
                    // Esto evita que se marquen múltiples links
                    if (currentHash && linkHash === currentHash.substring(1)) {
                        link.classList.add('active');
                    }
                }
            });
        }
        
        // Inicializar el toggle de tema
        initThemeToggle();
    }
}

// Función para inicializar el toggle de tema
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    if (!themeToggle) return;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const theme = html.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Cargar el header cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}
