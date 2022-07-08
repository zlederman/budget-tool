import './App.css';
import { useState } from 'react';
import {ChakraProvider} from "@chakra-ui/react";
import Login from './components/Login'
import ConfigForm from './components/CreateConfigForm'
// import HomePage from './components/HomePage'

function App() {
  const [token, setToken] = useState()
  return ( 

    <ChakraProvider>
      {/* {
        !token && <Login setToken={setToken}/>
      }{
        // token && <HomePage token={token}/>
      } */}
      <ConfigForm/>
    </ChakraProvider>
  );
}

export default App;
