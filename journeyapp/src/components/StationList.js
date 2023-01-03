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
import TableComponent from './TableComponent';

// List of stations with a button to open a modal with more info about the station
export default function StationList({ stations }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [id, setId] = useState('')
    const handleClick = (stationId) => {
        setId(stationId)
        onOpen()
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={'white'} padding={'5'}>
                    <SingleStation stations={stations} id={id} />
                    <ModalFooter justifyContent={'center'}>
                        <Button bgColor={'#dadaff'} size={'sm'} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Box borderWidth={'2px'} borderRadius='lg' padding={4}>
                    <Heading mb='5'>LIST OF STATIONS</Heading>
                    <Text>Showing {stations.length} stations</Text>
                    <Box h='70vh' overflowY="auto">
                    <TableComponent 
                        headers={['Station', '']}
                        columns={['name', 'stationId']}
                        rows={stations}
                        buttons={[{icon: 'FiInfo', colorScheme: 'teal', variant: 'ghost', onClick: handleClick}]}
                    />
                </Box>
            </Box>
        </>
    );
}
