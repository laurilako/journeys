import React from 'react';
import TableComponent from './TableComponent';
import { Spinner } from '@chakra-ui/react';

// List of journeys
export default function JourneyList({ journeys }) {
    return (
        <>  
        {(journeys.length === 0 ? (<span >Fetching data...<Spinner mt='4px' ml={'4px'} /></span> ):
            <TableComponent
                searchableColumns={['departureStationName', 'returnStationName']}
                heading='LIST OF JOURNEYS'
                headers={['Departure Station', 'Return Station', 'Covered Distance (km)', 'Duration (min)']}
                columns={['departureStationName', 'returnStationName', 'coveredDistance', 'duration']}
                rows={journeys}
            />
        )}
    </>
    )
}