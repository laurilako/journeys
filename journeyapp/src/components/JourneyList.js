import React, { useState, useMemo, useEffect } from 'react';
import {
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Spinner,
  } from "@chakra-ui/react";
import Pagination from './Pagination';

// List of journeys
export default function JourneyList({ journeys }) {
    const [currentPage, setCurrentPage] = useState(1);
    let pageSize = 100;

    const currentJourneys = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return journeys.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, journeys]);

    return (
        <>      
                <Box padding={4}>
                        <Heading mb='5'>LIST OF JOURNEYS</Heading>
                        <Box h='md' overflowY="auto">
                        <Table size='sm' variant="striped" colorScheme="red">
                            <Thead position='sticky' top={0} zIndex={'docked'} bg="#dadaff">
                                <Tr>
                                    <Th>Departure Station</Th>
                                    <Th>Return Station</Th>
                                    <Th>Covered Distance (km)</Th>
                                    <Th>Duration (min)</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                            {journeys.length === 0 ? 
                            <Heading mt={'4'} display='flex' size='md' textAlign='center'>Fetching journeys <Spinner ml={'2'} /></Heading>
                            : 
                            currentJourneys.map(({ departureStationName, returnStationName, coveredDistance, duration, id }) => (
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
                    <Box mt='5' display='flex' justifyContent={'center'}>
                        {journeys.length === 0 ? null : 
                        <Pagination
                            currentPage={currentPage}
                            totalCount={journeys.length}
                            pageSize={pageSize}
                            onPageChange={page => setCurrentPage(page)}
                        />
                        }
                    </Box>
                </Box>
        </>
    );
}