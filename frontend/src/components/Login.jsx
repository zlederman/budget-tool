import * as React from 'react';
import {
    Flex,
    Stack,
    Heading,
    Avatar,
    Box,
    Input,
    Button
} from '@chakra-ui/react'



const Login = (props) => {
    const [phone, setPhone] = React.useState()
    const [pass,setPass] = React.useState()
    const [isAuthed,setIsAuthed] = React.useState(false)
    async function hitLogin(loginObj) {
        console.log(loginObj)
        fetch("/api/auth/login",{
          method: "POST",
          headers : {
            "Content-Type":"application/json"
          },
          body: JSON.stringify(loginObj)
        })
        .then(data => data.json())
        .then(json =>{
            if(json.token){
                setIsAuthed(true)
                props.setToken(json.token)
            }else{
                setIsAuthed(false)
            }
        })
    }
    async function handleSubmit(e) {
        e.preventDefault()
        await hitLogin({
            "phone":phone,
            "password": pass
        })

    }
    return (
        <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="E5E3C9"
        alignItems="center"
        >
            <Stack
            mb="2"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            height="50vh"
            >
                <Avatar/>
                <Heading>Welcome</Heading>
                <Box 
                width="50wh">
                    <form>
                        <Input placeholder='phone' onChange={e => {setPhone(e.target.value)}}></Input>
                        <Input placeholder='password' onChange={e => {setPass(e.target.value)}}></Input>
                        <Button width="full" backgroundColor="789395" onClick={(e)=>{handleSubmit(e)}}>Login</Button>
                    </form>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Login