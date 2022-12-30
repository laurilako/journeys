import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import JourneyList from './components/JourneyList';
import StationList from './components/StationList';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {

  const testjourneys = [
    {
        departure: "2021-05-31T23:57:25",
        return: "2021-06-01T00:05:46",
        departureStationId: "094",
        departureStationName: "Laajalahden aukio",
        returnStationId: "100",
        returnStationName: "Teljäntie",
        coveredDistance: "2043",
        duration: "500",
        id: "63addbadcd8bc3234e10250c"
    },
    {
        departure: "2021-05-31T02:57:12",
        return: "2021-05-31T03:05:46",
        departureStationId: "012",
        departureStationName: "Kamppi",
        returnStationId: "100",
        returnStationName: "Teljäntie",
        coveredDistance: "300",
        duration: "520",
        id: "63addbadcd8bc3234e10250d"
    },
    {
        departure: "2021-05-12T05:57:12",
        return: "2021-05-13T09:05:46",
        departureStationId: "012",
        departureStationName: "Testi",
        returnStationId: "100",
        returnStationName: "Teljäntie",
        coveredDistance: "2043",
        duration: "120",
        id: "63addbadcd8bc3234e10250e"
    }
  ]  
  
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
              <Route exact path="/" element={<JourneyList journeys={journeys} />} />
              <Route path="/stations" element={<StationList stations={stations} />} />
              {/* <Route path="/stations/:id" element={<SingleStation journeys={stations} stations={stations} />} /> */}
            </Routes>
          </Sidebar>
      </BrowserRouter>
    </div>

  );
}

export default App;
