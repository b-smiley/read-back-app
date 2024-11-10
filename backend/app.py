
# app.py
from flask import Flask, Response, request, jsonify, app, send_from_directory

from flask_cors import CORS
import input_parser  # Import input_parser.py
# app.pyp
import os
import json
from flask_cors import CORS
from cacheModule import get_cached_data, add_to_cache, CACHE_FILE
from gpt_interaction import get_legal_explanation_and_usage
from glossaryModule import get_definition
from elevenLabModule import get_mp3_file
import traceback
import requests

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

@app.route('/names', methods=['GET'])
def send_names():
    try:
        # Open and read the JSON file (make sure it's a valid JSON file)
        with open('./data/actors.json', 'r') as file:
            data = json.load(file)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/person', methods=['GET'])
def send_person():
    try:
        # Get the string input from the query parameters (e.g., ?name=John)
        person_name = request.args.get('name')  # or you can use request.json if it's a POST with a body

        if not person_name:
            return jsonify({"error": "No name provided"}), 400

        # Open and read the JSON file
        with open('./data/actors.java', 'r') as file:
            data = json.load(file)

        # Assuming the data is a list of dictionaries and each dictionary has a 'name' field
        # Find the matching person in the JSON data based on the string input
        person_data = next((person for person in data if person.get('name') == person_name), None)

        if person_data:
            return jsonify(person_data)
        else:
            return jsonify({"error": "Person not found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

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
    print("Clearing Cache")
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
        sound_file_path = get_mp3_file(text)
        return send_from_directory(sound_file_path[0], sound_file_path[1])

    except Exception:
        return jsonify({"message": traceback.format_exc()}), 400


IMAGE_FOLDER = './data/images/'
IMAGE_DESCRIPTIONS = './data/images/imageDescriptions.json'
@app.route('/api/get_images', methods=['GET'])
def get_images():
    #returns filenames for each image
    with open(IMAGE_DESCRIPTIONS, 'r') as file:
        imageDict = json.load(file)
    return imageDict

@app.route('/api/get_image/<string:filename>', methods=['GET'])
def get_image(filename):
    #returns the image object
    return send_from_directory(IMAGE_FOLDER, filename)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
