import React, { useCallback, useEffect, useState } from "react";
import {
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Box,
    Button,
    ModalBody,
    ModalContent,
    IconButton,
    ModalFooter,
    Modal,
    useDisclosure,
    ModalOverlay,
  } from "@chakra-ui/react";
import SingleStation from "./SingleStation";

// List of stations with a button to open a modal with more info about the station
export default function StationList({ stations }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [id, setId] = useState('')

    const handleClick = (id) => {
        console.log(id)
        setId(id)
        onOpen()
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent alignItems={'center'}>
                    <SingleStation stations={stations} id={id} />
                    <ModalFooter justifyContent={'center'}>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Box padding={4}>
                    <Heading mb='5'>LIST OF STATIONS</Heading>
                    <Box overflowY="auto" maxHeight="600px">
                    <Table variant="striped" colorScheme="red">
                        <Thead position='sticky' top={0} zIndex={'docked'} bg='red.200'>
                            <Tr>
                                <Th>Station</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {stations.map(({ id, name }) => (
                            <Tr key={id}>
                                <Td>
                                    {name}
                                    <Button colorScheme='teal' variant='ghost' onClick={() => handleClick(id)}> More info </Button>
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
