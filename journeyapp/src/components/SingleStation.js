import React, { useState, useEffect } from 'react';
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
  } from '@chakra-ui/react'
import { Card } from '@chakra-ui/react';

// Component to show the number of started and ended journeys at a station
const SingleStation = ({ stations, id }) => {  
    const [stationData, setStationData] = useState([]);
    
    const station = stations.find(station => station.id === id);

    useEffect(() => {
        const fetchStation = async () => {
            const response = await fetch(`http://localhost:3000/api/journeys/station/${station.id}`);
            const data = await response.json();
            console.log(data);
            setStationData(data);
        }
        if (stationData.length === 0) {
            fetchStation();
        }
        console.log(station)
        console.log("STATIONDATA", stationData)
        fetchStation();
    }, [])

    return (
        <>
            <Card align='center' overflow='hidden' variant='outline'>
                <Stat>
                    <StatLabel>Station: <StatNumber>{station.name}</StatNumber></StatLabel>
                    <StatHelpText>Number of started journeys: <StatNumber>{stationData.departureStationCount}</StatNumber></StatHelpText>
                    <StatHelpText>Number of ended journeys: <StatNumber>{stationData.returnStationCount}</StatNumber></StatHelpText>
                </Stat>
            </Card>
        </> 
    )
}

export default SingleStation;