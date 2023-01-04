import { Flex, 
    Heading,
    Box,
    Text,

} from "@chakra-ui/react";
import React from "react";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const Home = () => {
    return (        
        <>
            <Flex direction="column" align="center" justify="center" mt={'40px'}>
                <Heading>Home</Heading>
                <Text>View journeys</Text>
                <Text>View stations</Text>            
            </Flex>


            <Flex direction="column" alignItems={'center'} justifyContent='space-around' wrap={'nowrap'} justify="center" h="70vh">
                <Box border='1px'>
                    <Heading>
                        Add new journey
                    </Heading>
                </Box>
                <Box border='1px'>
                    <Heading>
                        Add new station
                    </Heading>
                </Box>
            </Flex>
        </>
    );
}

export default Home;
