# Proyecto E-Commerce [Nombre del Proyecto]

Bienvenido al frontend del proyecto de e-commerce. Esta aplicación está construida con React, TypeScript y Tailwind, enfocada en un alto rendimiento y una experiencia de usuario fluida.

## 🚀 Primeros Pasos

Sigue estos pasos para configurar y correr el proyecto en tu entorno local.

### Prerrequisitos

Asegúrate de tener instalado:

- Node.js (v18 o superior recomendado)
- `npm` (o `yarn` / `pnpm`)

### Instalación

1.  **Clonar el repositorio:**

    ```bash
    git clone [URL_DEL_REPOSITORIO]
    cd [NOMBRE_DEL_PROYECTO]
    ```

2.  **Instalar dependencias:**
    Este comando leerá el archivo `package.json` e instalará todas las librerías necesarias.

    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz del proyecto(saltate esto, aun no lo tengo), copiando el ejemplo:
    ```bash
    cp .env.example .env
    ```
    Ahora, edita el archivo `.env` y añade las claves de API necesarias (como la URL de la API del backend, claves de autenticación, etc.).
    ```
    # Ejemplo de .env
    VITE_API_URL="http://localhost:4000/api"
    ```

### Ejecución de la App

Para iniciar el servidor de desarrollo (con hot-reloading):

```bash
npm run dev
```

La aplicación estará disponible en http://localhost:5173 (o el puerto que indique la terminal).

## 📁 Estructura del Proyecto

El proyecto sigue una arquitectura modular para separar responsabilidades.

```
/
├── public/               # Archivos estáticos (imágenes, favicons)
├── src/
│   ├── assets/           # Imágenes, SVGs, fuentes
│   ├── components/
│   │   ├── ui/           # Componentes de Shadcn UI (Button, Card, etc.)
│   │   └── common/       # Componentes reutilizables (Navbar, Footer, ProductCard)
│   ├── hooks/            # Custom Hooks (ej. useAuth, useCart)
│   ├── interfaces/       # (¡Importante!) Definiciones de TypeScript (.ts)
│   ├── lib/              # Funciones de utilidad (ej. utils.ts, cn.ts)
│   ├── pages/            # Vistas principales (HomePage, LoginPage, ProductPage)
│   ├── services/         # Lógica de API (instancia de Axios, endpoints)
│   ├── store/            # (Opcional) Estado global (Zustand, Context)
│   ├── EccomerceApp.tsx  # Componente raíz
│   └── main.tsx          # Punto de entrada de la aplicación
├── .env                  # Variables de entorno (¡Ignorado por Git!)
├── .env.example          # Ejemplo de variables de entorno
├── index.html            # Plantilla HTML
├── package.json          # Lista de dependencias y scripts
├── tailwind.config.js    # Configuración de Tailwind CSS
└── tsconfig.json         # Configuración de TypeScript
```

## 💎 Convenciones de Nomenclatura

Para mantener el código limpio y predecible:

Carpetas: kebab-case (ej. product-list).

Componentes: PascalCase (ej. ProductCard.tsx).

Páginas: PascalCase con sufijo Page (ej. HomePage.tsx).

Hooks: camelCase con prefijo use (ej. useAuth.ts).

Interfaces: PascalCase (ej. User.ts o Product.ts) y deben vivir en la carpeta src/interfaces/.

Tipos de Archivo:

.tsx: Para archivos que contienen JSX (Componentes, Páginas).

.ts: Para lógica pura (hooks, servicios, utils, interfaces).

## 📦 Dependencias Principales

Esta es la lista del stack tecnológico y lo que hace cada librería:

| Tecnología           | Descripción                                                                                         |
| :------------------- | :-------------------------------------------------------------------------------------------------- |
| **React**            | Librería principal para construir la interfaz de usuario.                                           |
| **TypeScript**       | Añade tipado estático a JavaScript para prevenir errores.                                           |
| **Vite**             | Herramienta de bundling y servidor de desarrollo ultra-rápido.                                      |
| **Tailwind CSS**     | Framework de CSS utility-first para diseño rápido y responsivo.                                     |
| **Shadcn UI**        | Colección de componentes de UI accesibles y personalizables (usa Radix + Tailwind).                 |
| **TanStack Query**   | (React Query) Gestión de estado del servidor: caching, fetching y actualización de datos de la API. |
| **Axios**            | Cliente HTTP para realizar peticiones a nuestro backend (MongoDB/Express).                          |
| **React Router DOM** | Para manejar la navegación y las rutas de la aplicación (ej. /, /login).                            |
| **Sonner**           | Librería de notificaciones (toasts) elegante y simple (integrada con Shadcn).                       |
| **Lucide React**     | Librería de iconos utilizada por Shadcn.                                                            |

## ✨ Buenas practicas

| Categoría                | Puntos Clave                                                                                                                                                                                          |
| :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **✨ Optimización**      | <ul><li>Usar `React.lazy()` para carga perezosa.</li><li>Implementar `debounce` en búsquedas para no saturar la API.</li><li>Aprovechar el caché de **TanStack Query** y del navegador.</li></ul>     |
| **💾 Gestión de Estado** | <ul><li>Usar **TanStack Query** para todo el estado del servidor (productos, historial).</li><li>Usar `useState` o stores ligeros (Zustand/Context) para estado de UI (ej. "menú abierto").</li></ul> |
| **🧠 Memoria**           | <ul><li>Limpiar efectos (`useEffect`) con suscripciones en la función de retorno para evitar fugas de memoria.</li></ul>                                                                              |
