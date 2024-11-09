import openai
from flask import Flask, request, jsonify
from secure import OPENAI_API_KEY
from gpt_interaction import get_legal_explanation_and_usage

CACHE_FILE = './data/termsUsageExplanations.json'


def get_cached_data(key):
    # Check if key is in the cache and if it hasn't expired
    '''if key in cache:
        cached_entry = cache[key]
        if time.time() - cached_entry['timestamp'] < CACHE_TIMEOUT:
            return cached_entry['data']'''
    
    return None


@app.route('backend/get_explanation', methods=['POST'])
def get_explanation(keyword):

