/**
 * Blog Engine - Dynamic Blog Post Loader
 * Loads blog posts from JSON and renders them dynamically
 * Compatible with headless CMS migration
 */

class BlogEngine {
    constructor(dataSource = '/data/blog-posts.json') {
        this.dataSource = dataSource;
        this.posts = [];
        this.categories = [];
        this.settings = {};
        this.currentFilter = 'all';
    }

    /**
     * Initialize the blog engine
     */
    async init() {
        try {
            await this.loadData();
            this.renderPosts();
            this.setupFilters();
        } catch (error) {
            console.error('Error initializing blog:', error);
            this.showError('No se pudieron cargar los artículos del blog');
        }
    }

    /**
     * Load blog data from JSON or CMS Adapter
     */
    async loadData() {
        try {
            // Check if dataSource is a CMS adapter (has fetchPosts method)
            if (typeof this.dataSource === 'object' && this.dataSource.fetchPosts) {
                // Use CMS adapter
                this.posts = await this.dataSource.fetchPosts();
                this.categories = [
                    { id: 'studio', label: 'STUDIO', color: '#3B82F6' },
                    { id: 'advisory', label: 'Advisory', color: '#10B981' }
                ];
                this.settings = {
                    blogTitle: 'Blog de deeb',
                    baseUrl: 'https://deeb.com'
                };
            } else {
                // Use JSON file
                const response = await fetch(this.dataSource);
                if (!response.ok) throw new Error('Failed to fetch blog data');
                
                const data = await response.json();
                this.posts = data.posts.filter(post => post.published);
                this.categories = data.categories;
                this.settings = data.settings;
            }
            
            // Sort posts by date (newest first)
            this.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        } catch (error) {
            console.error('Error loading blog data:', error);
            throw error;
        }
    }

    /**
     * Render blog posts to the DOM
     */
    renderPosts(filter = 'all') {
        const container = document.getElementById('blog-posts-container');
        if (!container) return;

        // Filter posts
        const filteredPosts = filter === 'all' 
            ? this.posts 
            : this.posts.filter(post => post.category === filter);

        // Clear container
        container.innerHTML = '';

        // Render each post
        filteredPosts.forEach(post => {
            const postElement = this.createPostCard(post);
            container.appendChild(postElement);
        });

        // Show message if no posts
        if (filteredPosts.length === 0) {
            container.innerHTML = '<p class="no-posts">No hay artículos en esta categoría</p>';
        }
    }

    /**
     * Create a post card element
     */
    createPostCard(post) {
        const article = document.createElement('article');
        article.className = 'blog-card-full';
        article.setAttribute('data-category', post.category);

        const categoryColor = this.getCategoryColor(post.category);

        article.innerHTML = `
            <div class="blog-image">
                <div class="blog-category ${post.category}">${post.categoryLabel}</div>
                <img src="${post.image}" alt="${post.imageAlt}" class="blog-image-full" loading="lazy" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="blog-image-placeholder" style="display: none;">
                    ${this.getCategoryIcon(post.category)}
                </div>
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-date">📅 ${post.dateFormatted}</span>
                    <span class="blog-reading">⏱️ ${post.readingTime}</span>
                    <span class="blog-author">👤 ${post.author}</span>
                </div>
                <h2>${post.title}</h2>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-topics">
                    ${post.topics.map(topic => `<span class="topic">${topic}</span>`).join('')}
                </div>
                <a href="blog/${post.slug}.html" class="blog-link-full">
                    Leer artículo completo
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </a>
                <div class="blog-share">
                    <span>Compartir:</span>
                    ${this.createShareButtons(post)}
                </div>
            </div>
        `;

        return article;
    }

    /**
     * Create share buttons HTML
     */
    createShareButtons(post) {
        const url = `${this.settings.baseUrl}/blog/${post.slug}.html`;
        const text = encodeURIComponent(post.title);

        return `
            <a href="https://twitter.com/intent/tweet?text=${text}&url=${url}" target="_blank" aria-label="Compartir en Twitter">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
            </a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${url}" target="_blank" aria-label="Compartir en LinkedIn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
                </svg>
            </a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" aria-label="Compartir en Facebook">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M18 10c0-4.42-3.58-8-8-8s-8 3.58-8 8c0 3.99 2.93 7.3 6.75 7.9v-5.6H6.72V10h2.03V8.34c0-2 1.19-3.1 3.01-3.1.87 0 1.79.16 1.79.16v1.97h-1.01c-1 0-1.31.62-1.31 1.25V10h2.22l-.35 2.3h-1.87v5.6C15.07 17.3 18 13.99 18 10z"/>
                </svg>
            </a>
        `;
    }

    /**
     * Get category icon SVG
     */
    getCategoryIcon(category) {
        const icons = {
            studio: `
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <rect x="20" y="25" width="40" height="30" rx="4" fill="rgba(59, 130, 246, 0.1)"/>
                    <path d="M30 35L40 45L50 35" stroke="#3B82F6" stroke-width="3" stroke-linecap="round"/>
                </svg>
            `,
            advisory: `
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="25" cy="40" r="8" fill="rgba(59, 130, 246, 0.2)"/>
                    <circle cx="40" cy="40" r="8" fill="rgba(59, 130, 246, 0.3)"/>
                    <circle cx="55" cy="40" r="8" fill="rgba(59, 130, 246, 0.4)"/>
                    <line x1="33" y1="40" x2="47" y2="40" stroke="#3B82F6" stroke-width="2"/>
                </svg>
            `
        };
        return icons[category] || icons.studio;
    }

    /**
     * Get category color
     */
    getCategoryColor(categoryId) {
        const category = this.categories.find(cat => cat.id === categoryId);
        return category ? category.color : '#3B82F6';
    }

    /**
     * Setup filter buttons
     */
    setupFilters() {
        const filterButtons = document.querySelectorAll('.tag-filter');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.currentFilter = filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Re-render posts with filter
                this.renderPosts(filter);
            });
        });
    }

    /**
     * Show error message
     */
    showError(message) {
        const container = document.getElementById('blog-posts-container');
        if (container) {
            container.innerHTML = `<p class="error-message">${message}</p>`;
        }
    }

    /**
     * Get single post by slug (for individual post pages)
     */
    async getPostBySlug(slug) {
        await this.loadData();
        return this.posts.find(post => post.slug === slug);
    }

    /**
     * Render individual post page
     */
    async renderSinglePost(slug) {
        try {
            const post = await this.getPostBySlug(slug);
            if (!post) {
                throw new Error('Post not found');
            }

            // Update meta tags
            document.title = `${post.title} | ${this.settings.blogTitle}`;
            
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', post.metaDescription);
            }

            // Update Open Graph tags if they exist
            this.updateOGTags(post);

        } catch (error) {
            console.error('Error rendering post:', error);
        }
    }

    /**
     * Update Open Graph meta tags
     */
    updateOGTags(post) {
        const ogTags = {
            'og:title': post.title,
            'og:description': post.metaDescription,
            'og:image': `${this.settings.baseUrl}/${post.ogImage}`,
            'og:url': `${this.settings.baseUrl}/blog/${post.slug}.html`,
            'twitter:title': post.title,
            'twitter:description': post.metaDescription,
            'twitter:image': `${this.settings.baseUrl}/${post.ogImage}`
        };

        Object.keys(ogTags).forEach(property => {
            let meta = document.querySelector(`meta[property="${property}"]`) || 
                       document.querySelector(`meta[name="${property}"]`);
            
            if (meta) {
                meta.setAttribute('content', ogTags[property]);
            }
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const blogEngine = new BlogEngine();
    
    // Check if we're on the blog listing page
    if (document.getElementById('blog-posts-container')) {
        blogEngine.init();
    }
    
    // Make it globally available for debugging
    window.blogEngine = blogEngine;
});
