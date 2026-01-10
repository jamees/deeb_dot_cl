# 📦 Guía de Empaquetado y Despliegue

Esta guía explica cómo empaquetar y desplegar el proyecto deeb.cl

## 🔧 Herramientas de Build

El proyecto usa **Vite** como build tool moderno que proporciona:
- ⚡ Build ultra-rápido
- 📦 Empaquetado optimizado
- 🗜️ Minificación automática
- 🌳 Tree-shaking
- 💾 Code splitting
- 🔗 Hashing para caché

## 🏗️ Proceso de Build

### Opción 1: Build simple

```bash
npm run build
```

Genera el proyecto optimizado en `dist/`:
```
dist/
├── index.html
├── blog.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   ├── blog-[hash].js
│   └── blog-[hash].css
├── css/
├── images/
└── blog/
```

### Opción 2: Build + ZIP

```bash
npm run package
```

Construye el proyecto y crea `dist/deeb-dot-cl.zip` listo para subir.

### Opción 3: Script de deployment

```bash
./deploy.sh
```

Ejecuta un build completo, crea ZIP con timestamp y muestra opciones de despliegue.

## 🌐 Vista Previa Local

Después del build, puedes previsualizar localmente:

```bash
npm run preview
```

Abre `http://localhost:8080` con el build de producción.

## 🚀 Opciones de Despliegue

### 1. GitHub Pages (Automático) ✅

Ya configurado con GitHub Actions. Cada push a `main` despliega automáticamente.

**URL**: https://jamees.github.io/deeb_dot_cl

**Archivo**: `.github/workflows/static.yml`

### 2. Netlify

```bash
# Instalar Netlify CLI (una vez)
npm install -g netlify-cli

# Login
netlify login

# Desplegar
netlify deploy --prod --dir=dist
```

**Drag & Drop**: También puedes arrastrar la carpeta `dist/` a [netlify.com/drop](https://app.netlify.com/drop)

### 3. Vercel

```bash
# Instalar Vercel CLI (una vez)
npm install -g vercel

# Desplegar
vercel --prod ./dist
```

### 4. Hosting Tradicional (FTP/cPanel)

1. Ejecuta `npm run build`
2. Sube todo el contenido de `dist/` a tu servidor
3. Apunta el dominio a la carpeta raíz

### 5. AWS S3 + CloudFront

```bash
# Sincronizar con S3
aws s3 sync dist/ s3://tu-bucket/ --delete

# Invalidar CloudFront cache
aws cloudfront create-invalidation --distribution-id XXXXXX --paths "/*"
```

## 📊 Optimizaciones Incluidas

El build automático incluye:

✅ **HTML**
- Minificación
- Eliminación de comentarios
- Compresión de espacios

✅ **CSS**
- Minificación
- Autoprefixer
- Eliminación de código no usado

✅ **JavaScript**
- Minificación con Terser
- Tree-shaking
- Code splitting
- Compresión Gzip/Brotli

✅ **Assets**
- Optimización de imágenes
- Hashing para cache busting
- Lazy loading

## 🔍 Análisis del Bundle

Para analizar el tamaño del bundle:

```bash
npm run build -- --mode analyze
```

## 🐛 Troubleshooting

### Build falla

```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Assets no cargan

Verifica que las rutas sean relativas en producción. Vite maneja esto automáticamente.

### Diferencias dev vs prod

Siempre prueba con `npm run preview` antes de desplegar.

## 📝 Checklist de Deployment

- [ ] Código actualizado en git
- [ ] Tests pasando
- [ ] `npm run build` exitoso
- [ ] `npm run preview` verificado
- [ ] Links funcionando
- [ ] Imágenes cargando
- [ ] Performance OK (Lighthouse)
- [ ] SEO configurado
- [ ] Analytics configurado

## 🔐 Variables de Entorno

Para diferentes ambientes, crea:

- `.env.development` - Variables de desarrollo
- `.env.production` - Variables de producción

```env
VITE_API_URL=https://api.deeb.cl
VITE_GA_ID=G-XXXXXXXXXX
```

## 📈 Monitoreo Post-Deployment

Después de desplegar, verifica:

1. **Lighthouse Score**: > 90 en todas las métricas
2. **GTmetrix**: Grado A
3. **PageSpeed Insights**: > 90
4. **SSL**: Certificado válido
5. **DNS**: Propagado correctamente

## 🆘 Soporte

Para problemas de deployment:
- Revisa logs de build
- Verifica configuración de Vite
- Consulta documentación de hosting
- GitHub Issues del proyecto
