import React, { useMemo, useState } from 'react';
import { 
    Table, 
    Thead, 
    Input,
    Tbody, 
    Tr, 
    Th, 
    Td, 
    Box, 
    Heading,
    Text,
    Flex,
} from "@chakra-ui/react"
import { FiInfo } from 'react-icons/fi'
import { IconButton, Icon } from "@chakra-ui/react"
import Pagination from './Pagination';
import { filterRows } from '../util/utils';

const TableComponent = ({ heading, headers, columns, rows, buttons, searchableColumns }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({})
    let pageSize = 100;

    const filteredRows = filterRows(rows, filters);

    const calculatedRows = filteredRows.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    )

    const currentRows = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return rows.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, rows]);

    const handleSearch = (value, searchKey) => {
        setCurrentPage(1);
        if (value === '') {
            setFilters({})
        }
        else {
            setFilters({[searchKey]: value})
        }

    }

    return (
        <>
            <Box borderWidth={'2px'} borderRadius='lg' padding={4}>
                <Heading mb='5'>{heading}</Heading>
                {searchableColumns &&
                    <Flex>
                        {searchableColumns.map((column, index) => (
                            <Input size={'md'} key={index} placeholder={`Search by ${headers[index]}`} onChange={(e) => handleSearch(e.target.value, column)} />
                        ))}
                    </Flex>
                    }
                    <Text>Showing {calculatedRows.length} of {rows.length}</Text>
                        <Box h='70vh' overflowY='auto'>
                            <Table size='sm' variant="striped" colorScheme="twitter">
                                <Thead position='sticky' top={0} zIndex={'docked'} bg="#dadaff">
                                    <Tr>
                                        {headers.map((header, index) => (
                                            <Th key={index}>      
                                                <span>{header}</span>
                                            </Th>
                                        ))}
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {calculatedRows.map((row, index) => (
                                        <Tr key={index}>
                                            {columns.map((column, index) => (
                                                column === 'stationId' && buttons ? <Td key={index}><IconButton icon={<Icon as={FiInfo} />} 
                                                colorScheme="teal" variant="ghost" onClick={() => buttons[0].onClick(row[column])}/></Td> :
                                                <Td key={index}>{row[column]}</Td>
                                            ))}
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                    <Box mt='5' display='flex' justifyContent={'center'}>
                        <Pagination
                            currentPage={currentPage}
                            totalCount={rows.length}
                            pageSize={pageSize}
                            onPageChange={page => setCurrentPage(page)}
                        />
                    </Box>
            </Box>
        </>
    )
}


export default TableComponent;