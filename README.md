# 💈 Sistema de Gestión de Turnos – Barbería

Aplicación web full stack para la gestión de turnos en una barbería, diseñada para resolver un problema real: organización de horarios y evitar conflictos de reservas.

## 🚀 Demo
Frontend: https://ninomg.github.io/barberia-turnos-frontend/  
API: https://barberia-api-zdjb.onrender.com/turnos  

---

## 🧠 Problema que resuelve
- Evita turnos duplicados
- Mejora la organización del negocio
- Permite gestión simple de reservas sin intervención manual

---

## 🛠 Stack Tecnológico

- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Backend:** Python + Flask (API REST)
- **Base de datos:** Supabase (PostgreSQL)
- **Deploy:** Render (backend) + GitHub Pages (frontend)

---

## ⚙️ Funcionalidades

- Crear turnos
- Listar turnos en tiempo real
- Eliminar turnos
- Validación de horarios duplicados
- Bloqueo dinámico de horarios ocupados
- Actualización automática (polling)

---

## 🔌 Arquitectura

Frontend desacoplado consumiendo API REST:

Frontend (GitHub Pages)
↓
API REST (Flask en Render)
↓
Base de datos (Supabase)


---

## 🧪 Desafíos técnicos resueltos

- Implementación de CORS en entorno productivo
- Manejo de estados asíncronos con fetch
- Integración con API externa (Supabase REST)
- Validación de consistencia de datos (turnos únicos)
- Debugging en entorno real (deploy + red)

---

## 📌 Próximas mejoras

- Autenticación de usuarios
- Panel de administración
- Notificaciones
- Mejora de UX/UI

---

## 💼 Autor

Nino – Desarrollador Web Junior  
