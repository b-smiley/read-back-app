import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import LiveViewPage from "./pages/live-view/LiveViewPage";
import ReviewPage from "./pages/review/ReviewPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ReviewPage />} />
          <Route path="/live-view" element={<LiveViewPage />} />
          <Route path="*" element={<ReviewPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
