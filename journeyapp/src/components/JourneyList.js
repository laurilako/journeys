import React, { useState, useEffect } from 'react';
import {
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
  } from "@chakra-ui/react";

// example journey data in JSON
// {
//     "departure": "2021-05-31T23:57:25",
//     "return": "2021-06-01T00:05:46",
//     "departureStationId": "094",
//     "departureStationName": "Laajalahden aukio",
//     "returnStationId": "100",
//     "returnStationName": "Teljäntie",
//     "coveredDistance": "2043",
//     "duration": "500",
//     "id": "63addbadcd8bc3234e10250c"
// }

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
    }
]

export default function JourneyList({ items, curPage, journeyLimit }) {

    const [journeys, setJourneys] = useState([]);

    useEffect(() => {
        const getJourneys = async () => {
            const response = await fetch(`http://localhost:3000/api/journeys`);
            const data = await response.json();
            return data;
        }
        const fetchJourneys = async () => {
            const journeys = await getJourneys();
            setJourneys(journeys);
        }
        fetchJourneys();
    }, [curPage]);


    return (
        <>
            <Box padding={4}>
                    <Heading mb='5'>List of journeys</Heading>
                    <Box overflowY="auto" maxHeight="600px">
                    <Table variant="striped" colorScheme="red">
                        <Thead position='sticky' top={0} zIndex={'docked'} bg='red.200'>
                            <Tr>
                                <Th>Departure Station</Th>
                                <Th>Return Station</Th>
                                <Th>Covered Distance (km)</Th>
                                <Th>Duration (min)</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {journeys.map(({ departureStationName, returnStationName, coveredDistance, duration, departureStationId }) => (
                            <Tr key={departureStationId}>
                                <Td>{departureStationName}</Td>
                                <Td>{returnStationName}</Td>
                                <Td>{(coveredDistance / 1000).toFixed(2)}</Td>
                                <Td>{(duration / 60).toFixed(2)}</Td>
                            </Tr>
                        ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </>
    );
}