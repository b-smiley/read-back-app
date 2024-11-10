import requests

MP3FILE = './data/output.mp3'


def get_mp3_file(text):
    CHUNK_SIZE = 1024
    url = "https://api.elevenlabs.io/v1/text-to-speech/<voice-id>"

    data = {
        "text": text,
        "model_id": "eleven_monolingual_v1",
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.5
        }
    }
    
    try:
        with open(MP3FILE, 'wb') as sound_file:
            return
    except:
        return None