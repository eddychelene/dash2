import { VStack, Link, Text, Flex, Button, useBreakpointValue } from "@chakra-ui/react";
import { 
  RiUser5Line,
  RiBankLine, 
  RiPencilRulerLine, 
  RiUser6Line, 
  RiDashboardLine,
  RiLogoutBoxLine 
} from "react-icons/ri";
import { signOut } from "../../contexts/AuthContext";
import { ActiveLink } from "../ActiveLink";

export function SidebarNav() {
  const isWideVersion = useBreakpointValue({
    base :false,
    lg: true
});

  function handleSignOut() {
    signOut()
  }

  return (
    <Flex
      as="aside" 
      minH="calc(100vh - 8rem)"
      bgColor="white" 
      py="8"
      shadow={isWideVersion && "0 0 20px rgba(0, 0, 0, 0.05)"}
      borderRadius={4}
      direction="column"
    >
      <VStack spacing="4" pr="8" alignItems="stretch">
        <Text fontWeight="bold" color="gray.700" fontSize="small" px={8}>MK SEGUROS</Text>
        <ActiveLink href="/messages" passHref>
          <Link display="flex" alignItems="center" py="1" pl={8} borderLeft="3px solid">
            <RiDashboardLine size="20" />
            <Text ml="4" fontSize="medium" fontWeight="medium">Dashboard</Text>
          </Link>
        </ActiveLink>
        <ActiveLink href="/subscribers" passHref>
          <Link display="flex" alignItems="center" py="1" pl={8} borderLeft="3px solid">
            <RiBankLine size="20" />
            <Text ml="4" fontSize="medium" fontWeight="medium">Balcões</Text>
          </Link>
        </ActiveLink>
        <ActiveLink href="/policies" passHref>
          <Link display="flex" alignItems="center" py="1" pl={8} borderLeft="3px solid">
            <RiPencilRulerLine size="20" />
            <Text ml="4" fontSize="medium" fontWeight="medium">Apólices</Text>
          </Link>
        </ActiveLink>
        <ActiveLink href="/tags" passHref>
          <Link display="flex" alignItems="center" py="1" pl={8} borderLeft="3px solid">
            <RiUser6Line size="20" />
            <Text ml="4" fontSize="medium" fontWeight="medium">Clientes</Text>
          </Link>
        </ActiveLink>
        <ActiveLink href="/tags" passHref>
          <Link display="flex" alignItems="center" py="1" pl={8} borderLeft="3px solid">
            <RiUser5Line size="20" />
            <Text ml="4" fontSize="medium" fontWeight="medium">Usuários</Text>
          </Link>
        </ActiveLink>
      </VStack>
      <Button
        onClick={handleSignOut}
        variant="link"
        alignSelf="flex-start"
        display="flex"
        alignItems="center"
        py="1"
        ml={8}
        mt="auto"
      >
        <RiLogoutBoxLine size="20" />
        <Text ml="4" fontSize="medium" fontWeight="medium">Logout</Text>
      </Button>
    </Flex>
  );
}