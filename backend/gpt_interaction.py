import openai
from flask import Flask, request, jsonify

app = Flask(__name__)

# Set your API key here
openai.api_key = "your_openai_api_key_here"

# Route to handle GPT requests
@app.route('/gpt_request', methods=['POST'])
def gpt_request():
    data = request.json
    prompt = data.get("prompt", "")
    max_tokens = data.get("max_tokens", 100)  # Default max tokens
    
    # Define any additional model specifications here
    model_specifications = {
        "model": "text-davinci-003",  # You can choose different models like gpt-3.5-turbo
        "temperature": 0.7,  # Control randomness: 0 for deterministic responses, up to 1 for varied
        "max_tokens": max_tokens,  # Control response length
    }
    
    try:
        response = openai.Completion.create(
            prompt=prompt,
            **model_specifications
        )
        
        # Extract response text
        response_text = response.choices[0].text.strip()
        return jsonify({"response": response_text})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
