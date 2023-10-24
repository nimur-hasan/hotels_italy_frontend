import React, { useState } from 'react'
import Filter from './components/Filter'
import { Box, Button, Card, Icon, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { MdEuroSymbol } from "react-icons/md";
import HotelCard from './components/HotelCard';
import SendEmail from '../../layout/SendEmail';
import PricingTable from '../../components/PricingTable';
import { appAxios } from '../../axios';

type Props = {
  profile: any
}

export default function FindHotel({profile}:Props) {

  const [filterdHotels, setFilterdHotels] = useState({results: 0, hotels: []})

  const searchHotels = async(e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value)
    try {
      const result = await appAxios.post(`/api/hotels/search`, {
        searchText: value
      })

      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

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
      <Box p={'16px'} ml={'360px'} w={'100%'}>
        <Box>
          <Input onChange={searchHotels} my={'16px'} placeholder='Search'/>
          <Card mb={'16px'} p={'16px'}>
            <Box display={'flex'} >
              <Box display={'flex'} alignItems={'center'} gap={'16px'}>
                <Box fontSize={'2xl'} >Result Found:</Box>
                <Box fontWeight={700} fontSize={'3xl'}>{filterdHotels.results}</Box>
              </Box>
              {
                !profile.email ? 
                <PricingModal/>:
                <SendEmail/>
              }
            </Box>
          </Card>
        </Box>
          {
            filterdHotels.hotels.map((hotel, index) => (
              <HotelCard profile={profile} hotel={hotel}/>
            ))
          }
        </Box>
    </Box>
  )
}

function PricingModal(){
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen} ml={'16px'}>Click Here - Send mail</Button>

      <Modal size={'full'} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pricing Plan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PricingTable/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
