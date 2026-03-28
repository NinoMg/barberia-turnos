from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

turnos = []

@app.route("/")
def home():
    return "API Barbería funcionando"

@app.route("/turnos", methods=["GET"])
def obtener_turnos():
    return jsonify(turnos)

@app.route("/turnos", methods=["POST"])
def crear_turno():
    data = request.json

    if not data:
        return jsonify({"error": "Datos inválidos"}), 400

    # Evitar doble turno
    for turno in turnos:
        if turno["fecha"] == data["fecha"] and turno["hora"] == data["hora"]:
            return jsonify({"error": "Horario no disponible"}), 400

    turnos.append(data)
    return jsonify({"mensaje": "Turno reservado"}), 201


# 🔥 NUEVO: eliminar turno
@app.route("/turnos/<int:index>", methods=["DELETE"])
def eliminar_turno(index):
    if index < 0 or index >= len(turnos):
        return jsonify({"error": "Turno no encontrado"}), 404

    turnos.pop(index)
    return jsonify({"mensaje": "Turno eliminado"})


if __name__ == "__main__":
    app.run(debug=True)
