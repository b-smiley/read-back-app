import openai
from secure import OPENAI_API_KEY

# Set your API key here
openai.api_key = OPENAI_API_KEY

def get_legal_explanation_and_usage(term, definition):
    """
    Sends a legal term and its definition to GPT for further explanation and example usage.

    Args:
        term (str): The legal term to be defined.
        definition (str): The legal definition of the term.

    Returns:
        dict: A dictionary with 'explanation' and 'usage' keys.
    """
    
    # Prepare the prompt with term and definition
    prompt = f"Term: {term}\nDefinition: {definition}\n\nProvide an explanation of this legal term in simpler language and give an example sentence using it. The response should be in the format: Explanation: [explanation here] Usage: [example sentence here]"

    # Define model specifications for the request
    model_specifications = {
        "model": "text-davinci-003",
        "temperature": 0.7,
        "max_tokens": 150  # Adjust as needed for explanation and example
    }
    
    try:
        # Send the prompt to the OpenAI API
        response = openai.Completion.create(
            prompt=prompt,
            **model_specifications
        )
        
        # Process the response to extract explanation and usage
        response_text = response.choices[0].text.strip()
        # Example parse assuming response follows a pattern
        # Parsing logic can be adjusted based on response structure
        lines = response_text.split("\n")
        explanation = lines[0].replace("Explanation: ", "").strip()
        usage = lines[1].replace("Usage: ", "").strip()
        
        # Return the parsed response as a dictionary
        return {
            "explanation": explanation,
            "usage": usage
        }
    
    except Exception as e:
        return {"error": str(e)}