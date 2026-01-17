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

#### Desarrollo (con actualización automática)

```bash
npm run dev
# o
npm start
```

Inicia un servidor de desarrollo con **Vite** y **Hot Module Replacement (HMR)** en `http://localhost:3000`.

**✨ Características del modo desarrollo:**
- 🔥 **Actualización instantánea**: Los cambios en CSS se aplican sin recargar
- ⚡ **Recarga automática**: HTML y JS se actualizan al guardar
- 🚀 **Rápido**: Compilación ultra-rápida con Vite
- 🔧 **Source maps**: Debugging fácil con archivos originales

**💡 Workflow:**
1. Ejecuta `npm run dev` (deja el terminal abierto)
2. Abre http://localhost:3000 en tu navegador
3. Edita cualquier archivo (HTML, CSS, JS)
4. Guarda (Ctrl/Cmd + S)
5. Ve los cambios instantáneamente en el navegador

**🛑 Para detener:** Presiona `Ctrl + C` en el terminal

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

### 📊 Comparación de modos

| Modo | Actualización | Velocidad | Optimización | Uso |
|------|---------------|-----------|--------------|-----|
| **dev** | Automática ⚡ | Ultra-rápido | No | Desarrollo diario |
| **preview** | Manual 🔄 | Rápido | Sí ✅ | Testing pre-deploy |
| **build** | - | Medio | Sí ✅ | Deploy producción |

**Recomendación:** Usa `npm run dev` para desarrollo y `npm run build` solo cuando vayas a desplegar.

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
