import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react"
import { FiInfo } from 'react-icons/fi'
import { IconButton, Icon } from "@chakra-ui/react"

const TableComponent = ({ headers, columns, rows, buttons }) => {
    return (
        <Table size='sm' variant="striped" colorScheme="twitter">
            <Thead position='sticky' top={0} zIndex={'docked'} bg="#dadaff">
                <Tr>
                    {headers.map((header, index) => (
                        <Th key={index}>{header}</Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {rows.map((row, index) => (
                    <Tr key={index}>
                        {columns.map((column, index) => (
                            column === 'stationId' && buttons ? <Td key={index}><IconButton icon={<Icon as={FiInfo} />} colorScheme="teal" variant="ghost" onClick={() => buttons[0].onClick(row[column])}/></Td> :
                            <Td key={index}>{row[column]}</Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
        </Table>
    )
}

export default TableComponent;