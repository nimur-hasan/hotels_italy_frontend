import React, { useState } from 'react'

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Select,
  Checkbox,
  Input,
  Textarea,
  ModalFooter
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EmailIcon,
} from '@chakra-ui/icons'
import { Link, useNavigate } from 'react-router-dom'
import { Dispatch, SetStateAction } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { appAxios } from '../axios'
import toast from 'react-hot-toast'

export default function SendEmail({}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [fromValues, setFormValues] = useState<any>({})
    const [serviceReq, setServiceReq] = useState<String[]>([])
    const [isProcessing, setIsProcessing] = useState(false)
    
    const handleChange = (e:any) => {
        const {name, value} = e.target
        const newFormValues = fromValues
        newFormValues[name] = value
        setFormValues(newFormValues)
    }

    const handleServiceRequired = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {checked, value} = e.target
        console.log(value, checked)
    
        let updatedserviceReqs:String[] = []
    
        if (checked){
          updatedserviceReqs = [...serviceReq, value]
        }else{
    
          serviceReq.map(serviceReq => {
    
            if(serviceReq != value){
                updatedserviceReqs = [...updatedserviceReqs, serviceReq]
     
            }
          })
        }

        setServiceReq(updatedserviceReqs)
    }

    const handleSubmit = async() => {

        if(fromValues.contact_mail == '') return toast.error('contact_mail is required')
        if(fromValues.contact_phone == '') return toast.error('contact_phone is required')
        if(fromValues.from_date == '') return toast.error('from_date is required')
        if(fromValues.to_date == '') return toast.error('to_date is required')
        if(fromValues.type_of_message == '') return toast.error('type_of_message is required')
        if(fromValues.type_of_rooms == '') return toast.error('type_of_rooms is required')
        if(fromValues.number_of_rooms == '') return toast.error('number_of_rooms is required')
        if(fromValues.message == '') return toast.error('message is required')
        if(serviceReq.length == 0) return toast.error('serviceReq is required')

        try {
            setIsProcessing(true)
            console.log({...fromValues, serviceReq})
            const result = await appAxios.post('/api/email/b2c', {
                ...fromValues, 
                serviceReq
            })
            toast.success("BTC email sent")
            setIsProcessing(false)
            console.log(result.data)
        } catch (error) {
            console.log(error)
            toast.error("Error sending")
            setIsProcessing(false)
        }
    }

  return (
    <div>
        <Button onClick={onOpen} ml={'16px'} aria-label='Send mail' leftIcon={<Icon as={HiOutlineMail}/>}>Send Mail</Button>
        <Box>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Contact Form</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/* <Box>
                        <Box><b>From : </b>{profile.email}</Box>
                        <Box><b>To : </b>{hotel.posta_elettronica}</Box>
                    </Box>
                    <Box my={'16px'}>
                        <hr />
                    </Box> */}
                    <FormControl>
                        <FormLabel>
                            Type of Message
                        </FormLabel>
                        <Select name='type_of_message' onChange={handleChange} placeholder='Select option'>
                        <option value='information'>Information</option>
                        <option value='reservation'>Reservation</option>
                        <option value='other'>Other</option>
                        </Select>
                    </FormControl>
                    <FormControl mt={"8px"}>
                        <FormLabel>
                            Number of rooms
                        </FormLabel>
                        <Select name='number_of_rooms' onChange={handleChange} placeholder='Select option'>
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
                        <Select name='type_of_rooms' onChange={handleChange} placeholder='Select option'>
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
                            <Checkbox onChange={handleServiceRequired} value={"Restaurant"}>Restaurant</Checkbox>
                            <Checkbox onChange={handleServiceRequired} value={"Swimminpool"}>Swimminpool</Checkbox>
                            <Checkbox onChange={handleServiceRequired} value={"Spa"}>Spa</Checkbox>
                        </Box>
                    </FormControl>
                    <Box display={'flex'} flexDirection={'column'}>
                    <FormControl mt={"8px"}>
                        <FormLabel>
                            Form
                        </FormLabel>
                        <Input name='from_date' onChange={handleChange} type='date'/>
                    </FormControl>
                    <FormControl mt={"8px"}>
                        <FormLabel>
                            To
                        </FormLabel>
                        <Input name='to_date' onChange={handleChange} type='date'/>
                    </FormControl>
                    </Box>
                    <FormControl mt={"8px"}>
                        <FormLabel>
                            Contact Mail
                        </FormLabel>
                        <Input name='contact_mail' onChange={handleChange} type='email'/>
                    </FormControl>
                    <FormControl mt={"8px"}>
                        <FormLabel>
                            Contact Phone
                        </FormLabel>
                        <Input name='contact_phone' onChange={handleChange} type='phone'/>
                    </FormControl>
                    <FormControl mt={'8px'}>
                        <FormLabel>
                            Message
                        </FormLabel>
                        <Textarea name='message' onChange={handleChange} placeholder='Here write your message' />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                <Box display={'flex'} gap={'16px'}>
                <Button onClick={onClose}>Close</Button>
                <Button isLoading={isProcessing} onClick={handleSubmit} type='submit' leftIcon={<EmailIcon />} colorScheme='teal' variant='solid'>
                    Send
                </Button>
                </Box>
                </ModalFooter>
            </ModalContent>
            </Modal>
        </Box>
    </div>
  )
}
