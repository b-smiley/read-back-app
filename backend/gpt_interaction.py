import openai
from secure import OPENAI_API_KEY
print(openai.__version__)

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
    prompt = f"Term: {term}\nDefinition: {definition}\n\nProvide a further explanation of this legal term in simpler language and give an example sentence using it. The response should be in the format: Explanation: [explanation here] Usage: [example sentence here]"

    try:
        # Use the new chat method with gpt-3.5-turbo
        completion = openai.chat.completions.create(
			model="gpt-3.5-turbo",
			messages=[
				{"role": "system", "content": "You are a helpful assistant."},
				{
					"role": "user",
					"content": prompt
				}
			],
			max_tokens=200
		)
        
        # Process the response to extract explanation and usage
        response = completion.choices[0].message.content
        # Split the input into lines and extract each section
        lines = response.split("\n")
        explanation = lines[0].split(":", 1)[1].strip()  # Get text after "Explanation:"
        usage = lines[1].split(":", 1)[1].strip()  # Get text after "Usage:"
        
        # Return the parsed response as a dictionary
        return {
            "explanation": explanation,
            "usage": usage
        }
    
    except Exception as e:
        return {"error": str(e)}

json = get_legal_explanation_and_usage("contract", "A legally binding agreement between two or more parties.")
print(json)
