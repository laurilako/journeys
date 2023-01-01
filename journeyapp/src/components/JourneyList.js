import React from 'react';
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


// List of journeys
export default function JourneyList({ journeys }) {
    return (
        <>
            <Box padding={4}>
                    <Heading mb='5'>LIST OF JOURNEYS</Heading>
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
                        {journeys.map(({ departureStationName, returnStationName, coveredDistance, duration, id }) => (
                            <Tr key={id}>
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