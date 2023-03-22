import { useContext } from "react";
import { Flex, Avatar, Box, Text, HStack, useBreakpointValue, Icon, IconButton } from "@chakra-ui/react";
import Image from 'next/image';
import { RiMenuLine } from 'react-icons/ri'

import { AuthContext } from "../contexts/AuthContext";
import { useSidebarDrawer } from "../contexts/SidebarDrawerContext";

import  Logo  from '../assets/logo.png';

export function Header() {
  const { user } = useContext(AuthContext)
  const {onOpen}=useSidebarDrawer()

  const isWideVersion = useBreakpointValue({
      base :false,
      lg: true
  });

  return (
    <Flex 
      as="header" 
      h="20" 
      bgColor="white" 
      px="8"
      shadow="0 0 20px rgba(0, 0, 0, 0.05)"
    >
      <Flex
        width="100%"
        maxWidth={1480}
        marginX="auto"
        alignItems="center"
        justifyContent="space-between"
      >
        {!isWideVersion && (
            <IconButton
              icon={<Icon as={RiMenuLine}/>}
              fontSize='24'
              variant='unstyled'
              onClick={onOpen}
              mr='2'
              aria-label='Open Navegation'
            >

            </IconButton>
        )}
        <Image src={Logo} alt="Logotipo" width={100} height={30}/>

        <HStack spacing="4" alignItems="center">
          <Box textAlign="right">
            <Text fontWeight="medium">{user?.name}</Text>
            <Text color="gray.500" fontSize="small">{user?.email}</Text>
          </Box>
          <Avatar size="md" name={user?.name}src="" />
        </HStack>
      </Flex>
    </Flex>
  );
}