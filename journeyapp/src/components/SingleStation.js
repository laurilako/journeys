import React, { useState, useEffect } from 'react';
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Spinner,
    StatGroup,
    Heading,
  } from '@chakra-ui/react'
import { Card } from '@chakra-ui/react';

// Component to show the number of started and ended journeys at a station
const SingleStation = ({ stations, id }) => {  
    const [stationJourneyData, setStationJourneyData] = useState([]);
    
    const station = stations.find(station => station.stationId === id);

    useEffect(() => {
        const fetchStationJourneyData = async () => {
            const response = await fetch(`http://localhost:3000/api/journeys/station/${station.stationId}`);
            const data = await response.json();
            setStationJourneyData(data);
        }
        if (stationJourneyData.length === 0) {
            fetchStationJourneyData();
        }
        fetchStationJourneyData();
    }, [])

    // TODO: Add a loading spinner
    if (stationJourneyData.length === 0) {
        return <Spinner>Loading...</Spinner>
    }

    // TODO: Style the card

    return (
        <>
            <Heading fontSize={'15'}>{station.name}, {station.osoite}, {station.kaupunki}</Heading>
            <StatGroup>
                <Stat>
                    <StatLabel mt='2'>Journeys started</StatLabel>
                    <StatNumber>{stationJourneyData.departureStationCount}</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel mt='2'>Journeys ended</StatLabel>
                    <StatNumber>{stationJourneyData.returnStationCount}</StatNumber>
                </Stat>
            </StatGroup>
        </> 
    )
}

export default SingleStation;