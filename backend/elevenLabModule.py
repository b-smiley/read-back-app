import requests
from secure import ELEVENLAB_API_KEY
import os
MP3FILE = './data/output.mp3'
MP3PATH = './data/'
MP3FILENAME = 'output.mp3'


def get_mp3_file(text):
    CHUNK_SIZE = 1024
    url = "https://api.elevenlabs.io/v1/text-to-speech/9BWtsMINqrJLrRacOk9x"

    payload = {"text": text}
    headers = {
        "xi-api-key": ELEVENLAB_API_KEY,
        "Content-Type": "application/json"
    }

    response = requests.request("POST", url, json=payload, headers=headers)
    with open(MP3FILE, 'wb') as sound_file:
        for chunk in response.iter_content(chunk_size=CHUNK_SIZE):
            if chunk:
                sound_file.write(chunk)
        return MP3PATH, MP3FILENAME
        
    