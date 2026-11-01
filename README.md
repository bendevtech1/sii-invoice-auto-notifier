# SII Invoice Auto-Notifier (Dashboard & Batch Processing)

Dashboard interactivo para la simulación y automatización del procesamiento en lote de facturas electrónicas e integración visual de notificaciones recurrentes orientadas al ecosistema tributario chileno.

---

## Características Principales
* **Worker Asíncrono en Lote (Backend):** Simula la ejecución de tareas en segundo plano para procesar colas de facturas de forma concurrente sin bloquear la aplicación.
* **Interfaz Dinámica con Transiciones (Frontend):** Construida en React utilizando **Framer Motion** para animar en tiempo real los cambios de estado (*Pendiente ➔ Procesando ➔ Enviado*).
* **Control de Estados REST API:** Endpoints modularizados en Express para consultar, disparar lotes y reiniciar las colas de pruebas.

---

## Tecnologías Utilizadas
* **Frontend:** React, Vite, Framer Motion, Lucide React.
* **Backend:** Node.js, Express, CORS.
* **Estilos:** Custom CSS3 (Glassmorphism & Contrast Neon Theme).
