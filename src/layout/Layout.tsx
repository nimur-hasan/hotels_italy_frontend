import React, { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import Navbar from './Navbar'
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
    profile: any,
    setProfile: React.Dispatch<React.SetStateAction<any>>,
    children: React.ReactNode
  }

export default function Layout({children, profile, setProfile}:Props) {

    const navigate = useNavigate()
    const location = useLocation()

    const checkUser = async() => {
        const token = await localStorage.getItem('token')
        const user = await localStorage.getItem('user')
        if(location.pathname == '/auth/signup') return
        if(!token || !user) navigate('/auth/signin')

        if(user){
            setProfile(JSON.parse(user))
        }
    }

    
    useEffect(() => {
        // checkUser()
    }, [location.pathname])

  return (
    <Box>
        <Box position={'fixed'} zIndex={2} width={'100%'}>
          <Navbar profile={profile} setProfile={setProfile}/>
        </Box>
        <main style={{paddingTop: '60px'}}>
            {children}
        </main>
        <Toaster
         position="bottom-center"
         />
    </Box>
  )
}
