import json
import time
import os
from flask import Flask, Response, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

saved_text = []  # OUTPUT VARIABLE.  THIS IS WHAT FRONTEND READS (SUPPOSEDLY)

subject = ""
segment = ""

class Segment:
    '''
    Purpose: stores data related to single instance of speaking
    (String) content -> phrase spoken
    (int) index -> starting index of phrase
    (int) length -> length of phrase
    
    to_dict -> converts data to a dictionary format for .json dump
    '''
    def __init__(self, content, index):
        self.content = content
        self.index = index
        self.length = len(content)
    
    def to_dict(self):
        return {
            'content': self.content,
            'index': self.index,
            'length': self.length
        }

class Actor:
    '''
    Purpose: stores data related to a single person
    (String) name -> name of person
    (List[Segment]) speech -> list of instances of speaking
    
    to_dict -> converts data to a dictionary format for .json dump
    '''
    def __init__(self, name, speech=None, index=None, descriptors=None):
        self.name = name
        # If speech is provided, ensure it's a list of Segment objects
        self.speech = [] if speech is None else [speech] if isinstance(speech, Segment) else [Segment(speech, index)]
    
    def to_dict(self):
        return {
            'name': self.name,
            'speech': [segment.to_dict() for segment in self.speech],  # Convert list of Segment objects to dicts
        }



actors = []             #list of all people
current_actor = None    #person currently speaking



# Load the first JSON file containing the recognized keywords and definitions
with open('./data/termsGlossary.json', 'r') as f:
    raw_keywords_data = json.load(f)

keywords_data = {key.lower(): value for key, value in raw_keywords_data.items()}
# Create an empty dictionary to store the matches data (second JSON file)
matches_data = {}

def generate_words(input_file):
    '''
    Purpose - this function completes a few things
    ->parses input file and matches legal jargon with the termsGlossary.json file
    ->outputs matches with their indices as the key and creates the matches.json file
    ->parses input file again, this time outputting each char to saved text (for front end)
    ->calls identify words
    ->saves idenfied people and their speaking logs to actors.json

    returns nothing
    '''
    global saved_text               #VARIABLE USED BY FRONTEND TO READ OUTPUT
    saved_text.clear()

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



    start_index = 0
    curr_index = 1
    global segment
    for char in text:
        segment += char  # Add character to the current segment

        saved_text.append(char)
        if char in {'.', '?', '!', '\n', ')'}:  # Check if the character is a delimiter
            if(char != '.' or not segment[-3:-1].lower() in {"ms", "mr"}):
                #is a complete segment to be processed
                identify_word(start_index)
                segment = ""
                start_index = curr_index
        yield char
        time.sleep(0.01)
        curr_index += 1


    #cleans junk data      
    for actor in actors[:]:
        actor.speech = [phrase for phrase in actor.speech if phrase.content != []]
        if len(actor.speech) == 0 :
            actors.remove(actor)

    #write to json
    try:
        with open('./data/actors.json', 'w') as f:
            json.dump([actor.to_dict() for actor in actors], f, indent=4)
    except Exception as e:
        print(f"Error writing to actors.json: {e}")



def identify_word(index):
    '''
    Purpose
    ->identifies if segment is a new person or continuation of previous conversation
    ->creates/updates Actor/Segment class accordingly
    returns nothing
    '''
    global segment
    global actors
    global current_actor
    
    if not segment or segment == "\n" or not any(char.isalnum() for char in segment):
        # Empty segment, return
        return
    
    only_letters = ''.join([char for char in segment if char.isalpha()])
    
    if(only_letters.isupper()):  # This is a subject/person
        subject = only_letters

        # Check if the actor already exists, otherwise create a new one
        existing_actor = next((actor for actor in actors if subject in actor.name), None)
        if existing_actor:
            current_actor = existing_actor
        else:
            current_actor = Actor(subject, [], index, [])
            actors.append(current_actor)
    else: 
        if(index == current_actor.speech[-1].index + current_actor.speech[-1].length and current_actor.speech[-1].content[-1] != "\n"):
            current_actor.speech[-1].content += segment #continuation of same paragraph
        else: 
            current_actor.speech.append(Segment(segment, index))  # Append the segment to speech




@app.route('/saved_text')
def saved_text_route():
    return {'saved_text': ''.join(saved_text)}  # Return all saved characters

if __name__ == '__main__':
    app.run(debug=True)
