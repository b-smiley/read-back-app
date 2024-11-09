# app.py
from flask import Flask, request, jsonify, app
from gpt_interaction import get_legal_explanation_and_usage
import os
import json

app = Flask(__name__)

@app.route('/')
def hello():
    return jsonify(message="Hello from Flask!")

CACHE_FILE = './data/termsUsageExplanations.json'
DEFINITION_FILE = './data/termsGlossary.json'

def load_cache():
    # load the cache on the machine
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, 'r') as file:
            return json.load(file)
    return {}

def save_cache(cache_data):
    # update the cache with a new version
    with open(CACHE_FILE, 'w') as file:
        json.dump(cache_data, file)

def get_cached_data(term):
    '''
    Checks if a term is in the cache and returns its JSON data if it is

    args:
        term (str): the legal term to be checked

    returns:
        JSON: the JSON data assosciated with the gpt entries of the term
        None: the term was not in the cache
    '''
    cache = load_cache()
    if term in cache:
        cached_entry = cache[term]
        return cached_entry[term]
    return None

def get_definition(term):
    '''
    Returns a string containing the definition of an inputted term

    args:
        term (str): the legal term to be returned.

    returns:
        str: the definition of the inputted term
        None: the term was not found
    '''
    #open the file for reading
    with open(DEFINITION_FILE, 'r') as file:
        #check if the term is in the file
        if term in file:
            #return the definition
            entry = file[term]
            return entry['definition']
        return None


@app.route('/api/get_gpt_response/<string:term>', methods=['GET'])
def get_gpt_response(term):
    try:
        termJSON = get_cached_data(term)
        if termJSON:
            #term in cache
            return jsonify({"source":"cache","data": termJSON}), 200
        #term not in cache
        #generate gpt response
        definition = get_definition(term)
        new_entry = json.dumps(get_legal_explanation_and_usage(term, definition))
        #add to cache
        cache = load_cache()
        cache[term] = new_entry
        #save updated cache
        save_cache(cache)
        return jsonify({"source":"request", "data": new_entry}), 200
    except:
        return jsonify({"message": "Couldn't open file"}), 400

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
        definition = get_definition(term)
        return jsonify({"message": "bruh"}), 200
    except:
        return jsonify({"message": "Couldn't open file"}), 400


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
