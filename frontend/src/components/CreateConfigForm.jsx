import * as React from 'react';
import {
    Flex,
    Stack,
    Heading,
    Box,
    Input,
    Button,
    List,
    ListItem,
    Text
} from '@chakra-ui/react'
import {DeleteIcon} from '@chakra-ui/icons'
import uuid from 'react-uuid'
const ConfigContext = React.createContext({})
const ConfigProvider = ConfigContext.Provider;

const LiItem = (props) =>{
    const context = React.useContext(ConfigContext)

    return(
        <ListItem marginBottom='2'  flexDirection='row' display='flex'>
            <Input bg='gray.200'  borderWidth='0' onChange={(e)=> {context.onChange({text:e.target.value, idx:props.idx})}}/>
            <Button marginLeft='3px' colorScheme='red' onClick={()=> context.onDelete(props.id)}><DeleteIcon/></Button>
        </ListItem>
    )
}
const DynamicTextList = (props) => {
    const context = React.useContext(ConfigContext)
    return(
        <List>
            {context.data.map((x,idx)=> <LiItem key={x.id}  id={x} idx={idx} />)}
        </List>
    )
}

const FormBlock = (props) => {

    return(
        <Box marginBottom='9' borderRadius='5px' boxShadow='md'>
            <Heading size='md'color='white'>
                {props.heading}
            </Heading>
            <Text color='gray.400'>
                <i>{props.subHeading}</i>
            </Text>
            <DynamicTextList />
            <Button backgroundColor='gray.600' color='gray.200' minWidth='100%' onClick={()=>{props.onAppend({id: uuid() ,text:""})}}>+</Button>
        </Box>

    )
}

function postConfig({methods,types,phone}){
    let payload = {
        phone: phone,
        paymentMethods: methods.map(a=> a.text),
        purchaseTypes: types.map(a=>a.text)
    }
}

const ConfigForm = (props) => {
    const [typeItems,setTypes] = React.useState([])
    const [methodItems,setMethods] = React.useState([])
   
    function appendType(item) {
        setTypes(oldArr => [...oldArr,item])
    }
    function deleteType(id) {
        let newTypes= typeItems.filter((item)=>item.id !== id.id)
        setTypes(newTypes)
    }
    function changeType(obj){
        let types = [...typeItems]
        types[obj.idx].text = obj.text
        setTypes(types)
    }
    function appendMethod(item) {
        setMethods(oldArr => [...oldArr,item])
    }
    function deleteMethod(id) {
        let newMethods= methodItems.filter((item)=>item.id !== id.id)
        setMethods(newMethods)
    }
    function changeMethod(obj){
        let methods = [...methodItems]
        methods[obj.idx].text = obj.text
        setMethods(methods)
    }

    const contextValue = {
        types : {
            onDelete: deleteType,
            onChange: changeType,
            onAppend: appendType,
            data: typeItems
        },
        methods : {
            onDelete: deleteMethod,
            onAppend: appendMethod,
            onChange: changeMethod,
            data:methodItems
        }
    }
    return (
    
            <Flex
                flexDirection="column"
                width="100wh"
                height="100vh"
                backgroundColor="gray.900"
                alignItems="center"
                padding='4'
            >
                <Stack
                    mb="2"
                    flexDir="column"
                >
                    <Heading size='2xl'marginBottom='4'color='white'>
                        Configure Your Budget Buddy
                    </Heading>
                    <ConfigProvider value={contextValue.types}>
                        <FormBlock
                            onAppend={appendType}
                            items={typeItems}
                            heading='Add your purchase types'
                            subHeading='e.g. essentials, fun, food'
                        />
                    </ConfigProvider>

                    <Box padding='4'></Box>

                    <ConfigProvider value={contextValue.methods}>
                        <FormBlock
                            onAppend={appendMethod}
                            items={methodItems}
                            heading='Add your payment methods'
                            subHeading='e.g. credit, debit, cash'
                        />
                    </ConfigProvider>
                    <Box padding='3'></Box>
                    <Button colorScheme='teal' onClick={()=>{postConfig({methods:methodItems,types:typeItems})}}>Submit</Button>
                    
                </Stack>
            </Flex>
 
      
        
    )
}

export default ConfigForm