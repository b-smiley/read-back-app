import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LiveViewPage from "./pages/live-view/LiveViewPage";
import ReviewPage from "./pages/review/ReviewPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LiveViewPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="*" element={<LiveViewPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
