import React, { useState } from 'react'
import Filter from './components/Filter'
import { Box, Icon, useColorModeValue } from '@chakra-ui/react'
import { MdEuroSymbol } from "react-icons/md";
import HotelCard from './components/HotelCard';

type Props = {
  profile: any
}

export default function FindHotel({profile}:Props) {

  const [filterdHotels, setFilterdHotels] = useState([])

  return (
    <Box display={"flex"}>
      <Box 
        height={'100vh'}
        width={"360px"} 
        position={'fixed'}
        borderRight={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
      >
        <Filter setFilterdHotels={setFilterdHotels}/>
      </Box>
      <Box p={'16px'} ml={'360px'}>
        {
          filterdHotels.map((hotel, index) => (
            <HotelCard profile={profile} hotel={hotel}/>
          ))
        }
      </Box>
    </Box>
  )
}
