/**
 * CMS Adapters - Adaptadores para diferentes Headless CMS
 * Úsalos cuando migres de JSON a un CMS headless
 */

/**
 * STRAPI ADAPTER
 * Documetación: https://docs.strapi.io/dev-docs/api/rest
 */
class StrapiAdapter {
    constructor(apiUrl, apiToken = null) {
        this.apiUrl = apiUrl;
        this.apiToken = apiToken;
    }

    async fetchPosts() {
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (this.apiToken) {
            headers['Authorization'] = `Bearer ${this.apiToken}`;
        }

        const response = await fetch(
            `${this.apiUrl}/api/blog-posts?populate=*&sort=publishedAt:desc`,
            { headers }
        );
        
        const data = await response.json();
        return this.transformPosts(data.data);
    }

    transformPosts(strapiPosts) {
        return strapiPosts.map(post => ({
            id: post.id,
            slug: post.attributes.slug,
            title: post.attributes.title,
            excerpt: post.attributes.excerpt,
            category: post.attributes.category?.data?.attributes?.slug || 'studio',
            categoryLabel: post.attributes.category?.data?.attributes?.name || 'STUDIO',
            author: post.attributes.author || 'Equipo deeb',
            date: post.attributes.publishedAt,
            dateFormatted: this.formatDate(post.attributes.publishedAt),
            readingTime: post.attributes.readingTime || '5 min lectura',
            image: this.getImageUrl(post.attributes.image),
            imageAlt: post.attributes.image?.data?.attributes?.alternativeText || post.attributes.title,
            topics: post.attributes.topics || [],
            published: post.attributes.published !== false,
            featured: post.attributes.featured || false,
            metaDescription: post.attributes.metaDescription || post.attributes.excerpt,
            ogImage: this.getImageUrl(post.attributes.ogImage || post.attributes.image)
        }));
    }

    getImageUrl(imageData) {
        if (!imageData?.data) return 'images/blog/placeholder.jpg';
        const url = imageData.data.attributes.url;
        return url.startsWith('http') ? url : `${this.apiUrl}${url}`;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    }
}

/**
 * CONTENTFUL ADAPTER
 * Documentación: https://www.contentful.com/developers/docs/references/content-delivery-api/
 */
class ContentfulAdapter {
    constructor(spaceId, accessToken, environment = 'master') {
        this.spaceId = spaceId;
        this.accessToken = accessToken;
        this.environment = environment;
        this.apiUrl = `https://cdn.contentful.com/spaces/${spaceId}/environments/${environment}`;
    }

    async fetchPosts() {
        const response = await fetch(
            `${this.apiUrl}/entries?access_token=${this.accessToken}&content_type=blogPost&order=-sys.createdAt`,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        
        const data = await response.json();
        return this.transformPosts(data.items, data.includes);
    }

    transformPosts(entries, includes) {
        return entries.map(entry => {
            const fields = entry.fields;
            const image = this.resolveAsset(fields.image?.sys?.id, includes);
            
            return {
                id: entry.sys.id,
                slug: fields.slug,
                title: fields.title,
                excerpt: fields.excerpt,
                category: fields.category || 'studio',
                categoryLabel: fields.categoryLabel || 'STUDIO',
                author: fields.author || 'Equipo deeb',
                date: entry.sys.createdAt,
                dateFormatted: this.formatDate(entry.sys.createdAt),
                readingTime: fields.readingTime || '5 min lectura',
                image: image?.fields?.file?.url ? `https:${image.fields.file.url}` : 'images/blog/placeholder.jpg',
                imageAlt: image?.fields?.description || fields.title,
                topics: fields.topics || [],
                published: fields.published !== false,
                featured: fields.featured || false,
                metaDescription: fields.metaDescription || fields.excerpt,
                ogImage: image?.fields?.file?.url ? `https:${image.fields.file.url}` : 'images/blog/placeholder.jpg'
            };
        });
    }

    resolveAsset(assetId, includes) {
        if (!assetId || !includes?.Asset) return null;
        return includes.Asset.find(asset => asset.sys.id === assetId);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    }
}

/**
 * SANITY ADAPTER
 * Documentación: https://www.sanity.io/docs/http-api
 */
class SanityAdapter {
    constructor(projectId, dataset = 'production', apiVersion = '2021-10-21') {
        this.projectId = projectId;
        this.dataset = dataset;
        this.apiVersion = apiVersion;
        this.apiUrl = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`;
    }

    async fetchPosts() {
        const query = encodeURIComponent(`
            *[_type == "blogPost" && published == true] | order(publishDate desc) {
                _id,
                title,
                slug,
                excerpt,
                category->{slug, name},
                author,
                publishDate,
                readingTime,
                "image": mainImage.asset->url,
                "imageAlt": mainImage.alt,
                topics,
                featured,
                metaDescription
            }
        `);

        const response = await fetch(`${this.apiUrl}?query=${query}`);
        const data = await response.json();
        return this.transformPosts(data.result);
    }

    transformPosts(sanityPosts) {
        return sanityPosts.map(post => ({
            id: post._id,
            slug: post.slug.current,
            title: post.title,
            excerpt: post.excerpt,
            category: post.category?.slug || 'studio',
            categoryLabel: post.category?.name || 'STUDIO',
            author: post.author || 'Equipo deeb',
            date: post.publishDate,
            dateFormatted: this.formatDate(post.publishDate),
            readingTime: post.readingTime || '5 min lectura',
            image: post.image || 'images/blog/placeholder.jpg',
            imageAlt: post.imageAlt || post.title,
            topics: post.topics || [],
            published: true,
            featured: post.featured || false,
            metaDescription: post.metaDescription || post.excerpt,
            ogImage: post.image || 'images/blog/placeholder.jpg'
        }));
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    }
}

/**
 * GHOST ADAPTER
 * Documentación: https://ghost.org/docs/content-api/
 */
class GhostAdapter {
    constructor(apiUrl, contentApiKey) {
        this.apiUrl = apiUrl;
        this.contentApiKey = contentApiKey;
    }

    async fetchPosts() {
        const response = await fetch(
            `${this.apiUrl}/ghost/api/v3/content/posts/?key=${this.contentApiKey}&include=tags,authors&limit=all`,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );
        
        const data = await response.json();
        return this.transformPosts(data.posts);
    }

    transformPosts(ghostPosts) {
        return ghostPosts.map(post => {
            const primaryTag = post.tags?.[0];
            
            return {
                id: post.id,
                slug: post.slug,
                title: post.title,
                excerpt: post.excerpt || post.custom_excerpt,
                category: primaryTag?.slug === 'advisory' ? 'advisory' : 'studio',
                categoryLabel: primaryTag?.name || 'STUDIO',
                author: post.authors?.[0]?.name || 'Equipo deeb',
                date: post.published_at,
                dateFormatted: this.formatDate(post.published_at),
                readingTime: `${post.reading_time} min lectura`,
                image: post.feature_image || 'images/blog/placeholder.jpg',
                imageAlt: post.feature_image_alt || post.title,
                topics: post.tags?.map(tag => tag.name) || [],
                published: post.visibility === 'public',
                featured: post.featured || false,
                metaDescription: post.meta_description || post.excerpt,
                ogImage: post.og_image || post.feature_image || 'images/blog/placeholder.jpg'
            };
        });
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    }
}

/**
 * EJEMPLO DE USO
 * 
 * En blog.js, reemplaza la línea de inicialización:
 */

// OPCIÓN 1: JSON Local (actual)
// const blogEngine = new BlogEngine('/data/blog-posts.json');

// OPCIÓN 2: Strapi
// const strapiAdapter = new StrapiAdapter('https://tu-strapi.com', 'tu-api-token');
// const blogEngine = new BlogEngine(strapiAdapter);

// OPCIÓN 3: Contentful
// const contentfulAdapter = new ContentfulAdapter('SPACE_ID', 'ACCESS_TOKEN');
// const blogEngine = new BlogEngine(contentfulAdapter);

// OPCIÓN 4: Sanity
// const sanityAdapter = new SanityAdapter('PROJECT_ID', 'production');
// const blogEngine = new BlogEngine(sanityAdapter);

// OPCIÓN 5: Ghost
// const ghostAdapter = new GhostAdapter('https://tu-blog.ghost.io', 'CONTENT_API_KEY');
// const blogEngine = new BlogEngine(ghostAdapter);

/**
 * Modificar BlogEngine para soportar adaptadores:
 * 
 * async loadData() {
 *     if (typeof this.dataSource === 'string') {
 *         // JSON
 *         const response = await fetch(this.dataSource);
 *         const data = await response.json();
 *         this.posts = data.posts;
 *     } else if (this.dataSource.fetchPosts) {
 *         // Adapter
 *         this.posts = await this.dataSource.fetchPosts();
 *     }
 * }
 */

export { StrapiAdapter, ContentfulAdapter, SanityAdapter, GhostAdapter };
