const form = document.getElementById("formTurno");
const mensaje = document.getElementById("mensaje");

// 🔹 Cargar turnos
async function cargarTurnos() {
  const res = await fetch("http://127.0.0.1:5000/turnos");
  const turnos = await res.json();

  const lista = document.getElementById("listaTurnos");
  lista.innerHTML = "";

  turnos.forEach((turno, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${turno.cliente} - ${turno.fecha} ${turno.hora}
      <button onclick="eliminarTurno(${index})">Eliminar</button>
    `;

    lista.appendChild(li);
  });
}

//3. 🔥 FUNCIÓN turnoOcupado
async function turnoOcupado(fecha, hora) {
  const res = await fetch("http://127.0.0.1:5000/turnos");
  const turnos = await res.json();

  return turnos.some(turno => 
    turno.fecha === fecha && turno.hora === hora
  );
}

// 🔹 Crear turno
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;

  // 🔥 VALIDACIÓN FRONTEND
  if (await turnoOcupado(fecha, hora)) {
    mensaje.textContent = "Ese horario ya está ocupado";
    return;
  }

  const turno = {
    cliente: document.getElementById("cliente").value,
    fecha,
    hora
  };

  const res = await fetch("http://127.0.0.1:5000/turnos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(turno)
  });

  const data = await res.json();

if (!res.ok) {
  mensaje.textContent = data.error;
} else {
  mensaje.textContent = data.mensaje;
}

  cargarTurnos();
});

// 🔹 Eliminar turno
async function eliminarTurno(index) {
  await fetch(`http://127.0.0.1:5000/turnos/${index}`, {
    method: "DELETE"
  });

  cargarTurnos();
}

// 🔹 Ejecutar al cargar
cargarTurnos();
