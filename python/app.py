from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({
        "service":"Python",
        "status":"healthy"
    })

@app.route("/calculate/<int:a>/<int:b>")
def calculate(a,b):
    return jsonify({
        "sum":a+b,
        "difference":a-b,
        "product":a*b
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000)