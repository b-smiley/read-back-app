# app.py
from flask import Flask, request, jsonify, app
from flask_cors import CORS
import os
import json
from cacheModule import get_cached_data, CACHE_FILE, add_to_cache
from glossaryModule import get_definition
from gpt_interaction import get_legal_explanation_and_usage

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return jsonify(message="Hello from Flask!")

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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
