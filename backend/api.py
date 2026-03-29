from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

SUPABASE_URL = "https://qfrtoyfzzaqvaklslvay.supabase.co"
SUPABASE_KEY = "sb_publishable_wd2RtizLzcf52BEjDpnrMw_T-9ECZTP"

headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
    "Accept": "application/json"
}

app = Flask(__name__)

CORS(app)

@app.route("/")
def home():
    return "API Barbería funcionando con Supabase"

@app.route("/turnos", methods=["GET"])
def obtener_turnos():
    res = requests.get(f"{SUPABASE_URL}/rest/v1/turnos", headers=headers)
    return jsonify(res.json())

@app.route("/turnos", methods=["POST"])
def crear_turno():
    data = request.json

    if not data:
        return jsonify({"error": "Datos inválidos"}), 400

    params = {
        "fecha": f"eq.{data['fecha']}",
        "hora": f"eq.{data['hora']}"
    }

    check = requests.get(
        f"{SUPABASE_URL}/rest/v1/turnos",
        headers=headers,
        @app.route("/turnos", methods=["POST"])
def crear_turno():
    data = request.json

    if not data:
        return jsonify({"error": "Datos inválidos"}), 400

    params = {
        "fecha": f"eq.{data['fecha']}",
        "hora": f"eq.{data['hora']}"
    }

    check = requests.get(
        f"{SUPABASE_URL}/rest/v1/turnos",
        headers=headers,
        params=params
    )

    if len(check.json()) > 0:
        return jsonify({"error": "Horario no disponible"}), 400

    # 🔥 CAPTURAR RESPUESTA REAL
    res = requests.post(
        f"{SUPABASE_URL}/rest/v1/turnos",
        json=data,
        headers=headers
    )

    print("SUPABASE STATUS:", res.status_code)
    print("SUPABASE RESPUESTA:", res.text)

    return jsonify({
        "mensaje": "Turno reservado",
        "supabase_status": res.status_code,
        "supabase_response": res.text
    }), 201

@app.route("/turnos/<int:id>", methods=["DELETE"])
def eliminar_turno(id):
    requests.delete(
        f"{SUPABASE_URL}/rest/v1/turnos?id=eq.{id}",
        headers=headers
    )

    return jsonify({"mensaje": "Turno eliminado"})

@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "https://ninomg.github.io")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS")
    return response

@app.route("/turnos", methods=["OPTIONS"])
def turnos_options():
    return '', 200

if __name__ == "__main__":
    app.run(debug=True)
