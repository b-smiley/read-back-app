import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Transcript, {
  getTranscript,
} from "../../components/Transcript/Transcript";
function LiveViewPage() {
  const jsonResponse = getTranscript();
  return (
    <div>
      <NavBar />
      {/* TODO Title */}

      <Transcript
        transcript={jsonResponse.transcript}
        keywords={jsonResponse.keywords}
        mode={"live"}
      />
    </div>
  );
}
export default LiveViewPage;
