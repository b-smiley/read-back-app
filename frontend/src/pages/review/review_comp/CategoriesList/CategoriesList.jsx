import React, { useEffect, useState } from 'react';
import './CategoriesList.css';

function CategoriesList() {
  const [selectedPerson, setSelectedPerson] = useState(null); 
  const [people, setPeople] = useState([]);

  const simulatedApiResponse = [
    {
        "name": "CRIMINALDISTRICTCOURT",
        "speech": [
            {
                "content": " Officer Peter Paul.",
                "index": 1337,
                "length": 20
            },
            {
                "content": " Police officer.",
                "index": 1395,
                "length": 16
            },
            {
                "content": " Yes, right there at the desk in the orange jumpsuit.",
                "index": 1453,
                "length": 53
            },
            {
                "content": " In undercover plain clothes capacity with Eighth District Narcotics.",
                "index": 1693,
                "length": 69
            },
            {
                "content": " Yes.",
                "index": 1887,
                "length": 5
            },
            {
                "content": " Officer Peter Paul.",
                "index": 1337,
                "length": 20
            },
            {
                "content": " Police officer.",
                "index": 1395,
                "length": 16
            },
            {
                "content": " Yes, right there at the desk in the orange jumpsuit.",
                "index": 1453,
                "length": 53
            },
            {
                "content": " In undercover plain clothes capacity with Eighth District Narcotics.",
                "index": 1693,
                "length": 69
            },
            {
                "content": " Yes.",
                "index": 1887,
                "length": 5
            }
        ]
    },
    {
        "name": "STATEOFLOUISIANA",
        "speech": [
            {
                "content": "S- Crime Lab\n",
                "index": 747,
                "length": 13
            },
            {
                "content": "S- Conviction\n",
                "index": 760,
                "length": 14
            },
            {
                "content": "S- Crime Lab\n",
                "index": 747,
                "length": 13
            },
            {
                "content": "S- Conviction\n",
                "index": 760,
                "length": 14
            }
        ]
    },
    {
        "name": "NO",
        "speech": [
            {
                "content": " 123-456\n",
                "index": 84,
                "length": 9
            },
            {
                "content": " 123-456\n",
                "index": 84,
                "length": 9
            },
            {
                "content": " 123-456\n",
                "index": 84,
                "length": 9
            }
        ]
    },
    {
        "name": "JOHNDOE",
        "speech": [
            {
                "content": "Probable Cause Hearing\n",
                "index": 122,
                "length": 23
            },
            {
                "content": "Motion to Suppress Evidence\n",
                "index": 145,
                "length": 28
            },
            {
                "content": "Testimony and Notes of Evidence, taken in the above-entitled and -numbered cause, before the HON. JOHN JUSTICE, Judge, presiding on the 7th day of May, 2014.",
                "index": 173,
                "length": 97
            },
            {
                "content": "Probable Cause Hearing\n",
                "index": 122,
                "length": 23
            },
            {
                "content": "Motion to Suppress Evidence\n",
                "index": 145,
                "length": 28
            },
            {
                "content": "Testimony and Notes of Evidence, taken in the above-entitled and -numbered cause, before the HON. JOHN JUSTICE, Judge, presiding on the 7th day of May, 2014.",
                "index": 173,
                "length": 97
            },
            {
                "content": "Probable Cause Hearing\n",
                "index": 122,
                "length": 23
            },
            {
                "content": "Motion to Suppress Evidence\n",
                "index": 145,
                "length": 28
            },
            {
                "content": "Testimony and Notes of Evidence, taken in the above-entitled and -numbered cause, before the HON. JOHN JUSTICE, Judge, presiding on the 7th day of May, 2014.",
                "index": 173,
                "length": 97
            }
        ]
    },
    {
        "name": "JANESMITHESQ",
        "speech": [
            {
                "content": " Could you please state your name for the Record?",
                "index": 1285,
                "length": 49
            },
            {
                "content": " Officer, how are you employed?",
                "index": 1361,
                "length": 31
            },
            {
                "content": " Do you see Mr. Doe in court today?",
                "index": 1415,
                "length": 35
            },
            {
                "content": " Officer, could you tell the Court in what capacity you were working February, ?",
                "index": 1610,
                "length": 80
            },
            {
                "content": " Officer, you were undercover on February, ?",
                "index": 1840,
                "length": 44
            },
            {
                "content": " Would it refresh your recollection if you looked at your police report?",
                "index": 1896,
                "length": 72
            },
            {
                "content": " Could you please state your name for the Record?",
                "index": 1285,
                "length": 49
            },
            {
                "content": " Officer, how are you employed?",
                "index": 1361,
                "length": 31
            },
            {
                "content": " Do you see Mr. Doe in court today?",
                "index": 1415,
                "length": 35
            },
            {
                "content": " Officer, could you tell the Court in what capacity you were working February, ?",
                "index": 1610,
                "length": 80
            },
            {
                "content": " Officer, you were undercover on February, ?",
                "index": 1840,
                "length": 44
            },
            {
                "content": " Would it refresh your recollection if you looked at your police report?",
                "index": 1896,
                "length": 72
            }
        ]
    },
    {
        "name": "JOEREPORTERCCRRPR",
        "speech": [
            {
                "content": "Certified Court Reporter\n",
                "index": 4160,
                "length": 25
            },
            {
                "content": "Registered Professional Reporter\n",
                "index": 4185,
                "length": 33
            },
            {
                "content": "Certified Court Reporter\n",
                "index": 5142,
                "length": 25
            },
            {
                "content": "Registered Professional ReporterCRIMINAL DISTRICT COURT\n",
                "index": 0,
                "length": 56
            },
            {
                "content": "Certified Court Reporter\n",
                "index": 4160,
                "length": 25
            },
            {
                "content": "Registered Professional Reporter\n",
                "index": 4185,
                "length": 33
            },
            {
                "content": "Certified Court Reporter\n",
                "index": 5142,
                "length": 25
            }
        ]
    },
    {
        "name": "DETECTIVEPETERPAUL",
        "speech": [
            {
                "content": "Direct Examination by Ms. Smith\n",
                "index": 662,
                "length": 32
            },
            {
                "content": "Cross-Examination by Ms. Jane\n",
                "index": 694,
                "length": 30
            },
            {
                "content": "Direct Examination by Ms. Smith\n",
                "index": 662,
                "length": 32
            },
            {
                "content": "Cross-Examination by Ms. Jane\n",
                "index": 694,
                "length": 30
            }
        ]
    },
    {
        "name": "MSSMITH",
        "speech": [
            {
                "content": "Your Honor, the State is ready to proceed with motions in John Doe.",
                "index": 786,
                "length": 67
            },
            {
                "content": "The State calls Officer Peter Paul.",
                "index": 1104,
                "length": 35
            },
            {
                "content": "OFFICER PETER PAUL, Parish Police Department, after having been first duly sworn, did testify as follows:\n",
                "index": 1141,
                "length": 106
            },
            {
                "content": "Please let the Record reflect proper in-court identification.",
                "index": 1519,
                "length": 61
            },
            {
                "content": "I tender the witness, Judge.",
                "index": 1775,
                "length": 28
            },
            {
                "content": "Your Honor, I'm going to object. I don't think it's relevant who did the physical detention of the defendant.",
                "index": 1981,
                "length": 32
            },
            {
                "content": "The State has no Redirect.",
                "index": 2444,
                "length": 26
            },
            {
                "content": "The State has no further witnesses. Judge, at this time we would offer, file and introduce S- -- for motion purposes only -- S-, which is a copy of the crime lab in this matter showing that the evidence confiscated from the defendant, both the hand-rolled cigar and the nine plastic baggies were each positive for marijuana; and S-, a copy of the defendant's prior conviction.",
                "index": 2534,
                "length": 35
            },
            {
                "content": "With that, Judge, the State submits.",
                "index": 3006,
                "length": 36
            },
            {
                "content": "The State submits.",
                "index": 3157,
                "length": 18
            },
            {
                "content": "Your Honor, the State is ready to proceed with motions in John Doe.",
                "index": 786,
                "length": 67
            },
            {
                "content": "The State calls Officer Peter Paul.",
                "index": 1104,
                "length": 35
            },
            {
                "content": "OFFICER PETER PAUL, Parish Police Department, after having been first duly sworn, did testify as follows:\n",
                "index": 1141,
                "length": 106
            },
            {
                "content": "Please let the Record reflect proper in-court identification.",
                "index": 1519,
                "length": 61
            },
            {
                "content": "I tender the witness, Judge.",
                "index": 1775,
                "length": 28
            },
            {
                "content": "Your Honor, I'm going to object. I don't think it's relevant who did the physical detention of the defendant.",
                "index": 1981,
                "length": 32
            },
            {
                "content": "The State has no Redirect.",
                "index": 2444,
                "length": 26
            },
            {
                "content": "The State has no further witnesses. Judge, at this time we would offer, file and introduce S- -- for motion purposes only -- S-, which is a copy of the crime lab in this matter showing that the evidence confiscated from the defendant, both the hand-rolled cigar and the nine plastic baggies were each positive for marijuana; and S-, a copy of the defendant's prior conviction.",
                "index": 2534,
                "length": 35
            },
            {
                "content": "With that, Judge, the State submits.",
                "index": 3006,
                "length": 36
            },
            {
                "content": "The State submits.",
                "index": 3157,
                "length": 18
            }
        ]
    },
    {
        "name": "MSJANE",
        "speech": [
            {
                "content": "Your Honor, Mary Jane on behalf of John Doe.",
                "index": 865,
                "length": 44
            },
            {
                "content": "Yes. Mr. Doe is present in court and we're ready for motions.",
                "index": 982,
                "length": 4
            },
            {
                "content": "I have no further questions. Thank you.",
                "index": 2392,
                "length": 28
            },
            {
                "content": "Not for motion purposes.",
                "index": 2969,
                "length": 24
            },
            {
                "content": "No.",
                "index": 3091,
                "length": 3
            },
            {
                "content": "I would submit.",
                "index": 3129,
                "length": 15
            },
            {
                "content": "Your Honor, Mary Jane on behalf of John Doe.",
                "index": 865,
                "length": 44
            },
            {
                "content": "Yes. Mr. Doe is present in court and we're ready for motions.",
                "index": 982,
                "length": 4
            },
            {
                "content": "I have no further questions. Thank you.",
                "index": 2392,
                "length": 28
            },
            {
                "content": "Not for motion purposes.",
                "index": 2969,
                "length": 24
            },
            {
                "content": "No.",
                "index": 3091,
                "length": 3
            },
            {
                "content": "I would submit.",
                "index": 3129,
                "length": 15
            }
        ]
    },
    {
        "name": "THECOURT",
        "speech": [
            {
                "content": "This is the matter of the State versus John Doe.",
                "index": 922,
                "length": 48
            },
            {
                "content": "Very well. Call your first witness.",
                "index": 1056,
                "length": 10
            },
            {
                "content": "I will permit it. I will overrule.",
                "index": 2103,
                "length": 17
            },
            {
                "content": " Would it refresh your recollection, Officer, if you reviewed the police report?",
                "index": 2137,
                "length": 80
            },
            {
                "content": "Thank you, Officer. You may step down.",
                "index": 2483,
                "length": 19
            },
            {
                "content": "Any objection for motion purposes?",
                "index": 2923,
                "length": 34
            },
            {
                "content": "Anything by the Defense?",
                "index": 3055,
                "length": 24
            },
            {
                "content": "Submitted?",
                "index": 3107,
                "length": 10
            },
            {
                "content": "The Court finds probable cause as charged. The Court denies the Motion to Suppress Evidence.",
                "index": 3188,
                "length": 42
            },
            {
                "content": " I will note an objection on behalf of the Defense to the Court's ruling.",
                "index": 3280,
                "length": 73
            },
            {
                "content": "This is the matter of the State versus John Doe.",
                "index": 922,
                "length": 48
            },
            {
                "content": "Very well. Call your first witness.",
                "index": 1056,
                "length": 10
            },
            {
                "content": "I will permit it. I will overrule.",
                "index": 2103,
                "length": 17
            },
            {
                "content": " Would it refresh your recollection, Officer, if you reviewed the police report?",
                "index": 2137,
                "length": 80
            },
            {
                "content": "Thank you, Officer. You may step down.",
                "index": 2483,
                "length": 19
            },
            {
                "content": "Any objection for motion purposes?",
                "index": 2923,
                "length": 34
            },
            {
                "content": "Anything by the Defense?",
                "index": 3055,
                "length": 24
            },
            {
                "content": "Submitted?",
                "index": 3107,
                "length": 10
            },
            {
                "content": "The Court finds probable cause as charged. The Court denies the Motion to Suppress Evidence.",
                "index": 3188,
                "length": 42
            },
            {
                "content": " I will note an objection on behalf of the Defense to the Court's ruling.",
                "index": 3280,
                "length": 73
            }
        ]
    },
    {
        "name": "THEWITNESS",
        "speech": [
            {
                "content": "Sure, I will take a look. Yes.",
                "index": 2232,
                "length": 25
            },
            {
                "content": " In the report it says that I notified him he was under arrest, and read him his rights per Miranda, and arrested him.",
                "index": 2262,
                "length": 118
            },
            {
                "content": "Sure, I will take a look. Yes.",
                "index": 2232,
                "length": 25
            },
            {
                "content": " In the report it says that I notified him he was under arrest, and read him his rights per Miranda, and arrested him.",
                "index": 2262,
                "length": 118
            }
        ]
    },
    {
        "name": "REPORTERSPAGE",
        "speech": [
            {
                "content": "I, JOE REPORTER, Certified Court Reporter in and for the State of Louisiana, the officer, as defined in Rule of the Federal Rules of Civil Procedure and/or Article (B) of the Louisiana Code of Civil Procedure, before whom this proceeding was taken, do hereby state on the Record:\n",
                "index": 3372,
                "length": 167
            },
            {
                "content": "That due to the interaction in the spontaneous discourse of this proceeding, dashes (--) have been used to indicate pauses, changes in thought, and/or talkovers; that same is the proper method for a Court Reporter's transcription of proceeding, and that the dashes (--)",
                "index": 3653,
                "length": 88
            },
            {
                "content": " do not indicate that words or phrases have been left out of this transcript;\n",
                "index": 3922,
                "length": 78
            },
            {
                "content": "That any words and/or names which could not be verified through reference material have been denoted with the phrase \"(spelled phonetically)",
                "index": 4001,
                "length": 140
            },
            {
                "content": "I, JOE REPORTER, Certified Court Reporter in and for the State of Louisiana, the officer, as defined in Rule of the Federal Rules of Civil Procedure and/or Article (B) of the Louisiana Code of Civil Procedure, before whom this proceeding was taken, do hereby state on the Record:\n",
                "index": 3372,
                "length": 167
            },
            {
                "content": "That due to the interaction in the spontaneous discourse of this proceeding, dashes (--) have been used to indicate pauses, changes in thought, and/or talkovers; that same is the proper method for a Court Reporter's transcription of proceeding, and that the dashes (--)",
                "index": 3653,
                "length": 88
            },
            {
                "content": " do not indicate that words or phrases have been left out of this transcript;\n",
                "index": 3922,
                "length": 78
            },
            {
                "content": "That any words and/or names which could not be verified through reference material have been denoted with the phrase \"(spelled phonetically)",
                "index": 4001,
                "length": 140
            }
        ]
    },
    {
        "name": "REPORTERSCERTIFICATE",
        "speech": [
            {
                "content": "This certification is valid only for a transcript accompanied by my original signature and original required seal on this page.",
                "index": 4243,
                "length": 127
            },
            {
                "content": "I, JOE REPORTER, Official Court Reporter in and for the State of Louisiana, employed as an Official Court Reporter by Criminal District Court, Parish of Orleans for the State of Louisiana, do hereby certify that this testimony was reported by me in the stenotype reporting method, was prepared and transcribed by me or under my personal direction and supervision, and is a true and correct transcript to the best of my ability and understanding;\n",
                "index": 4372,
                "length": 446
            },
            {
                "content": "That the transcript has been prepared in compliance with the transcript format guidelines required by statute, or by rules of the board, or by the Supreme Court of Louisiana;\n",
                "index": 4819,
                "length": 175
            },
            {
                "content": "That I am not of counsel, not related to counsel or the parties herein, nor am I otherwise interested in the outcome of this matter.",
                "index": 4995,
                "length": 132
            },
            {
                "content": "This certification is valid only for a transcript accompanied by my original signature and original required seal on this page.",
                "index": 4243,
                "length": 127
            },
            {
                "content": "I, JOE REPORTER, Official Court Reporter in and for the State of Louisiana, employed as an Official Court Reporter by Criminal District Court, Parish of Orleans for the State of Louisiana, do hereby certify that this testimony was reported by me in the stenotype reporting method, was prepared and transcribed by me or under my personal direction and supervision, and is a true and correct transcript to the best of my ability and understanding;\n",
                "index": 4372,
                "length": 446
            },
            {
                "content": "That the transcript has been prepared in compliance with the transcript format guidelines required by statute, or by rules of the board, or by the Supreme Court of Louisiana;\n",
                "index": 4819,
                "length": 175
            },
            {
                "content": "That I am not of counsel, not related to counsel or the parties herein, nor am I otherwise interested in the outcome of this matter.",
                "index": 4995,
                "length": 132
            }
        ]
    }
];

  useEffect(() => {
    // Simulate fetching data with a timeout
    setTimeout(() => {
      setPeople(simulatedApiResponse); // Set the hardcoded people data after 1 second
    }, 1000); // Delay of 1 second for testing (you can adjust this)
  }, []);

  /*
  //Function to fetch people data from the API
  const fetchPeopleData = async () => {
    try {
      const response = await fetch('https://your-api-url.com/people'); //REPLACE WITH API
      const data = await response.json(); 
      
      //Format the data and set state
      const formattedPeople = data.map(person => ({
        id: person.id, 
        name: person.name, 
        speech: person.speech.map(speech => ({
          content: speech.content, 
          index: speech.index,
          length: speech.length,
        }))
      }));

      setPeople(formattedPeople); //Update data
    } catch (error) {
      console.error('Error fetching people data:', error);
    }
  };
  */

  const handleItemClick = (personName) => {
    if (selectedPerson && selectedPerson.name === personName) {
      setSelectedPerson(null); // Deselect if the same person is clicked again
      document.body.classList.remove('greyed-out');
    } else {
      const person = people.find(p => p.name === personName);
      if (person) {
        setSelectedPerson(person); // Show details of selected person
        document.body.classList.add('greyed-out');
      }
    }
  };

  const handleClosePopup = () => {
    setSelectedPerson(null); // Hide the details
    document.body.classList.remove('greyed-out'); // Remove the greyed-out overlay
  };

  return (
    <div className="categories-list">
      {/* List all people */}
      <ul className="category-items">
        {people.map((person) => (
          <li
            key={person.name}
            className="category-item"
            onClick={() => handleItemClick(person.name)}
          >
            {person.name}
          </li>
        ))}
      </ul>

      {/* Display the selected person's speech details if they are selected */}
      {selectedPerson && (
        <div>
          <div className="greyed-out" onClick={handleClosePopup}></div>
          <div className="person-details-box">
            <button className="close-btn" onClick={handleClosePopup}>X</button>
            <div className="speech-details">
              {selectedPerson.speech.map((item, index) => (
                <div key={index} className="speech-item">
                  <p><strong>Speech #{index + 1}</strong>:</p>
                  <p>{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriesList;