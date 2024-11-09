import openai
from flask import Flask, request, jsonify
from secure import OPENAI_API_KEY

app = Flask(__name__)

# Set your API key here
openai.api_key = OPENAI_API_KEY

# Route to handle GPT requests for legal terms
@app.route('/explain_legal_term', methods=['POST'])
def define_legal_term():
    data = request.json
    legal_term = data.get("term", "")
    definition = data.get("definition", "")
    
    # Prepare the prompt with term and definition
    prompt = f"Term: {legal_term}\nDefinition: {definition}\n\nProvide an explanation of this legal term in simpler language and give an example sentence using it. The response should be in the format: Explanation: [explanation here] Usage: [example sentence here]"

    # Define model specifications for the request
    model_specifications = {
        "model": "text-davinci-003",
        "temperature": 0.7,
        "max_tokens": 150,  # Adjust as needed for adequate explanation and example
    }
    
    try:
        response = openai.Completion.create(
            prompt=prompt,
            **model_specifications
        )
        
        # Process the response to extract explanation and usage
        response_text = response.choices[0].text.strip()
        # Example parse assuming response follows a pattern
        # Look for keywords like "Explanation:" and "Usage:" (or similar patterns in GPT output)
        explanation, usage = response_text.split("\n")[0], response_text.split("\n")[1]
        
        # Return JSON formatted response
        return jsonify({
            "explanation": explanation.replace("Explanation: ", "").strip(),
            "usage": usage.replace("Usage: ", "").strip()
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)