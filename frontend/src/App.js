import './App.css';
import { useState } from 'react';
import {ChakraProvider,Spinner,Modal} from "@chakra-ui/react";
import ConfigForm from './components/CreateConfigForm'
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import SubmitConfirmed from './components/SubmitConfirmed';
import {Box} from "@chakra-ui/react"
import WelcomeModal from './components/WelcomeModal';


function App() {
  const [submit,setSubmit] = useState(false)
  function postConfig({methods,types,budgets,phone}){
    let purchaseTypes = []
    for(let i = 0; i < types.length;i++){
        purchaseTypes.push({
            type:types[i].text,
            budget:budgets[i].text
        })
    }
    let payload = {
        phone: phone,
        paymentMethods: methods.map(a=> a.text),
        purchaseTypes: purchaseTypes
    }
    fetch('/api/budget/submit-config',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(payload)
    })
    setSubmit(true)

  }

  return ( 

    <ChakraProvider>
      <Box bg="gray.900">
        <WelcomeModal/>
         {!submit &&<ConfigForm setConfig={postConfig}/>}
         {submit && <SubmitConfirmed/>}
        </Box>
      
 
    </ChakraProvider>
  );
}

export default App;
