🪒 Barber Turnos — Sistema de gestión de turnos para barbería

Sistema web full-stack para la gestión de turnos en barberías, diseñado para optimizar la reserva de horarios y evitar conflictos de disponibilidad en tiempo real.

🚀 Demo

Frontend: https://tu-github-pages-link

Backend API: https://tu-render-app.onrender.com

📌 Características principales
Creación de turnos con validación de horarios disponibles
Listado dinámico de turnos en tiempo real
Eliminación de turnos
Prevención de turnos duplicados (reglas en backend)
Interfaz interactiva de selección de horarios
Comunicación frontend/backend vía API REST
🧠 Arquitectura del sistema

El proyecto está separado en dos capas:

Frontend
HTML5 + CSS3 + JavaScript vanilla
Consumo de API REST mediante fetch
UI dinámica sin frameworks
Manejo de estado básico en cliente
Backend
Python + Flask
API REST estructurada
Validaciones de negocio en servidor
Conexión con base de datos PostgreSQL (Supabase)
Base de datos
Supabase (PostgreSQL)
Persistencia de turnos
Control de integridad de datos
🔗 Endpoints principales
POST /turnos → Crear turno
GET /turnos → Listar turnos
DELETE /turnos/<id> → Eliminar turno
⚙️ Decisiones técnicas
Separación frontend/backend para escalabilidad
Validación de duplicados en backend (regla de negocio centralizada)
API REST stateless para facilitar deploy y consumo externo
Uso de Supabase como backend gestionado para acelerar desarrollo y despliegue
📦 Tecnologías
HTML, CSS, JavaScript
Python, Flask
PostgreSQL (Supabase)
Render (backend deploy)
GitHub Pages (frontend deploy)
🎯 Objetivo del proyecto

Simular un sistema real de gestión de turnos utilizado en negocios de servicios, priorizando:

Integridad de datos
Experiencia de usuario simple
Arquitectura escalable básica
📷 Capturas



📌 Estado del proyecto

✔ Funcional
✔ Desplegado
🔄 En mejora continua (UI/UX + validaciones avanzadas)
