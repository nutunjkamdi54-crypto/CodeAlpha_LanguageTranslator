from flask import Flask, render_template, request, jsonify
from deep_translator import GoogleTranslator

app = Flask(__name__)

# =========================
# Home Route
# =========================

@app.route("/")
def home():
    return render_template("index.html")


# =========================
# Translation Route
# =========================

@app.route("/translate", methods=["POST"])
def translate():

    try:

        data = request.get_json()

        text = data.get("text", "").strip()
        src = data.get("src", "en")
        dest = data.get("dest", "hi")

        # Empty Input Check
        if not text:

            return jsonify({
                "success": False,
                "error": "No text provided."
            }), 400

        # Translation
        translated_text = GoogleTranslator(
            source=src,
            target=dest
        ).translate(text)

        return jsonify({

            "success": True,

            "translated_text": translated_text
        })

    except Exception as e:

        return jsonify({

            "success": False,

            "error": str(e)
        }), 500


# =========================
# Run App
# =========================

if __name__ == "__main__":

    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )
