# La Cartelera de Hype Tecnológico - Prueba Técnica SunDevs

![Tests passed](https://img.shields.io/badge/tests-passing-brightgreen) ![Coverage 82%](https://img.shields.io/badge/coverage-82%25-yellowgreen)

Una aplicación Fullstack construida con **NestJS** y **React (Vite)** para procesar y visualizar un listado de videos extraídos de la API de YouTube. La aplicación calcula un "Nivel de Hype" personalizado para cada video y destaca visualmente a la "Joya de la Corona" (el video con mayor hype).

## Tecnologías Principales

- **Backend:** NestJS, TypeScript, Jest (Unit Testing), Swagger (OpenAPI).
- **Frontend:** React, Vite, TypeScript, Tailwind, Shadcn, TanStack Query, React Router.
- **DevOps:** Docker, Docker Compose.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v22 o superior recomendado)
- [pnpm](https://pnpm.io/) o npm
- [Docker](https://www.docker.com/) (opcional pero recomendado)

---

## Levantar el proyecto con Docker (Recomendado)

La forma más fácil y rápida de ejecutar ambas aplicaciones con Hot Reload es utilizando Docker Compose.

1. Clona el repositorio y ve a la carpeta raíz.
2. Ejecuta el siguiente comando:
   ```bash
   docker compose up --build
   ```
3. La aplicación estará disponible en:
   - **Frontend:** [http://localhost:5173](http://localhost:5173)
   - **Backend (API):** [http://localhost:3000/api/videos](http://localhost:3000/api/videos)
   - **Swagger (Documentación):** [http://localhost:3000/api](http://localhost:3000/api)

---

## Ejecución Manual Local (Sin Docker)

Si prefieres ejecutar los proyectos de forma local e independiente en tu máquina, sigue estos pasos:

### 1. Backend

Abre una terminal y navega a la carpeta del backend:

```bash
cd backend
```

Instala las dependencias (se recomienda pnpm, pero npm también es válido):

```bash
pnpm install
```

Inicia el servidor en modo desarrollo:

```bash
pnpm start:dev
```

_El backend se ejecutará en http://localhost:3000._

### 2. Frontend

Abre otra terminal y navega a la carpeta del frontend:

```bash
cd frontend
```

Renombra el archivo `.env.template` a `.env` para tener las variables de entorno y configuralas según necesites. Instala dependencias:

```bash
pnpm install
```

Inicia el servidor de desarrollo:

```bash
pnpm dev
```

_El frontend se ejecutará en http://localhost:5173._

---

## Testing

El proyecto cuenta con pruebas automatizadas enfocadas en las reglas de negocio críticas del lado del servidor (Cálculo de Hype y Formateo Nativo de Fechas).

Para ejecutar los tests del backend y verificar la cobertura:

```bash
cd backend
pnpm test:cov
```

---
