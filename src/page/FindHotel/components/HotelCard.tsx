import { Box, Checkbox, FormControl, FormLabel, Icon, IconButton, Input, Select, Skeleton, Textarea, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { HiOutlineMail } from 'react-icons/hi';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { EmailIcon } from '@chakra-ui/icons';
import SendEmail from '../../../layout/SendEmail';

type Props = {
    hotel: any,
    profile: any,
}

export default function HotelCard({hotel, profile}:Props) {

    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
        <Box 
        border={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        p={5}
        display={'flex'}
        >
            <Box flexGrow={'1'}>
            <Box><b>Attrezzature:</b> {hotel.attrezzature}</Box>
            <Box><b>Classificazione:</b> {hotel.classificazione}</Box>
            <Box><b>Categoria:</b> {hotel.categoria}</Box>
            <Box><b>Comune:</b> {hotel.comune}</Box>
            <Box display={'flex'}><b>Telefono:</b> <Skeleton>+8801784905517</Skeleton></Box>
            <Box display={'flex'}><b>Fax:</b> <Skeleton>+8801784905517</Skeleton></Box>            
            <Box display={'flex'}><b>Posta Elettronica:</b> <Skeleton>example@gmail.com</Skeleton></Box>
            <Box display={'flex'}><b>Indirizzo Internet:</b> <Skeleton>Indirizzo Internet:</Skeleton></Box>
            </Box>
            <Box ml={'16px'}>                
                {/* <SendEmail/> */}
            </Box>
        </Box>

        <>

        <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Contact Form</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Box>
                    <Box><b>From : </b>{profile.email}</Box>
                    <Box><b>To : </b>{hotel.posta_elettronica}</Box>
                </Box>
                <Box my={'16px'}>
                    <hr />
                </Box>
                <FormControl>
                    <FormLabel>
                        Type of Message
                    </FormLabel>
                    <Select placeholder='Select option'>
                    <option value='information'>Information</option>
                    <option value='reservation'>Reservation</option>
                    <option value='other'>Other</option>
                    </Select>
                </FormControl>
                <FormControl mt={"8px"}>
                    <FormLabel>
                        Number of rooms
                    </FormLabel>
                    <Select placeholder='Select option'>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>                
                    </Select>
                </FormControl>
                <FormControl mt={"8px"}>
                    <FormLabel>
                        Type of Rooms
                    </FormLabel>
                    <Select placeholder='Select option'>
                    <option value='single'>Single</option>
                    <option value='double two bed'>Double Two Bed</option>
                    <option value='double king bed'>Double King Bed</option>                    
                    </Select>
                </FormControl>
                <FormControl my={"16px"}>
                    <FormLabel>
                        Services Required
                    </FormLabel>
                    <Box display={'flex'} gap={'16px'}>
                        <Checkbox>Restaurant</Checkbox>
                        <Checkbox>Swimminpool</Checkbox>
                        <Checkbox>Spa</Checkbox>
                    </Box>
                </FormControl>
                <Box display={'flex'} flexDirection={'column'}>
                <FormControl mt={"8px"}>
                    <FormLabel>
                        Form
                    </FormLabel>
                    <Input type='date'/>
                </FormControl>
                <FormControl mt={"8px"}>
                    <FormLabel>
                        To
                    </FormLabel>
                    <Input type='date'/>
                </FormControl>
                </Box>
                <FormControl mt={"8px"}>
                    <FormLabel>
                        Contact Mail
                    </FormLabel>
                    <Input type='email'/>
                </FormControl>
                <FormControl mt={"8px"}>
                    <FormLabel>
                        Contact Phone
                    </FormLabel>
                    <Input type='phone'/>
                </FormControl>
                <FormControl mt={'8px'}>
                    <FormLabel>
                        Message
                    </FormLabel>
                    <Textarea placeholder='Here write your message' />
                </FormControl>
            </ModalBody>
            <ModalFooter>
            <Box display={'flex'} gap={'16px'}>
            <Button onClick={onClose}>Close</Button>
            <Button leftIcon={<EmailIcon />} colorScheme='teal' variant='solid'>
                Send
            </Button>
            </Box>
            </ModalFooter>
        </ModalContent>
        </Modal>
        </>
    </>
  )
}
