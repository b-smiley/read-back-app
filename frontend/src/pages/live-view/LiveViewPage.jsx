import React, { useState } from "react";
import "./LiveViewPage.css";
import Transcript, {
  getTranscript,
} from "../../components/Transcript/Transcript";
import LiveCamera from "./camera/LiveCamera";
import Title from "../../components/Title/Title";
import Proceeding from "./proceeding/Proceeding";

function LiveViewPage() {
  const [selectedWord, setSelectedWord] = useState("");
  const jsonResponse = getTranscript();
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
            mode={"live"}
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
