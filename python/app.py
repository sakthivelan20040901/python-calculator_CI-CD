from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/recommend/<int:id>")
def recommend(id):

    recommendations = {

    1: ["Mouse", "Keyboard", "Monitor"],
    2: ["Laptop", "Keyboard", "Monitor"],
    3: ["Laptop", "Mouse", "Monitor"],
    4: ["Laptop", "Webcam", "Keyboard"],
    5: ["Power Bank", "Earbuds", "Tablet"],
    6: ["Phone", "Headphones", "Power Bank"],
    7: ["Speaker", "Phone", "Tablet"],
    8: ["Headphones", "Earbuds", "Phone"],
    9: ["Monitor", "Laptop", "Keyboard"],

    10: ["Jeans", "Shoes", "Watch"],
    11: ["Shirt", "Shoes", "Watch"],
    12: ["Jeans", "Shirt", "Watch"],
    13: ["Shirt", "Shoes", "Jeans"],

    14: ["Python Crash Course", "Spring Boot Guide"],
    15: ["Docker Deep Dive", "AWS Cookbook"],
    16: ["Java Programming", "Go Programming"],
    26: ["Kubernetes Up & Running", "AWS Cookbook"],
    27: ["Docker Deep Dive", "AWS Cookbook"],
    28: ["Docker Deep Dive", "DevOps Handbook"],
    29: ["Java Programming", "Spring Boot Guide"],
    30: ["Python Crash Course", "Java Programming"]
}

    return jsonify({
        "product_id": id,
        "recommendations": recommendations.get(id, [])
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)