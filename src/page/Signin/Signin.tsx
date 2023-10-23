import { useEffect, useState } from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { appAxios } from '../../axios'
import toast from 'react-hot-toast'

type Props = {
  setProfile: React.Dispatch<React.SetStateAction<any>>
}

export default function Signin({setProfile}:Props) {
    const [formData, setFormData] = useState<any>({})
    const [inProgress, setInProgress] = useState(false)

    const navigate = useNavigate()
  
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const newFormData = formData
      newFormData[name] = value
      setFormData(newFormData)
      
    }

    const handleSignin = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setInProgress(true)
        try {
            const response = await appAxios.post('/api/auth/signin', formData)
            console.log(response.data)
            localStorage.setItem('user', JSON.stringify(response.data.info))
            localStorage.setItem('token', response.data.sessionToken)
            if(response?.data.authentication.isVerified) {
                setProfile(response.data.info)
                navigate('/')
            }else{
                navigate(`/auth/verify-email?email=${response?.data.info.email}`)
            }
        } catch (error:any) {
            if(error?.response?.data?.message){
                toast.error(error?.response?.data?.message)
            }else{
                toast.error("Something went wrong")
            }
            console.log(error)
        }
        setInProgress(false)
    }

  return (
    <form onSubmit={handleSignin}>
    <Flex
      minH={'92vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text display={'flex'} gap={"6px"} fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input onChange={handleChange} name='email' type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input onChange={handleChange} name='password' type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
                type='submit'                
                bg={'blue.400'}
                color={'white'}
                isLoading={inProgress}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
    </form>
  )
}