import json
import time
import os
from flask import Flask, Response, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

saved_text = []  # Store all characters for other purposes

subject = ""
segment = ""

# Load the first JSON file containing the recognized keywords and definitions
with open('./data/termsGlossary.json', 'r') as f:
    raw_keywords_data = json.load(f)

keywords_data = {key.lower(): value for key, value in raw_keywords_data.items()}
# Create an empty dictionary to store the matches data (second JSON file)
matches_data = {}

def generate_words(input_file):
    match_index = 0  # Initialize the match index to start with
    if not os.path.exists(input_file):
        return f"Error: The file '{input_file}' does not exist."

    with open(input_file, "r") as file:
        text = file.read()
        lower_text = text.lower()
    
        # Loop through each keyword in the first JSON
        for keyword, data in keywords_data.items():
            start_index = lower_text.find(keyword)
            while start_index != -1:
                # Store the match in the matches_data dictionary using the match's index
                matches_data[start_index] = {
                    "keyword": keyword,
                    "length": len(keyword)
                }
                match_index += 1
                # Continue searching for the next occurrence of the same keyword
                start_index = lower_text.find(keyword, start_index + 1)

        # After all matches have been found, save the second JSON file
        with open('./data/matches.json', 'w') as f:
            json.dump(matches_data, f, indent=4)


    for char in text:
        segment += char  # Add character to the current segment
        if char in {'.', '?', '!', '\n', ')'}:  # Check if the character is a delimiter
            saved_text.append(segment)  # Append the complete segment to saved_text
            yield segment  # Send the full segment
            segment = ""  # Reset the segment collector
        time.sleep(0.01)  # Control the rate (1000 characters per minute)

    # Append any remaining segment after the loop ends
    if segment:
        saved_text.append(segment)
        yield segment





class Actor:
    def __init__(self, name, speech, descriptors):
        self.name = name
        self.speech = speech
        self.descriptors = descriptors

def indentify_word():
    if not segment:
        #empty boi
        return

    only_letters = ''.join([char for char in segment if char.isalpha()])
    if(only_letters.isupper()):
        #This is a subject/person
        subject = only_letters
        pass
    elif(segment[0] == "(" and segment[-1] == ")"):
        #non verbal information
        pass


    pass


@app.route('/saved_text')
def saved_text_route():
    return {'saved_text': ''.join(saved_text)}  # Return all saved characters

if __name__ == '__main__':
    app.run(debug=True)
