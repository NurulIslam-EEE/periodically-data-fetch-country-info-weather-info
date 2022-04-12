import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Story from "./components/Story/Story";
import RawData from "./components/RawData/RawData";
import CountryInfo from "./components/CountryInfo/CountryInfo";
import CapitalInfo from "./components/CapitalWeather/CapitalInfo";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Story />}></Route>
          <Route path="/rawData/:id/:page" element={<RawData />}></Route>
          <Route path="/countryInfo/:country" element={<CountryInfo/>}></Route>
          <Route path="/capitalInfo/:capital" element={<CapitalInfo/>}></Route>
       
        </Routes>

      </Router>
    </div>
  );
}

export default App;
