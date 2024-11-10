import React, { useState } from 'react';
import axios from 'axios';

const AudioListener = ({ text }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [audio, setAudio] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      // Make the request to the backend API to get the audio file
      const response = await axios.get(`http://localhost:5000/api/generate_text_to_speech/${text}`, { responseType: 'blob' });
      const audioBlob = response.data;
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);

      // Create a new audio element for playback
      const audio = new Audio(audioUrl);
      setAudio(audio);

      setLoading(false);
    } catch (err) {
      setError('Failed to generate audio');
      setLoading(false);
    }
  };

  const handlePlay = () => {
    if (audio) {
      audio.play();
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Loading...' : 'Generate Speech'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {audioUrl && (
        <button onClick={handlePlay}>
          Play Audio
        </button>
      )}
    </div>
  );
};

export default AudioListener;
