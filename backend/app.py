from flask import Flask, jsonify, Response
from flask_cors import CORS
import time
import input_parser  # Import input_parser.py

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return jsonify(message="Hello from Flask!")

@app.route('/stream')
def stream():
    # Use the generate_words function from input_parser.py
    return Response(input_parser.generate_words(), mimetype='text/event-stream')

@app.route('/saved_text')
def saved_text_route():
    # You can use the saved_text variable from input_parser.py as well
    return {'saved_text': ''.join(input_parser.saved_text)}  # Return all saved characters

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
