/**
 * Blog Loader
 * Carga contenido del blog desde JSON y lo renderiza en diferentes páginas
 */

// Cargar contenido del blog
async function loadBlogContent() {
    try {
        const response = await fetch('data/blog-content.json');
        if (!response.ok) {
            throw new Error('Error loading blog content');
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading blog content:', error);
        return null;
    }
}

// Renderizar artículos en la página de inicio (últimos 3)
async function renderBlogPreview() {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;

    const data = await loadBlogContent();
    if (!data) return;

    const articles = data.articles.slice(0, 3);
    
    blogGrid.innerHTML = articles.map(article => `
        <article class="blog-card">
            <div class="blog-image">
                <img src="${article.image}" alt="${article.imageAlt}" class="blog-image-placeholder" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-date">${article.date}</span>
                    <span class="blog-reading">${article.readTime}</span>
                </div>
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <a href="blog-article.html?article=${article.slug}" class="blog-link">
                    Leer más
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </a>
            </div>
        </article>
    `).join('');
}

// Renderizar todos los artículos en la página de blog
async function renderBlogPage() {
    const blogPageGrid = document.querySelector('.blog-page-grid');
    if (!blogPageGrid) return;

    const data = await loadBlogContent();
    if (!data) return;

    const articles = data.articles;
    
    blogPageGrid.innerHTML = articles.map(article => `
        <article class="blog-card-full">
            <div class="blog-image">
                <img src="${article.image}" alt="${article.imageAlt}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="blog-content">
                <h2>${article.title}</h2>
                <div class="blog-meta">
                    <span class="blog-date">${article.date}</span>
                    <span class="blog-reading">${article.readTime}</span>
                </div>
                <p class="blog-excerpt">${article.excerpt}</p>
                <div class="blog-topics">
                    ${article.topics.map(topic => `<span class="topic">${topic}</span>`).join('')}
                </div>
                <a href="blog-article.html?article=${article.slug}" class="blog-link-full">
                    Leer artículo completo
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </a>
            </div>
        </article>
    `).join('');
}

// Renderizar artículo individual completo
async function renderArticlePage() {
    const articleContainer = document.querySelector('.article-full-content');
    if (!articleContainer) return;

    const data = await loadBlogContent();
    if (!data) return;

    // Obtener slug de la URL
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('article');

    if (!slug) {
        articleContainer.innerHTML = '<p>Artículo no encontrado</p>';
        return;
    }

    const article = data.articles.find(a => a.slug === slug);
    if (!article) {
        articleContainer.innerHTML = '<p>Artículo no encontrado</p>';
        return;
    }

    articleContainer.innerHTML = `
        <article class="article-page">
            <div class="container-article">
                <div class="article-header">
                    <h1>${article.title}</h1>
                    <div class="article-meta">
                        <span>📅 ${article.date}</span>
                        <span>⏱️ ${article.readTime}</span>
                        <span>👤 ${article.author}</span>
                    </div>
                    <div class="article-topics">
                        ${article.topics.map(topic => `<span class="topic">${topic}</span>`).join('')}
                    </div>
                </div>

                <div class="article-content">
                    ${article.content}
                </div>

                <div class="article-nav">
                    <a href="blog.html" class="btn-secondary">← Volver al Blog</a>
                    <a href="index.html#contacto" class="btn-primary">Contactar</a>
                </div>
            </div>
        </article>
    `;
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Renderizar preview en index.html
    if (document.querySelector('.blog-grid')) {
        renderBlogPreview();
    }
    
    // Renderizar página completa en blog.html
    if (document.querySelector('.blog-page-grid')) {
        renderBlogPage();
    }

    // Renderizar artículo individual
    if (document.querySelector('.article-full-content')) {
        renderArticlePage();
    }
});
