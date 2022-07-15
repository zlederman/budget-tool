import './App.css';
import { useState } from 'react';
import {ChakraProvider,Spinner,Modal} from "@chakra-ui/react";
import Login from './components/Login'
import ConfigForm from './components/CreateConfigForm'
// import HomePage from './components/HomePage'
import {Box} from "@chakra-ui/react"



function App() {
  const [token, setToken] = useState()
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

  }

  return ( 

    <ChakraProvider>
      <Box bg="gray.900">
          <ConfigForm setConfig={postConfig}/>
        </Box>
      
 
    </ChakraProvider>
  );
}

export default App;
