import React, { useEffect, useState } from 'react';

function StreamingComponent({ fileName }) {
    const [streamedText, setStreamedText] = useState("");
    const [savedText, setSavedText] = useState("");

    useEffect(() => {
        const eventSource = new EventSource(`http://localhost:5000/stream?file=${fileName}`);

        eventSource.onmessage = (event) => {
            setStreamedText((prevText) => prevText + event.data);  // Append the incoming data to existing text
        };

        eventSource.onerror = () => {
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [fileName]);

    useEffect(() => {
        fetch('http://localhost:5000/saved_text')
            .then((response) => response.json())
            .then((data) => setSavedText(data.saved_text));
    }, []);

    return (
        <div>
            <h2>Streaming Text:</h2>
            <div>
                <p>{streamedText}</p>  {/* Display the streamed text */}
            </div>
            <h2>Saved Text:</h2>
            <p>{savedText}</p>
        </div>
    );
}

export default StreamingComponent;
