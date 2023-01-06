import React, { useState, useEffect } from 'react';
import {
    Stat,
    StatLabel,
    StatNumber,
    Text,
    Spinner,
    StatGroup,
    Heading,
    AspectRatio
  } from '@chakra-ui/react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import '../../node_modules/leaflet/dist/leaflet.css';
const SingleStation = ({ stations, id }) => {  
    const [stationJourneyData, setStationJourneyData] = useState([]);
    const station = stations.find(station => station.stationId === id);

    useEffect(() => {
        const fetchStationJourneyData = async () => {
            const response = await fetch(`/journeys/station/${station.stationId}`);
            const data = await response.json();
            setStationJourneyData(data);
        }
        if (stationJourneyData.length === 0) {
            fetchStationJourneyData();
        }
        fetchStationJourneyData();
    }, [])

    if (stationJourneyData.length === 0) {
        return <Spinner>Loading...</Spinner>
    }

    const icon = new Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    return (
        <>
            <Heading fontSize={'15'}>{station.name}, {station.osoite}, {station.kaupunki}</Heading>
                <Text mt={'1'}>{station.operaattor}</Text>
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
                <StatGroup>
                    <Stat>
                        <StatLabel mt='2'>Average distance for journey starting here</StatLabel>
                        <StatNumber>{stationJourneyData.departureStationDistance} km</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel mt='2'>Average distance for journey ending here</StatLabel>
                        <StatNumber>{stationJourneyData.returnStationDistance} km</StatNumber>
                    </Stat>
                </StatGroup>
                <AspectRatio mt='3' ratio={1}>
                <MapContainer center={[station.y, station.x]} zoom={15} scrollWheelZoom={false}>       
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'/>
                    <Marker icon={icon} position={[station.y, station.x]}>
                        <Popup>
                            {station.name}
                        </Popup>
                    </Marker>
                </MapContainer>
                </AspectRatio>
        </> 
    )
}

export default SingleStation;