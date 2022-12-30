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

export default function StationList({ stations }) {
    console.log(stations)
    return (
        <>
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
                                <Td>{name}</Td>
                            </Tr>
                        ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </>
    );
}
