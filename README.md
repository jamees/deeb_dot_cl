# deeb STUDIO & Advisory

Sitio web corporativo para deeb - Desarrollo de productos digitales y asesoría en transformación digital.

## 🚀 Comenzar

### Requisitos previos

- Node.js (v14 o superior)
- npm (v6 o superior)

### Instalación

1. Instalar las dependencias:
```bash
npm install
```

### Scripts disponibles

#### Desarrollo

```bash
npm run dev
# o
npm start
```

Inicia un servidor de desarrollo con **Vite** y hot-reload en `http://localhost:3000`. Los cambios se reflejarán automáticamente en el navegador.

#### Build/Empaquetado

```bash
npm run build
```

Construye y optimiza el proyecto para producción en la carpeta `dist/`:
- ✅ Minificación de HTML, CSS y JavaScript
- ✅ Optimización de assets (imágenes, fuentes)
- ✅ Tree-shaking (eliminación de código no usado)
- ✅ Code splitting automático
- ✅ Hashing de archivos para caché

#### Empaquetar todo

```bash
npm run package
```

Construye el proyecto y crea un archivo ZIP `deeb-dot-cl.zip` listo para desplegar.

#### Vista previa de producción

```bash
npm run preview
```

Previsualiza el build de producción localmente en `http://localhost:8080`.

#### Scripts legacy (sin Vite)

```bash
npm run legacy:dev      # Live server simple
npm run legacy:serve    # HTTP server básico
```

## 📁 Estructura del proyecto

```
deeb_dot_cl/
├── index.html          # Página principal
├── blog.html           # Página de blog
├── css/                # Archivos de estilos
│   └── modern-style.css
├── js/                 # Scripts JavaScript
├── images/             # Imágenes y assets
├── blog/               # Contenido del blog
│   └── posts/          # Artículos individuales
├── data/               # Datos JSON
└── package.json        # Configuración npm
```

## 🛠️ Tecnologías

- **HTML5**
- **CSS3** (con variables CSS y tema dark/light)
- **JavaScript Vanilla** (ES6+)
- **Vite** - Build tool y dev server ultra-rápido
- **Terser** - Minificación avanzada de JavaScript
- **PostCSS** - Procesamiento automático de CSS

## 📝 Características

- ✨ Diseño moderno y responsivo
- 🌓 Modo oscuro/claro
- 📱 Mobile-first
- ⚡ Carga rápida
- 🎨 Animaciones suaves
- 📊 Sistema de blog integrado

## 📄 Licencia

ISC © deeb STUDIO
