from flask import Flask, jsonify, Response, request
from flask_cors import CORS
import input_parser  # Import input_parser.py

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return jsonify(message="Hello from Flask!")


#?file=filename.txt  -- for passing in a specific text file to read.
@app.route('/stream')
def stream():
    # Get the file parameter from the query
    file_path = request.args.get('file')
    
    # Check if file parameter is provided
    if not file_path:
        return "Error: No file provided. Please provide a file parameter.", 400

    # Pass the file path to generate_words
    return Response(input_parser.generate_words(file_path), mimetype='text/event-stream')

@app.route('/saved_text')
def saved_text_route():
    # You can use the saved_text variable from input_parser.py as well
    return {'saved_text': ''.join(input_parser.saved_text)}  # Return all saved characters

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
