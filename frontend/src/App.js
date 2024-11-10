import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ReviewPage from "./pages/review/ReviewPage";
import LivePage from "./pages/live/LivePage";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ReviewPage />} />
          <Route path="/live" element={<LivePage />} />
          <Route path="*" element={<ReviewPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
