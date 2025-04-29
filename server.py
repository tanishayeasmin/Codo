from flask import Flask, request, jsonify
import ollama

app = Flask(__name__)

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")
    
    try:
        response = ollama.chat("mistral", user_message)
        return jsonify({"response": response["message"]})  # Ensure correct JSON key
    except Exception as e:
        return jsonify({"response": f"Error: {str(e)}"})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
