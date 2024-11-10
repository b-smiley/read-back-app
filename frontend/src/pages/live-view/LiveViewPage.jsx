import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Transcript, {
  getTranscript,
} from "../../components/Transcript/Transcript";

function LiveViewPage() {
  const [selectedWord, setSelectedWord] = useState("");
  const jsonResponse = getTranscript();
  return (
    <div>
      <NavBar />
      {/* TODO Title */}
      {selectedWord}
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
