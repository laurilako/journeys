import React, { useState } from "react";
import {
    ModalContent,
    IconButton,
    ModalFooter,
    Modal,
    useDisclosure,
    ModalOverlay,
  } from "@chakra-ui/react";
import { GrClose } from "react-icons/gr";  
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
                    <ModalFooter mb='-5' mt='-5' mr='-6' justifyContent={'right'}>
                        <IconButton icon={<GrClose />} bgColor={'#dadaff'} size={'sm'} onClick={onClose}>
                        </IconButton>
                    </ModalFooter>
                    <SingleStation stations={stations} id={id} />
                </ModalContent>
            </Modal>

            <TableComponent
                searchableColumns={['name']}
                heading='LIST OF STATIONS'
                headers={['Station', 'More info']}
                columns={['name', 'stationId']}
                rows={stations}
                buttons={[{icon: 'FiInfo', colorScheme: 'teal', variant: 'ghost', onClick: handleClick}]}
                />
        </>
    );
}
