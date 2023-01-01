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
      const response = await fetch('http://localhost:3000/api/journeys');
      const data = await response.json();
      setJourneys(data);
    }
    if (journeys.length === 0) {
      fetchJourneys();
    }
  }, []);

  // map each station only once from journeys
  useEffect(() => {
    const mapStationsFromJourneys = (journeys) => {
      // unique stations
      const stations = journeys.reduce((o, journey) => {
        const departureStation = {
          id: journey.departureStationId,
          name: journey.departureStationName
        }
        if(!o.find(station => station.id === departureStation.id)) {
          o.push(departureStation);
        }
        return o;
      }, []);
      return stations;
    }
    const stations = mapStationsFromJourneys(journeys);
    setStations(stations);
  }, [journeys]);

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
