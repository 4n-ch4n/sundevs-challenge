# Documento de Decisiones

Este documento detalla el análisis, arquitectura y las decisiones técnicas tomadas durante la resolución del reto "La Cartelera de Hype Tecnológico".

## 1. Enfoque general de la solución
El objetivo principal fue construir un flujo de datos limpio y eficiente. Se decidió que **el backend debe actuar como el cerebro de la aplicación**, procesando los datos crudos de YouTube, calculando fórmulas de negocio y ordenando los elementos. De este modo, **el frontend queda como una capa de presentación pura**, responsable únicamente de pintar la interfaz y manejar las interacciones del usuario. 

## 2. Decisiones técnicas principales

### Backend
- **Cálculo y Ordenamiento (Hype Level):** Se decidió calcular el 'Nivel de Hype' y ordenar todos los videos de mayor a menor *antes* de paginar. Esto garantiza que la "Joya de la Corona" sea matemáticamente precisa y el frontend reciba exactamente lo que debe mostrar con la mínima transformación posible.
- **Fechas Nativas (API `Intl`):** Para cumplir la restricción de no usar librerías externas de fechas, se investigó la suite global de objetos nativos en MDN (`Intl.RelativeTimeFormat`). Con base en esto, implementamos una utilidad estática re-utilizable a lo largo de toda la aplicación que calcula matemáticamente las diferencias de tiempo sin sobrecargar el bundle size.
- **Paginación:** Se implementó paginación escalable mediante los query params `limit` y `offset`. Esto optimiza la cantidad de datos enviados por la red y mejora drásticamente la experiencia de usuario (UX) asumiendo que el archivo o la base de datos podría crecer exponencialmente.

### Frontend
- **Vite y React Compiler:** Se optó por utilizar Vite como *bundler* ya que mejora drásticamente la experiencia de desarrollo (DX) con tiempos de carga y Hot Module Replacement (HMR) casi instantáneos. Además, se aprovechó la integración con **React Compiler**, el cual maneja la memoización automáticamente. Esto optimiza los re-renders de la aplicación de forma nativa sin necesidad de saturar el código con `useMemo` o `useCallback` manualmente.
- **React Router para Query Params:** Decidí usar React Router no solo para enrutamiento, sino para manejar el estado de la paginación directamente en la URL. Esto permite que si un usuario comparte la URL (ej. `?page=2`), la página cargue exactamente en los resultados que estaba viendo.
- **TanStack Query (React Query):** Elegí esta librería para la obtención de datos porque facilita enormemente el manejo de los estados asíncronos (`isLoading`, `isError`) y proporciona una capa de caché local casi gratuita, evitando re-peticiones innecesarias al servidor al volver a la página 1.

### DevOps y Contenedores
- **Orquestación con Docker:** Se decidió utilizar Docker y Docker Compose para asegurar que cualquier desarrollador (o evaluador) pueda levantar todo el stack (Frontend y Backend) con un único comando (`docker compose up --build`), garantizando un entorno idéntico sin importar el sistema operativo anfitrión.
- **Micro-optimización de Imágenes (Multi-stage Build):** Para los entornos de producción (`Dockerfile.prod`), se implementó el patrón de *Multi-stage building*. Esto asegura que la imagen final solo contenga el código compilado (`dist`) y las dependencias estrictamente necesarias (`production`), reduciendo drásticamente el peso de la imagen final y mejorando tiempos de despliegue y seguridad.

## 3. Organización del proyecto

### Patrón Repository (Backend)
Se implementó un `VideosRepository`. Esta capa aísla la técnica de obtención de datos (leer un archivo JSON usando `fs`) del `VideosService`. De esta manera, si la app necesita escalar y conectarse a PostgreSQL o MongoDB, el servicio no sufrirá ninguna alteración; solo se modificaría el repositorio.

### Arquitectura Feature-First (Frontend)
Se optó por una organización de archivos orientada a features (ej. agrupando componentes, hooks y páginas de contenido multimedia en la carpeta `src/videos/`). Esto permite que la base de código sea mucho más mantenible y fácil de escalar a medida que se agregan nuevas funcionalidades (ej. `auth/`, `payments/`).

### Estrategia de Testing (Critical Path)
El enfoque de pruebas unitarias giró exclusivamente en la **Ruta Crítica** (Reglas de negocio, cálculo de Hype y transformaciones de fechas). Por este motivo deliberado, no se probó el archivo de arranque `main.ts`, ya que en la ingeniería de software el mayor valor reside en testear la lógica que podría causar errores de negocio, no el bootstrapping del framework.

## 4. Supuestos o simplificaciones realizadas
- **Contenedores de Producción Frontend:** Para la imagen productiva (`Dockerfile.prod`) del frontend, decidí servir el contenido de la carpeta `/dist` empleando un servidor estático genérico de Node (`serve`). Esta es una simplificación intencional para la prueba: evita la complejidad innecesaria de agregar un contenedor `nginx` y archivos de configuración para el fallback de rutas, manteniendo el ecosistema de la app íntegramente en Node.js.

## 5. Problemas encontrados y cómo los resolviste
- **División por cero en el Hype:** Al implementar el cálculo de Hype, noté que un video con "0" vistas causaría que JavaScript devuelva un valor de `Infinity`. Se resolvió agregando una condición explícita para que si las `viewCount` son menores o iguales a cero, el nivel de Hype sea inmediatamente `0`, asegurando que la "Joya de la Corona" sea legítima.
- **Hot-Reload en contenedores Docker:** Hubo un conflicto inicial donde los volúmenes del Docker Compose mapeaban a `/app` pero el `WORKDIR` del Dockerfile miraba hacia `/usr/src/app`. Resolví esto unificando y sincronizando todas las configuraciones al directorio `/app`, permitiendo el reflejo instantáneo de los cambios al guardar.
- **Formateo de fechas relativas sin librerías:** El requerimiento estricto de no usar paquetes externos (como moment.js o date-fns) supuso un reto al tratar de construir cadenas amigables como "Hace 2 meses". Lo resolví descartando soluciones manuales frágiles y acudiendo a la documentación de MDN para estudiar e implementar [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat).
- **Caída de imágenes (Broken Images):** Al consumir el JSON estático, noté que kas URLs de las miniaturas (`thumbnails`) reportaban un error o no resolvían, rompiendo la estética de la tarjeta. Se solucionó capturando el evento `onError` en la etiqueta de la imagen, el cual reemplaza instantáneamente la fuente rota por un archivo `.svg` de `placeholder` local, protegiendo así la UX.

## 6. Prompts más relevantes utilizados (Herramientas de IA)

Para acelerar la creación de la interfaz de usuario, se utilizó **v0 de Vercel** para generar el maquetado inicial en React con Tailwind CSS. Sin embargo, el código generado era monolítico y altamente acoplado. Por tanto, se dedicó un esfuerzo significativo en refactorizar y dividir ese maquetado en componentes escalables, reutilizables y con interfaces TypeScript fuertemente tipadas (ej. separando `VideoCard`, `CustomPagination`, etc.).

**Prompt principal utilizado para el maquetado:**

> "Crea una interfaz de Video Dashboard en React utilizando Tailwind CSS y componentes de Lucide React. La aplicación debe consumir una API para mostrar una lista de videos con los siguientes requisitos:
> Layout de Grilla: Los videos deben mostrarse en un grid responsivo. Cada card de video debe incluir miniatura, título, y un contador de 'Hype'.
> La Joya de la Corona: Identifica el video con el valor de 'Hype' más alto en el array. Este video debe tener un diseño destacado.
> Estados de la UI:
> Loading: Implementa un estado de loading.
> Error: Implementa un estado de error.
> Paginación: Incluye un control de paginación funcional en la parte inferior con botones."
