import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import JourneyList from './components/JourneyList';
import StationList from './components/StationList';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  const [journeys, setJourneys] = useState([]);
  const [stations, setStations] = useState([]);

  // fetch journeys from backend only on first render
  useEffect(() => {
    const fetchJourneys = async () => {
      const response = await fetch('/api/journeys');
      const data = await response.json();
      setJourneys(data);
    }
    if (journeys.length === 0) {
      fetchJourneys();
    }
  }, []);

  // fetch stations from backend only on first render
  useEffect(() => {
    const fetchStations = async () => {
      const response = await fetch('/api/stations');
      const data = await response.json();
      setStations(data);
    }
    if (stations.length === 0) {
      fetchStations();
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
          <Sidebar>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/journeys" element={<JourneyList journeys={journeys} />} />
              <Route path="/stations" element={<StationList stations={stations} />} />
            </Routes>
          </Sidebar>
      </BrowserRouter>
    </div>

  );
}

export default App;
