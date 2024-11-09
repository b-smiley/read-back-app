from flask import Flask, request, jsonify, app
from gpt_interaction import get_legal_explanation_and_usage
import os
import json

CACHE_FILE = './data/termsUsageExplanations.json'
DEFINITION_FILE = './data/termsGlossary.json'

def load_cache():
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, 'r') as file:
            return json.load(file)
    return {}

def save_cache(cache_data):
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
    #open the file for reading
    with open(DEFINITION_FILE, 'r') as file:
        #check if the term is in the file
        if term in file:
            #return the definition
            entry = file[term]
            return entry['definition']



@app.route('/api/get_gpt_response', methods=['POST'])
def get_gpt_response(term):
    try:
        termJSON = get_cached_data(term)
        if termJSON:
            #term in cache
            return jsonify({"message": termJSON}), 200
        #term not in cache
        #generate gpt response
        definition = get_definition(term)
        new_entry = json.dumps(get_legal_explanation_and_usage(term, definition))
        #add to cache
        cache = load_cache()
        cache[term] = new_entry
        #save updated cache
        save_cache(cache)
        return jsonify({"message": new_entry}), 200
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
    
@app.route('/api/get_definition', methods=['GET'])
