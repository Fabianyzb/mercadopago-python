from flask import Flask, jsonify, request
import mercadopago

app = Flask(__name__)

# Reemplaza "YOUR_ACCESS_TOKEN" con tu token de acceso real
sdk = mercadopago.SDK("TEST-5362043136621882-120602-e9695a62863efd435b6d259cc09a8231-117811692")

@app.route("/")
def index():
    return "El servidor de Mercado Pago con Python funciona!!"

@app.route("/create_preference", methods=["POST"])
def create_preference():
    try:
        description = request.json["description"]
        price = float(request.json["price"])
        quantity = int(request.json["quantity"])

        preference_data = {
            "items": [
                {"title": description, "unit_price": price, "quantity": quantity}
            ],
            "back_urls": {
                "success": "http://localhost:5173/",
                "failure": "http://localhost:5173/",
                "pending": "",
            },
            "auto_return": "approved",
        }

        result = sdk.preference().create(preference_data)
        preference_id = result["response"]["id"]

        return jsonify({"id": preference_id})

    except Exception as e:
        print(str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=4444)
