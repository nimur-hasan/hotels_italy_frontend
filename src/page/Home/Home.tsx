import React, { useEffect } from 'react'
import { Box, Button } from '@chakra-ui/react'
import Layout from '../../layout/Layout'
import { appAxios } from '../../axios'
import toast from 'react-hot-toast'

export default function Home() {

  const getHotels = async () => {
    try {
      const response = await appAxios.get(`/api/hotels`)
      console.log(response.data)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    getHotels()
  }, [])

  return (
    <Box>
        Welcome to the Home
    </Box>
  )
}
