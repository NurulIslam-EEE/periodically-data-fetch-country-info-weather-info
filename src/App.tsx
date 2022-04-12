import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Story from "./components/Story/Story";
import RawData from "./components/RawData/RawData";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Story />}></Route>
          <Route path="/rawData/:id/:page" element={<RawData />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
