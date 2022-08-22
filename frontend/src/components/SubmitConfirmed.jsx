import { useState, useRef} from 'react';

import { CheckIcon} from '@chakra-ui/icons'
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

export default function SubmitConfirmed() {
    return(
        <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.900"
        alignItems="center"
        padding='4'>
            <Box>
                <Heading size='2xl'marginBottom='4' marginTop='30'color='white'>
                            Submission Confirmed <CheckIcon/>
                        </Heading>

            </Box>
        </Flex>
     
    )
}