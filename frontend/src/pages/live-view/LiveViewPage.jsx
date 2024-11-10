import React, { useEffect, useState } from "react";
import "./LiveViewPage.css";
import Transcript, {
  getTranscript,
} from "../../components/Transcript/Transcript";
import LiveCamera from "./camera/LiveCamera";
import Title from "../../components/Title/Title";
import Proceeding from "./proceeding/Proceeding";
import Glossary from "../../components/Glossary/Glossary";
const response = await getTranscript();

function LiveViewPage() {
  const [transcript, setTranscript] = useState({});
  const [selectedWord, setSelectedWord] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log(response);
    setTranscript(response);
  }, []);
  return (
    <div className="live-view-page">
      <Title caseName="Smiths Divorce Settlements" />
      <div className="panels">
        <div className="left">
          <LiveCamera />
        </div>
        <div className="right">
          <Glossary
            selectedWord={selectedWord}
            position={position}
            setSelectedWord={setSelectedWord}
          />

          <Transcript
            setSelectedWord={setSelectedWord}
            transcript={transcript.transcript}
            keywords={transcript.keywords}
            mode={"live"}
            setPosition={setPosition}
          />
        </div>
      </div>
      <div className="proceedings">
        <Proceeding state={0} />
      </div>
    </div>
  );
}
export default LiveViewPage;
