import Head from 'next/head'
import { 
  Box,
  Flex, 
  Heading, 
  Table, 
  Icon, 
  Tbody,
  Text, 
  Th, 
  Thead, 
  HStack,
  Tr, 
  Td,
  Link as ChakraLink 
} from '@chakra-ui/react'

import { Sidebar } from '../../components/Sidebar'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { withSSRAuth } from '../../utils/withSSRAuth'
import { Pagination } from '../../components/Pagination'
import { usePolicies } from '../../services/hooks/usePolicies'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { RiSearch2Line, RiAddLine,RiEyeLine,RiPencilLine } from 'react-icons/ri';

import { Input } from '../../components/Form/Input';

import Link from 'next/link'

type SearchMessagesFormData = {
  search: string;
};

export function PolicyList() {
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const { register, handleSubmit } = useForm();

  const { data, isLoading } = usePolicies(page, searchQuery)

  const handleSearchMessages: SubmitHandler<SearchMessagesFormData> = async ({ search }) => {
    setPage(1)
    setSearchQuery(search);
  };

  return (
    <Box
      width="100%"
    >
      <Flex  justifyContent="space-between" alignItems="center">
        <Box>
          <Text mt="1" color="gray.400">Listagem completa de apólices</Text>
        </Box>

        <Flex>
          <Flex 
            as="form" 
            onSubmit={handleSubmit(handleSearchMessages)}
          >
            <Input
              name="search"
              placeholder="Buscar apólices"
              {...register('search')}
            />

            <Button
              ml="2"
              disabled={isLoading}
              isLoading={isLoading}
            >
              <Icon as={RiSearch2Line} />
            </Button>
          </Flex>
          <Link href="/policies/create">
            <Button
              ml="2"
              maxW={59}
            >
              <Icon as={RiAddLine} />
            </Button>
          </Link>
        </Flex>
      </Flex>

      <Table color="gray.500">
        <Thead >
          <Tr color="gray.500">
            <Th>Referência</Th>
            <Th>Segurado</Th>
            <Th>Valor Bruto</Th>
            <Th>Data de vencimento</Th>
            <Th>Ramo</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.policies.map((policy) => (
              <Tr key={policy.id}>
                <Td>
                  {policy.reference}
                </Td>
                <Td>{policy.customer.name}</Td>
                <Td>{policy.simple_price}</Td>
                <Td>{policy.due_date}</Td>
                <Td>{policy.insurance_category.title}</Td>
                <Td>
                  <HStack>
                    <ChakraLink
                        as='a'
                        size='sm'
                        fontSize='sm'
                        href={`#`}
                    >
                        <Icon as={RiEyeLine} color='blue.600' fontSize='20'/>
                    </ChakraLink>
                    
                    <ChakraLink
                        as='a'
                        size='sm'
                        fontSize='sm'
                        href={`#`}
                    >
                        <Icon as={RiPencilLine} color='blue.600' fontSize='20'/>
                    </ChakraLink>
                  </HStack>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>

      <Pagination 
        totalCountOfRegisters={data?.totalCount}
        currentPage={page}
        onPageChange={setPage}
        currentCountOfPosts={data?.policies.length}
      /> 
    </Box>
  )
}

export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  };
});