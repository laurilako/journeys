import { Flex, 
    Heading,
    Box,
    Text,
    ButtonGroup,
    Button,
    Stack

} from "@chakra-ui/react";
import React from "react";
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (        
        <>
            <Flex direction="column" align="center" justify="center" mt={'150px'}>
                <Heading>JourneyApp</Heading>
                <Text textAlign={'center'} mt='4'><br /> 
                App where you can view city bike journeys and stations <br /></Text>
                <Stack direction="column" spacing={2} mt='15px'>
                        <NavLink to="/journeys">
                            <Button w={'100%'} colorScheme={'twitter'} >
                                <Text>JOURNEYS</Text>
                            </Button>
                        </NavLink>
                        <NavLink to="/stations">
                            <Button w={'100%'} colorScheme={'twitter'} >
                                <Text>STATIONS</Text>
                            </Button>
                        </NavLink>
                </Stack>
            </Flex>
        </>
    );
}

export default Home;
