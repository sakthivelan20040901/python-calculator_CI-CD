from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/recommend/<int:id>")
def recommend(id):

    recommendations = {
        1: ["Mouse", "Keyboard", "Monitor"],
        2: ["Laptop", "Mouse"],
        3: ["Laptop", "Keyboard"]
    }

    return jsonify({
        "product_id": id,
        "recommendations": recommendations.get(id, [])
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)