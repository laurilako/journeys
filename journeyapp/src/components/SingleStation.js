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
    
    const station = stations.find(station => station.stationId === id);

    console.log("STATION", station)

    useEffect(() => {
        const fetchStation = async () => {
            const response = await fetch(`http://localhost:3000/api/journeys/station/${station.stationId}`);
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
            <Card border={'none'} align='center' overflow='hidden' variant='outline'>
                <Stat>
                    <StatLabel><StatNumber>{station.name}</StatNumber></StatLabel>
                    <StatHelpText><StatNumber>{stationData.departureStationCount}</StatNumber> Journeys started from here</StatHelpText>
                    <StatHelpText><StatNumber>{stationData.returnStationCount}</StatNumber> Journeys ended here</StatHelpText>
                </Stat>
            </Card>
        </> 
    )
}

export default SingleStation;