// src/components/StreamingComponent.js
import React, { useEffect, useState } from 'react';

function StreamingComponent() {
    const [words, setWords] = useState([]);
    const [savedText, setSavedText] = useState("");

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:5000/stream');

        eventSource.onmessage = (event) => {
            setWords((prevWords) => [...prevWords, event.data]);
        };

        eventSource.onerror = () => {
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, []);

    useEffect(() => {
        // Fetch saved text once when the component loads
        fetch('http://localhost:5000/saved_text')
            .then(response => response.json())
            .then(data => setSavedText(data.saved_text));
    }, []);

    return (
        <div>
            <h2>Streaming Words:</h2>
            <div>
                {words.map((word, index) => (
                    <p key={index}>{word}</p>
                ))}
            </div>
            <h2>Saved Text:</h2>
            <p>{savedText}</p>
        </div>
    );
}

export default StreamingComponent;
