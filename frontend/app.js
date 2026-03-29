const API_URL = "https://barberia-api-zdjb.onrender.com";

const form = document.getElementById("formTurno");
const mensaje = document.getElementById("mensaje");

let horaSeleccionada = "";

/* -----------------------------
   CARGAR TURNOS
------------------------------*/
async function cargarTurnos() {
  try {
    mensaje.textContent = "Cargando...";

    const res = await fetch(`${API_URL}/turnos`);
    const data = await res.json();

    const turnos = Array.isArray(data) ? data : data.turnos;

    if (!Array.isArray(turnos)) {
      throw new Error("Formato de API inválido");
    }

    const lista = document.getElementById("listaTurnos");
    lista.innerHTML = "";

    turnos.forEach((turno) => {
      const li = document.createElement("li");

      li.innerHTML = `
        ${turno.cliente ?? "Sin nombre"} - ${turno.fecha ?? ""} ${turno.hora ?? ""}
        <button onclick="eliminarTurno(${turno.id})">Eliminar</button>
      `;

      lista.appendChild(li);
    });

    mensaje.textContent = "";

  } catch (err) {
    console.error(err);
    mensaje.textContent = "❌ Error cargando turnos";
  }
}

/* -----------------------------
   VALIDAR DUPLICADOS
------------------------------*/
async function turnoOcupado(fecha, hora) {
  const res = await fetch(`${API_URL}/turnos`);
  const data = await res.json();

  const turnos = Array.isArray(data) ? data : data.turnos;

  return turnos.some(
    t => t.fecha === fecha && t.hora === hora
  );
}

/* -----------------------------
   CREAR TURNO
------------------------------*/
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    mensaje.textContent = "Guardando...";

    const fecha = document.getElementById("fecha").value;
    const hora = horaSeleccionada;

    if (!hora) {
      mensaje.textContent = "❌ Seleccioná un horario";
      return;
    }

    if (await turnoOcupado(fecha, hora)) {
      mensaje.textContent = "❌ Ese horario ya está ocupado";
      return;
    }

    const turno = {
      cliente: document.getElementById("cliente").value,
      fecha,
      hora
    };

    const res = await fetch(`${API_URL}/turnos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(turno)
    });

    const data = await res.json();

    mensaje.textContent = res.ok
      ? "✅ " + (data.mensaje ?? "Turno creado")
      : "❌ " + (data.error ?? "Error");

    await cargarTurnos();

  } catch (err) {
    console.error(err);
    mensaje.textContent = "❌ Error creando turno";
  }
});

/* -----------------------------
   ELIMINAR TURNO
------------------------------*/
async function eliminarTurno(id) {
  await fetch(`${API_URL}/turnos/${id}`, {
    method: "DELETE"
  });

  cargarTurnos();
}

/* -----------------------------
   HORARIOS
------------------------------*/
function generarHorarios() {
  const contenedor = document.getElementById("horarios");
  contenedor.innerHTML = "";

  const horas = [
    "09:00","09:30","10:00","10:30",
    "11:00","11:30","12:00","12:30",
    "16:00","16:30","17:00","17:30",
    "18:00","18:30"
  ];

  horas.forEach(hora => {
    const btn = document.createElement("button");
    btn.textContent = hora;
    btn.classList.add("hora-btn");

    btn.addEventListener("click", () => {
      horaSeleccionada = hora;

      document.querySelectorAll(".hora-btn").forEach(b => {
        b.classList.remove("selected");
      });

      btn.classList.add("selected");
    });

    contenedor.appendChild(btn);
  });
}

/* -----------------------------
   BLOQUEO HORARIOS OCUPADOS
------------------------------*/
async function marcarHorariosOcupados() {
  const fecha = document.getElementById("fecha").value;
  if (!fecha) return;

  const res = await fetch(`${API_URL}/turnos`);
  const data = await res.json();

  const turnos = Array.isArray(data) ? data : data.turnos;

  const ocupados = turnos
    .filter(t => t.fecha === fecha)
    .map(t => t.hora);

  document.querySelectorAll(".hora-btn").forEach(btn => {
    const ocupado = ocupados.includes(btn.textContent);

    btn.disabled = ocupado;
    btn.style.backgroundColor = ocupado ? "#ccc" : "";
  });
}

/* -----------------------------
   EVENTOS
------------------------------*/
document.getElementById("fecha").addEventListener("change", () => {
  generarHorarios();
  marcarHorariosOcupados();
});

/* -----------------------------
   INIT SEGURO
------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
  generarHorarios();
  cargarTurnos();

  setInterval(cargarTurnos, 10000);
});
