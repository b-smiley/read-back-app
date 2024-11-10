import json
DEFINITION_FILE = './data/termsGlossary.json'

def get_definition(term):
    '''
    Returns a string containing the definition of an inputted term

    args:
        term (str): the legal term to be returned.

    returns:
        str: the definition of the inputted term
        None: the term was not found
    '''
    #open the file for reading
    with open(DEFINITION_FILE, 'r') as file:
        #check if the term is in the file
        termList = json.load(file)
        if term in termList:
            #return the definition
            entry = termList[term]
            return entry['definition']
        return None