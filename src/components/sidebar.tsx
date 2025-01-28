import * as React from "react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    Button,
    Box,
} from '@chakra-ui/react'
import {ChevronLeftIcon, ChevronRightIcon, HStack, VStack} from "@chakra-ui/icons";

export default function Sidebar() {
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <>
            <Button height='100vh' width='10px' padding='0px' borderRadius='0px' colorScheme='teal'
                    onClick={onOpen}>
                <ChevronRightIcon boxSize={7}></ChevronRightIcon>
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <HStack spacing={0}>
                        <Box>
                            <DrawerHeader>Scott Langridge</DrawerHeader>

                            <DrawerBody>
                                <VStack>
                                    <Button width='100px' variant='ghost' colorScheme='teal'>Photography</Button>
                                </VStack>
                            </DrawerBody>

                            <DrawerFooter>
                            </DrawerFooter>
                        </Box>
                        <Button
                            position="absolute"
                            top="0px"
                            right="0px"
                            margin={0}
                            padding={0}
                            colorScheme="teal"
                            borderRadius='0px'
                            height='100vh'
                            onClick={onClose}
                        >
                            <ChevronLeftIcon boxSize={7}></ChevronLeftIcon>
                        </Button>

                    </HStack>
                </DrawerContent>
            </Drawer>
        </>
    )

}