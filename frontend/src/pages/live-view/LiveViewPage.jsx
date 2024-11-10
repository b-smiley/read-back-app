import React, { useEffect, useState } from "react";
import "./LiveViewPage.css";
import Transcript, {
  getTranscript,
} from "../../components/Transcript/Transcript";
import LiveCamera from "./camera/LiveCamera";
import Title from "../../components/Title/Title";
import Proceeding from "./proceeding/Proceeding";
const response = await getTranscript();

function LiveViewPage() {
  const [transcript, setTranscript] = useState({});
  const [selectedWord, setSelectedWord] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const jsonResponse = getTranscript();

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
          <Transcript
            setSelectedWord={setSelectedWord}
            transcript={jsonResponse.transcript}
            keywords={jsonResponse.keywords}
            mode={"review"}
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
