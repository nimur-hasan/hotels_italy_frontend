'use client'

import { useEffect, useState } from 'react'

import { Center, Heading } from '@chakra-ui/react'
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react'
import { PinInput, PinInputField } from '@chakra-ui/react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { appAxios } from '../../axios'
import toast from 'react-hot-toast'

export default function VerifyEmail() {

    const [inProgress, setInProgress] = useState(false)
    let [searchParams, setSearchParams] = useSearchParams();
    const toEmail = searchParams.get('email');
    console.log(toEmail)

    const navigate = useNavigate()

    const sendEmailVerification = async() => {
        setInProgress(true)
        try {
            const response = await appAxios.post('/api/auth/sendEmailVerification', { email: toEmail})
            toast.success(response.data.message)            
        } catch (error: any) {
            if(error?.response.data.message){
                toast.error(error?.response.data.message)
            }else{
                toast.error("Something went wrong")
            }
        } 
        setInProgress(false)       
    }

    useEffect(() => {
        if(toEmail == ""){
            navigate('/auth/signin')
        }
    }, [])



    const handlePin = async(e:String) => {
        try {
            const response = await appAxios.post('/api/auth/verifyEmail', { email: toEmail, otp:e })
            toast.success(response.data.message)
            navigate('/auth/login')
        } catch (error:any) {
            if(error?.response.data.message){
                toast.error(error?.response.data.message)
            }else{
                toast.error("Something went wrong")
            }
        }
    }

  return (
    <Flex
      minH={'92vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'sm'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={10}>
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Verify your Email
          </Heading>
        </Center>
        <Center
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          We have sent code to your email
        </Center>
        <Center
          fontSize={{ base: 'sm', sm: 'md' }}
          fontWeight="bold"
          color={useColorModeValue('gray.800', 'gray.400')}>
          {toEmail}
        </Center>
        <FormControl>
          <Center>
            <HStack>
              <PinInput onComplete={handlePin}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </Center>
        </FormControl>
        <Stack spacing={6}>
          <Button
            onClick={sendEmailVerification}
            bg={'blue.400'}
            color={'white'}
            isLoading={inProgress}
            _hover={{
              bg: 'blue.500',
            }}>
            Resend
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}