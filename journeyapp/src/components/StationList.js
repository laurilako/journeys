import React, { useCallback, useEffect, useState } from "react";
import {
    Heading,
    Table,
    Thead,
    Text,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Button,
    ModalContent,
    IconButton,
    ModalFooter,
    Modal,
    useDisclosure,
    ModalOverlay,
    Icon,
  } from "@chakra-ui/react";
import SingleStation from "./SingleStation";
import { FiInfo } from "react-icons/fi";

// List of stations with a button to open a modal with more info about the station
export default function StationList({ stations }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [id, setId] = useState('')

    console.log('stations', stations)

    const handleClick = (stationId) => {
        setId(stationId)
        onOpen()
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent alignItems={'center'}>
                    <SingleStation stations={stations} id={id} />
                    <ModalFooter justifyContent={'center'}>
                        <Button colorScheme="blue" size={'sm'} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Box borderWidth={'2px'} borderRadius='lg' padding={4}>
                    <Heading mb='5'>LIST OF STATIONS</Heading>
                    <Text>Showing {stations.length} stations</Text>
                    <Box h='70vh' overflowY="auto">
                        <Table size='sm' variant="striped" colorScheme="twitter">
                        <Thead position='sticky' top={0} zIndex={'docked'} bg="#dadaff">
                            <Tr>
                                <Th>Station</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {stations.map(({ stationId, name }) => (
                            <Tr key={stationId}>
                                <Td alignItems={'center'}>
                                    {name}
                                    <IconButton icon={<Icon as={FiInfo} />} colorScheme='teal' variant='ghost' onClick={() => handleClick(stationId)}></IconButton>
                                </Td>
                            </Tr>
                        ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </>
    );
}
