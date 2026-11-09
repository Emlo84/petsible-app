# 🐾 Pet-sible - Red de Adopción Responsable (Bogotá)

Pet-sible es una plataforma web moderna diseñada para transformar y simplificar el proceso de adopción de animales rescatados en Bogotá D.C. A través de un **algoritmo de compatibilidad y afinidad**, conecta a los adoptantes con mascotas que se ajustan verdaderamente a su estilo de vida, espacio y disponibilidad de tiempo, reduciendo a cero las tasas de devolución y promoviendo el bienestar animal.

---

## 🚀 Características Principales

- **Algoritmo de Match y Afinidad:** Filtra mascotas compatibles según el tipo de vivienda (apartamento pequeño/grande, casa con/sin patio), tiempo libre diario y convivencia con niños u otras mascotas.
- **Catálogo Interactivo de Mascotas:** Tarjetas visuales completas con información de energía, tamaño, vacunas, esterilización y refugio de origen.
- **Red de Refugios Aliados:** Directorio y modal interactivo con información de fundaciones y refugios auditados bajo protocolos de bienestar animal distrital.
- **Agendamiento de Visitas:** Sistema de reserva de citas para conocer a la mascota con validación estricta para evitar colisiones o cruces de horarios.
- **Autenticación Segura con Supabase:** Registro e inicio de sesión seguro con cifrado de contraseñas, persistencia de sesión y soporte para perfiles de adoptante.
- **Diseño Editorial y Accesible:** Interfaz adaptable a móviles, tabletas y computadores desarrollada con Tailwind CSS v4 y Material Symbols.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Empaquetador y Servidor Local:** [Vite 8](https://vitejs.dev/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend & Autenticación:** [Supabase](https://supabase.com/) (`@supabase/supabase-js`)
- **Linter & Calidad de Código:** [Oxlint](https://oxc.rs/)

---

## 📋 Requisitos Previos

Asegúrate de tener instalado en tu equipo:

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- [npm](https://www.npmjs.com/) (incluido con Node.js)
- [Git](https://git-scm.com/)

---

## ⚙️ Instalación y Configuración Local

Sigue estos pasos para correr el proyecto en tu máquina local:

### 1. Clonar el repositorio

```bash
git clone https://github.com/Emlo84/petsible-app.git
cd petsible-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto tomando como base el archivo `.env.example`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-llave-anonima-publica
```

> ⚠️ **Importante:** El archivo `.env` contiene llaves de acceso y está protegido en `.gitignore`. Nunca lo compartas ni lo subas a repositorios públicos.

---

## 🔐 Configuración de Autenticación en Supabase

Para una experiencia óptima de pruebas en desarrollo local:

1. Ve a tu proyecto en el **[Panel de Supabase](https://supabase.com/dashboard)**.
2. Ingresa a **Authentication** $\rightarrow$ **Providers** $\rightarrow$ **Email**.
3. **Para desarrollo y pruebas rápidas:** Puedes desactivar la opción **"Confirm email"** si deseas que los usuarios recién registrados puedan iniciar sesión inmediatamente sin necesidad de verificar su bandeja de entrada.
4. **Si mantienes la confirmación activa:** Los usuarios deberán abrir el enlace enviado a su correo antes de ingresar, o puedes confirmarlos manualmente en **Authentication** $\rightarrow$ **Users** $\rightarrow$ **Confirm user**.

---

## 💻 Scripts Disponibles

En la raíz del proyecto puedes ejecutar:

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local (usualmente en `http://localhost:5173`). |
| `npm run build` | Compila TypeScript y genera los archivos optimizados para producción en la carpeta `dist`. |
| `npm run preview` | Permite previsualizar localmente la versión compilada de producción. |
| `npm run lint` | Ejecuta el análisis estático de código con Oxlint. |

---

## 🚀 Despliegue en Vercel

El proyecto está preparado para desplegarse fácilmente en **[Vercel](https://vercel.com/)**:

1. Inicia sesión en Vercel y conecta tu cuenta de GitHub.
2. Haz clic en **"Add New Project"** e importa el repositorio `petsible-app`.
3. Vercel detectará automáticamente que es un proyecto **Vite**.
4. En la sección **Environment Variables**, añade:
   - `VITE_SUPABASE_URL`: La URL de tu proyecto en Supabase.
   - `VITE_SUPABASE_ANON_KEY`: La llave anónima pública de tu proyecto.
5. Haz clic en **Deploy**.
6. El archivo [`vercel.json`](./vercel.json) incluido en el proyecto garantiza que las rutas de la aplicación de una sola página (SPA) funcionen sin errores 404 al recargar el navegador.

---

## 📁 Estructura del Proyecto

```text
petsible-app/
├── public/                 # Archivos estáticos públicos
├── src/
│   ├── assets/             # Imágenes y vectores
│   ├── components/
│   │   ├── appointments/   # Modal de agendamiento de visitas
│   │   ├── auth/           # Formularios de login y registro (+18, Habeas Data)
│   │   ├── catalog/        # Catálogo, tarjetas de mascotas y filtros traducidos
│   │   ├── home/           # Sección Hero principal
│   │   ├── layout/         # Barra de navegación (Navbar) y pie de página (Footer)
│   │   └── shelters/       # Modal informativo de la red de refugios aliados
│   ├── config/             # Validación y carga de variables de entorno
│   ├── data/               # Datos mock de refugios, mascotas y perfil base
│   ├── services/
│   │   ├── supabase/       # Servicios de autenticación, mascotas y citas
│   │   └── supabaseClient.ts # Inicialización del cliente Supabase
│   ├── types/              # Definiciones de tipos TypeScript (pet, user, etc.)
│   ├── utils/              # Algoritmo de afinidad y utilidades
│   ├── App.tsx             # Componente raíz de la aplicación
│   ├── index.css           # Configuración de Tailwind CSS y estilos globales
│   └── main.tsx            # Punto de entrada de React
├── .env.example            # Plantilla de variables de entorno
├── .gitignore              # Archivos y carpetas excluidos del control de versiones
├── vercel.json             # Configuración de redirecciones para Vercel SPA
├── package.json            # Dependencias y scripts del proyecto
└── README.md               # Documentación general del proyecto
```

---

## 📄 Licencia y Marco Legal

Este proyecto promueve la adopción ética y responsable en Bogotá D.C., en cumplimiento de la **Ley 1581 de 2012** (Protección de Datos Personales en Colombia) y bajo los lineamientos distritales de bienestar y protección animal.
