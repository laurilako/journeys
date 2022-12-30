import Sidebar from './components/Sidebar';
import JourneyList from './components/JourneyList';
import StationList from './components/StationList';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// render the sidebar, journey list and station list next to the sidebar

function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar > 
          <Routes>
            <Route path="/" element={<JourneyList />} />
            <Route path="/stations" element={<StationList />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;
