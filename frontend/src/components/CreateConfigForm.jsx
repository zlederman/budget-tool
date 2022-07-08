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

const ConfigContext = React.createContext({})
const ConfigProvider = ConfigContext.Provider;

const LiItem = (props) =>{
    // const {onDelete} = useContext(ConfigContext)
    return(
        <ListItem marginBottom='2'  flexDirection='row' display='flex'>
            <Input bg='gray.200'  borderWidth='0' onChange={(e)=> {}}/>
            <Button marginLeft='3px' colorScheme='red' onClick={()=> props.deleter(props.id)}><DeleteIcon/></Button>
        </ListItem>
    )
}
const DynamicTextList = (props) => {
    
    const expandListItem = (props) => {
        return props.listItems.map((x,idx)=> <LiItem key={idx} deleter={props.deleter} id={x}/>)
    }
    return(
        <List>
            {expandListItem(props)}
        </List>
    )
}
const FormBlock = (props) => {
    const [items,setItems] = React.useState([])

    function appendItems(item) {
        setItems(oldArr => [...oldArr,item])
    }
    function deleteItem(item) {
        setItems(items.filter((key)=>key !== item))
    }
    return(
        <Box marginBottom='9' borderRadius='5px' boxShadow='md'>
            <Heading size='md'color='white'>
                {props.heading}
            </Heading>
            <Text color='gray.400'>
                <i>{props.subHeading}</i>
            </Text>
            <DynamicTextList listItems={items}  deleter={deleteItem}/>
            <Button backgroundColor='gray.600' color='gray.200' minWidth='100%' onClick={()=>{appendItems(items.length+1)}}>+</Button>
        </Box>

    )
}
const ConfigForm = (props) => {
    const [typeItems,setTypes] = React.useState([])
    const [methodItems,setMethods] = React.useState([])
    const [typeData, setTypeData] = React.useState([])

    function addTypeInp(next) {
        setTypes(oldArr => [...oldArr,next])
    }
    function addMethodInp(next) {
        setMethods(oldArr => [...oldArr,next])
    }

    return (
        <ConfigProvider >
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
                    <FormBlock 
                        heading='Add your purchase types'
                        subHeading='e.g. essentials, fun, food'
                    />
                    <Box padding='4'></Box>
                    <FormBlock 
                        heading='Add your payment methods'
                        subHeading='e.g. credit, debit, cash'
                    />
                    <Box padding='3'></Box>
                    <Button colorScheme='teal'>Submit</Button>
                    
                </Stack>
            </Flex>
        </ConfigProvider>
        
    )
}

export default ConfigForm