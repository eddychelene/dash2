import { useDisclosure, useBreakpointValue, useColorModeValue, Flex, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import PolicyList from "./policies-list";
//import PolicyList from "./policies-list"

export default function Policy() {
  const [page, setPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isWideVersion = useBreakpointValue({
      base: false,
      lg: true
  });

  const colors = useColorModeValue(
      ['white', 'white', 'blue'],
      ['white', 'white', 'white'],
  )
  const [tabIndex, setTabIndex] = useState(0)
  const bg = colors[tabIndex]

  return (
      <>
          <Head>
            <title>Apólices</title>
          </Head>
          <Header />
          <Flex width='100%' maxWidth={1480} my='6' mx='auto' px='6' justify='space-between'>
              <Sidebar />
              <Tabs 
                width='100%'  
                maxWidth={[475,1100]} 
                size='md' 
                isLazy 
                variant='line' 
                isFitted 
                onChange={(index) => setTabIndex(index)} 
                colorScheme="blue"
                bg={bg}
                mt={4}
                px={2}
              >
                  <TabList mb='1em'>
                      <Tab _selected={{ color: 'blue.600', borderBottomColor: 'blue.600', bgColor: 'whiteAlpha.50' }}>
                          Apólices por vencer
                      </Tab>
                      <Tab _selected={{ color: 'blue.600', borderBottomColor: 'blue.600', bgColor: 'whiteAlpha.50'}}>
                        Apólices vencidas
                      </Tab>
                  </TabList>
                  <TabPanels>
                      <TabPanel >
                          <Flex align='center' justify='center'>
                            <PolicyList/>
                          </Flex>
                      </TabPanel>
                      <TabPanel>
                          <Flex align='center' justify='center'>
                          </Flex>

                      </TabPanel>
                  </TabPanels>
              </Tabs>

          </Flex>
      </>
  )
}