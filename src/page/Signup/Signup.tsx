'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { appAxios } from '../../axios'
import toast, { Toaster } from 'react-hot-toast';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<any>({})
  const [inProgress, setInProgress] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFormData = formData
    newFormData[name] = value
    setFormData(newFormData)
    
  }

const sendEmailVerification = async(email:String) => {
    const response = await appAxios.post('/api/auth/sendEmailVerification', { email })
}

  const handleSignup = async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setInProgress(true)
    console.log({formData})

    try {
        const response = await appAxios.post('/api/auth/signup',formData)
        await sendEmailVerification(formData.email)
        if(!response.data.isVerified) navigate(`/auth/verify-email?email=${formData.email}`)
    } catch (error:any) {
        console.log(error)
        if(error?.response?.data.message) {
            console.log(error?.response?.data.message)
            toast.error(error?.response?.data.message)
        }
    }

    setInProgress(false)

  }

  return (
    <form onSubmit={handleSignup}>
    <Flex
      minH={'92vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input onChange={handleChange} type="text" name="fname"/>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input onChange={handleChange} type="text" name='lname'/>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input onChange={handleChange} type="email" name='email'/>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input onChange={handleChange} type={showPassword ? 'text' : 'password'} name='password' />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                type='submit'
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                isLoading={inProgress}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link onClick={() => navigate("/auth/signin")} color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </form>
  )
}