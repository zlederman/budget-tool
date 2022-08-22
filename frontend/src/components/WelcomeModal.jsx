import { useState, useRef} from 'react';
import {Box,Lorem} from "@chakra-ui/react"

import {ChakraProvider,Spinner,Modal,Button,useDisclosure} from "@chakra-ui/react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

export default  function WelcomeModal() {
    const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen:true})
    const finalRef = useRef
    return (
      <>
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Welcome to BudgetBuddy!</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>
                Budget Buddy is your spending companion.
                tell it what you spent, how you spent it and how it fits into your life like this<br></br><br></br>
                <i>Coffee,food,$4,credit</i><br></br><br></br>
                Configure your Budget Buddy by filling out the form and watch your phone!
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

