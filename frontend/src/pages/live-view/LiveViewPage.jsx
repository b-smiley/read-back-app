import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Transcript, {
  getTranscript,
} from "../../components/Transcript/Transcript";
import LiveCamera from "./camera/LiveCamera";
import Title from "../../components/Title/Title";

function LiveViewPage() {
  const [selectedWord, setSelectedWord] = useState("");
  const jsonResponse = getTranscript();
  return (
    <div>
      <Title caseName="Smiths Divorce Settlements" />
      {/* TODO Title */}
      {selectedWord}
      <LiveCamera />
      <Transcript
        setSelectedWord={setSelectedWord}
        transcript={jsonResponse.transcript}
        keywords={jsonResponse.keywords}
        mode={"live"}
      />
    </div>
  );
}
export default LiveViewPage;
