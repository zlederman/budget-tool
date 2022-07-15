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
    Text,
    NumberInput,
    NumberInputField,
    InputLeftAddon,
    InputGroup,
    Spinner
} from '@chakra-ui/react'
import {DeleteIcon,PhoneIcon} from '@chakra-ui/icons'
import uuid from 'react-uuid'
const ConfigContext = React.createContext({})
const ConfigProvider = ConfigContext.Provider;

const LiItem = (props) =>{
    const context = React.useContext(ConfigContext)
    return(
        <ListItem marginBottom='2'  flexDirection='row' display='flex'>
            <Input bg='gray.200'  borderWidth='0' onChange={(e)=> {context.onChange({text:e.target.value, idx:props.idx})}}/>
            {context.onChangeBudget &&  <NumberInput  bg='gray.200' borderWidth='0' marginLeft='1.5'  borderRadius='md' ><InputGroup><InputLeftAddon children='$'/><NumberInputField  onChange={(e)=> {context.onChangeBudget({text:e.target.value, idx:props.idx})}} /></InputGroup></NumberInput>}
            <Button  colorScheme='red' marginLeft='1.5' onClick={()=> context.onDelete(props.id)}><DeleteIcon/></Button>
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

const PhoneBlock = (props) => {

    return(
        <Box marginBottom='9' borderRadius='5px' boxShadow='md'>
            <Heading size='md'color='white'>
                {props.heading}
            </Heading>
            <InputGroup>
            <InputLeftAddon children={<PhoneIcon color='gray.800' />} />
                <Input bg='gray.200'  borderWidth='0' type='tel' placeholder='phone number' onChange={(e) => {props.onChange(e.target.value)}} />
            </InputGroup>
        </Box>

    )
}



const ConfigForm = (props) => {
    const [typeItems,setTypes] = React.useState([])
    const [budgetItems,setBudget] = React.useState([])
    const [methodItems,setMethods] = React.useState([])
    const [phone,setPhone] = React.useState([])
    function appendType(item) {
        let budgetItem = {id: item.id + '-b',val:0}
        setTypes(oldArr => [...oldArr,item])
        setBudget(oldArr => [...oldArr,budgetItem])

    }
    function deleteType(id) {
        let newTypes= typeItems.filter((item)=>item.id !== id.id)
        let newBudgets = budgetItems.filter((item) => item.id != (id.id+'-b'))
        setTypes(newTypes)
        setBudget(newBudgets)
    }
    function changeType(obj){
        let types = [...typeItems]
        types[obj.idx].text = obj.text
        setTypes(types)
    }
    function changeBudget(obj){
        let budget = [...budgetItems]
        budget[obj.idx].text = obj.text
        setBudget(budget)
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
            onChangeBudget: changeBudget,
            data: typeItems,
            budgetData: budgetItems
        },
        methods : {
            onDelete: deleteMethod,
            onAppend: appendMethod,
            onChange: changeMethod,
            onChangeBudget: false,
            data:methodItems,
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
                    <PhoneBlock
                        heading='Add your phone number'
                        onChange={setPhone}
                    />
                    <Box padding='4'></Box>
                    <ConfigProvider value={contextValue.types}>
                        <FormBlock
                            onAppend={appendType}
                            items={typeItems}
                            heading='Add your purchase types and budget each week'
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
                    <Button 
                     colorScheme='teal'
                     onClick={()=>{props.setConfig({
                        methods:methodItems,
                        types:typeItems,
                        budgets:budgetItems,
                        phone:phone,
                    })}}
                    >Submit</Button>
                </Stack>
            </Flex>
 
      
        
    )
}

export default ConfigForm