
from flask import Flask, jsonify, Response, request, app
from flask_cors import CORS
import input_parser  # Import input_parser.py
# app.pyp
import os
import json
from flask_cors import CORS
from cacheModule import get_cached_data, add_to_cache, CACHE_FILE
from gpt_interaction import get_legal_explanation_and_usage
from glossaryModule import get_definition

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
    return input_parser.saved_text  # Return all saved characters
=======
@app.route('/api/get_gpt_response/<string:term>', methods=['GET'])
def get_gpt_response(term):
    try:
        termJSON = get_cached_data(term)
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
    if termJSON:
        #term in cache
        return jsonify({"source":"cache","data": termJSON}), 200
    #term not in cache
    
    #find definition
    definition = get_definition(term)
    if definition == None:
        return jsonify({"message": "Term not found"}), 400
    #generate response  
    new_entry = get_legal_explanation_and_usage(term, definition)
    #add to cache
    add_to_cache(term, new_entry)

    return jsonify({"source":"request", "data": new_entry}), 200


@app.route('/api/clear_cache', methods=['POST'])
def clear_cache():
    try:
        with open(CACHE_FILE, 'w') as file:
            json.dump({}, file) #write an empty file to the cache location
        return jsonify({"message": "Cache cleared"}), 200
    except:
        return jsonify({"message": "Couldn't open file"}), 400
    

@app.route('/api/get_definition_api/<string:term>', methods=['GET'])
def get_definition_api(term):
    try:
        #returns string containing definition
        definition = get_definition(term)
        if definition == None:
            return jsonify({"message": "Term not in glossary"}), 400
        return jsonify({"message": definition}), 200
    except:
        return jsonify({"message": "Couldn't open file"}), 400

@app.route('/api/generate_text_to_speech/<string:text>', methods=['GET'])
def generate_text_to_speech(text):
    try:
        return
    except:
        return
 
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
