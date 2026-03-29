const API_URL = "https://barberia-api-zdjb.onrender.com";   

const form = document.getElementById("formTurno");
const mensaje = document.getElementById("mensaje");

let horaSeleccionada = "";

// 🔹 Cargar turnos
async function cargarTurnos() {
  mensaje.textContent = "Cargando...";

  const res = await fetch(`${API_URL}/turnos`);
  const turnos = await res.json();

  const lista = document.getElementById("listaTurnos");
  lista.innerHTML = "";

  turnos.forEach((turno, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${turno.nombre} - ${turno.fecha} ${turno.hora}
<button onclick="eliminarTurno(${turno.id})">Eliminar</button>
    `;

    lista.appendChild(li);
  });

  mensaje.textContent = "";
}

// 🔥 NUEVO: bloquear horarios ocupados


// 🔥 VALIDACIÓN
async function turnoOcupado(fecha, hora) {
  const res = await fetch(`${API_URL}/turnos`);
  const turnos = await res.json();

  return turnos.some(turno => 
    turno.fecha === fecha && turno.hora === hora
  );
}

// 🔹 Crear turno
form.addEventListener("submit", async (e) => {
  e.preventDefault();

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
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(turno)
  });

  const data = await res.json();

  mensaje.textContent = res.ok 
    ? "✅ " + data.mensaje 
    : "❌ " + data.error;

  cargarTurnos();
});

// 🔹 Eliminar turno
async function eliminarTurno(id) {
  await fetch(`${API_URL}/turnos/${id}`, {
    method: "DELETE"
  });

  cargarTurnos();
}

function generarHorarios() {
  const contenedor = document.getElementById("horarios");
  contenedor.innerHTML = "";

  const horas = [
    "09:00", "09:30",
    "10:00", "10:30",
    "11:00", "11:30",
    "12:00", "12:30",
    "16:00", "16:30",
    "17:00", "17:30",
    "18:00", "18:30"
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

async function marcarHorariosOcupados() {
  const fecha = document.getElementById("fecha").value;
  if (!fecha) return;

  const res = await fetch(`${API_URL}/turnos`);
  const turnos = await res.json();

  const ocupados = turnos
    .filter(t => t.fecha === fecha)
    .map(t => t.hora);

  document.querySelectorAll(".hora-btn").forEach(btn => {
    if (ocupados.includes(btn.textContent)) {
      btn.disabled = true;
      btn.style.backgroundColor = "#ccc";
    } else {
      btn.disabled = false;
      btn.style.backgroundColor = "";
    }
  });
}

// 🔥 NUEVO: eventos de UX

document.getElementById("fecha").addEventListener("change", () => {
  generarHorarios();
  marcarHorariosOcupados();
});

// 🔹 Ejecutar al cargar
cargarTurnos();

generarHorarios();

// 🔥 EXTRA: refresco automático
setInterval(cargarTurnos, 10000);
