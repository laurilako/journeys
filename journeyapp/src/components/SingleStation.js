import react from 'react';
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
  } from '@chakra-ui/react'

const SingleStation = ({ station }) => {  
    return (
    <Stat>
        <h1>Station name: {station.name}</h1>
        <StatLabel>Station address: {station.address}</StatLabel>
        <StatNumber>Total number of started journeys: {station.started}</StatNumber>
        <StatNumber>Total number of ended journeys: {station.ended}</StatNumber>
    </Stat>
    )
}