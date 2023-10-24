'use client'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Flex,
  useColorModeValue,
  Text,
  Container,
  Box,
  Icon,
  Input,
  IconButton,
  Checkbox,
} from '@chakra-ui/react'

import { ChevronDownIcon } from '@chakra-ui/icons'
import { MdEuroSymbol, MdKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState } from 'react';
import { appAxios } from '../../../axios';


type Props = {
  setFilterdHotels: React.Dispatch<React.SetStateAction<any>>
}

export default function Filter({setFilterdHotels}:Props) {

  const [cateroies, setCategories] = useState([])
  const [provincias, setProvincias] = useState([])

  const [selectedCateroies, setSelectedCateroies] = useState<String[]>([])
  const [selectedProvincia, setSelectedProvincia] = useState<String[]>([])

  const [priceRange, setPriceRange] = useState<any>({start:0, end: 999})


  useEffect(() => {
    const getCategories = async() => {
      try {
        const result = await appAxios.get('/api/hotels/categories')
        console.log(result.data)
        setCategories(result.data)
      } catch (error) {
        console.log(error)
      }
    }
    const getProvincias = async() => {
      try {
        const result = await appAxios.get('/api/hotels/provincias')
        console.log(result.data)
        setProvincias(result.data)
      } catch (error) {
        console.log(error)
      }
    }

    getCategories()
    getProvincias()
  }, [])


  const handleCategoriesChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {checked, value} = e.target
    console.log(value, checked)

    let updatedCategories:String[] = []

    if (checked){
      updatedCategories = [...selectedCateroies, value]
    }else{

      selectedCateroies.map(cat => {

        if(cat != value){
            updatedCategories = [...updatedCategories, cat]
 
        }
      })
    }

    setSelectedCateroies(updatedCategories)

    console.log(updatedCategories)
  }
  const handleProvinciasChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {checked, value} = e.target
    console.log(value, checked)

    let updatedProvincias:String[] = []

    if (checked){
      updatedProvincias = [...selectedProvincia, value]
    }else{

      selectedProvincia.map(provincia => {

        if(provincia != value){
            updatedProvincias = [...updatedProvincias, provincia]
 
        }
      })
    }

    setSelectedProvincia(updatedProvincias)

    console.log(updatedProvincias)
  }

  const handleChangePriceRange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
      const newRange = priceRange
      newRange[name] = value
      setPriceRange(newRange)
  }

  const searchHotels = async() => {
    console.log({
      selectedCateroies,
      selectedProvincia,
      priceRange
    })

    const result = await appAxios.post('/api/hotels/filter', {
      provincia: selectedProvincia,
      categories: selectedCateroies
    })

    setFilterdHotels(result.data)
    console.log(result)
  }

  useEffect(() => {
    searchHotels()
  }, [priceRange, selectedCateroies, selectedProvincia])
  
  

  return (
    <Flex
      minH={'100vh'}
      align={'flex-start'}
      justify={'flex-start'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Container>
        <Accordion allowMultiple width="100%" maxW="lg" rounded="lg">
          <AccordionItem >
            <AccordionButton
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={4}>
              <Text fontSize="md" fontWeight={700}>CATEGORY</Text>
              <ChevronDownIcon fontSize="24px" />
            </AccordionButton>
            <AccordionPanel pb={4}>
              {
                cateroies.map((category:any, index) => (
                  <Box textTransform={'uppercase'} my={'8px'}><Checkbox onChange={handleCategoriesChange} value={category.name}>{category.name} ({category.count})</Checkbox></Box>
                ))
              }
               {
                cateroies.length == 0 && <Box>
                  Loading...
                </Box>
              }
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={4}>
              <Text fontSize="md" fontWeight={700} textTransform={'uppercase'}>provincia</Text>
              <ChevronDownIcon fontSize="24px" />
            </AccordionButton>
            <AccordionPanel pb={4}>
              {
                provincias.map((prov:any, index) => (
                  <Box textTransform={'uppercase'} my={'8px'}><Checkbox onChange={handleProvinciasChange} value={prov.name}>{prov.name} ({prov.count})</Checkbox></Box>
                ))
              }
              {
                provincias.length == 0 && <Box>
                  Loading...
                </Box>
              }
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Box>
          <Box padding={'16px'} display={'flex'} alignItems={'center'} gap={'16px'}>
            <Icon as={MdEuroSymbol} />
            <Input onChange={handleChangePriceRange} name="start" defaultValue={0} type='number'/>
            <Text>To</Text>
            <Input onChange={handleChangePriceRange} name="end" defaultValue={999} type='number'/>
            <IconButton onClick={searchHotels} aria-label='Search database' icon={<Icon as={MdKeyboardArrowRight} />} />
          </Box>
        </Box>
      </Container>
    </Flex>
  )
}