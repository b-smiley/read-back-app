import React from "react";
import Transcript, {
  getTranscript,
} from "../../components/Transcript/Transcript";
const jsonResponse = getTranscript();

function LivePage() {
  return (
    <Transcript
        transcript={jsonResponse.transcript}
        keywords={jsonResponse.keywords}
        mode={"live"}
      />
  );
}

export default LivePage;
