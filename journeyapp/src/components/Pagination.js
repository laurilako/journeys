import { Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { usePagination } from './usePagination';

const Pagination = ({ currentPage, totalCount, siblingCount=1, pageSize, onPageChange }) => {

    const paginationRange = usePagination({
        currentPage: currentPage,
        totalCount: totalCount,
        siblingCount: siblingCount,
        pageSize: pageSize,
    });

    // if less than 2 times in range, don't show pagination
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    // if viewports are too small, show only next and previous buttons
    if (window.innerWidth < 768) {
        return (
            <Flex>
                <Button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    mr={2}
                    variant='outline'
                >
                    Previous
                </Button>
                <Button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === paginationRange[paginationRange.length - 1]}
                    ml={2}
                    variant='outline'
                >
                    Next
                </Button>
            </Flex>
        );
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];

    return (
        <Flex>
            <Button
                onClick={onPrevious}
                disabled={currentPage === 1}
                mr={2}
                variant='outline'
            >
                Previous
            </Button>
            {paginationRange.map((pageNumber, index) => {
                if (pageNumber === '...') {
                    return (
                        <Button
                            key={index}
                            variant='outline'
                            disabled
                            mx={2}
                        >
                            ...
                        </Button>
                    );
                }

                return (
                    <Button
                        key={index}
                        onClick={() => onPageChange(pageNumber)}
                        mx={2}
                        variant={currentPage === pageNumber ? 'solid' : 'outline'}
                    >
                        {pageNumber}
                    </Button>
                );
            })}
            <Button
                onClick={onNext}
                disabled={currentPage === lastPage}
                ml={2}
                variant='outline'
            >
                Next
            </Button>
        </Flex>
    );

    }


export default Pagination;