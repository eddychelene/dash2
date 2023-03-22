import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { SidebarNav} from "./Sidebar";

export function Sidebar(){
    const {isOpen, onClose} =useSidebarDrawer();
    const isDrawerSidebar=useBreakpointValue({
        base:true,
        lg:false
    })

    if(isDrawerSidebar){
        return(
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
            >
                <DrawerOverlay>
                    <DrawerContent bg='white' p='4'>
                        <DrawerCloseButton mt='6'/>
                        <DrawerHeader>MK SEGUROS</DrawerHeader>

                        <DrawerBody>
                            <SidebarNav/>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        )
    }
    return(
        <Box as='aside' w='64' mr='8' mt={4}>
            <SidebarNav/>
        </Box>
    )
}