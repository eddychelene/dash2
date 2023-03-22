import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
}

export function PaginationItem({ number, isCurrent = false, onPageChange }: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button 
        size="md"
        width="4"
        colorScheme="blue"
        disabled
        _disabled={{
          bgColor: 'blue.500',
          cursor: 'default'
        }}
      >
        {number}
      </Button>
    )
  }

  return (
    <Button 
      size="md"
      width="4"
      bg="gray.300"
      colorScheme="blue"
      _hover={{
        bg: 'gray.500'
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  )
  
}