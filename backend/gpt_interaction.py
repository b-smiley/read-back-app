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
    prompt = f"Term: {term}\nDefinition: {definition}\n\nProvide a further explanation of this legal term in simpler language and give an example sentence using it. The response should be in the format: \n```Explanation: [explanation here]\'\\n\'Usage: [example sentence here]```. Make sure to return the data exactly like this as it is parsed by a python script that is expecting the Explaination and Usage to be separated by one \'\\n\' and for the data to come after the \':\' in each line."

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

        # Needs to contain "Explanation:" and "Usage:" to be valid
        if "Explanation:" not in response or "Usage:" not in response or '\n' not in response:
            return {"error": "Explanation or Usage not found in response."}

        # Split the input into lines and extract each section
        lines = response.split("\n")
        # Remove empty lines
        lines = [line for line in lines if line.strip() != ""]
        explanation = lines[0].split(":", 1)[1].strip()  # Get text after "Explanation:"
        usage = lines[1].split(":", 1)[1].strip()  # Get text after "Usage:"
        
        # Return the parsed response as a dictionary
        return {
            "explanation": explanation,
            "usage": usage
        }
    
    except Exception as e:
        print(response)
        return {"error": str(e)}

json = get_legal_explanation_and_usage("contract", "A legally binding agreement between two or more parties.")
print(json)
