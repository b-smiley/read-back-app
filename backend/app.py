from flask import Flask, Response
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

saved_text = []  # Store all characters for other purposes

def generate_words():
    word = ""
    with open("input.txt", "r") as file:
        for char in file.read():
            saved_text.append(char)  # Save the character
            if char.isspace():  # If whitespace, complete the word
                if word:  # Check if we have a non-empty word
                    yield f"data: {word}\n\n"
                    word = ""
                time.sleep(0.12)  # 500 characters per minute = 0.12 seconds per character
            else:
                word += char
        # Send the final word if there's no trailing whitespace
        if word:
            yield f"data: {word}\n\n"

@app.route('/stream')
def stream():
    return Response(generate_words(), mimetype='text/event-stream')

@app.route('/saved_text')
def saved_text_route():
    return {'saved_text': ''.join(saved_text)}  # Return all saved characters

if __name__ == '__main__':
    app.run(debug=True)
