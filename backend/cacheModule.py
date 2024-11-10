import os
import json

CACHE_FILE = './data/termsUsageExplanations.json'

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
    print(term)
    if term in cache:
        cached_entry = cache[term]
        return cached_entry
    return None

def add_to_cache(term, entry):
    cache = load_cache()
    cache[term] = entry
    save_cache(cache)
