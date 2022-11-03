import { Box, Flex, Image, Spinner, Text, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { GiPlayButton } from "react-icons/gi";

import './style.css';



type genresType = {
    id: number;
    name: string;
}

type MovieItem = {
        name: string;
        backdrop_path: string;
        overview: string;
        vote_average: number;
        first_air_date: string;
        genres: genresType[];
        number_of_seasons?: number;
        id: number;
}



export const FeatureVideo = () => {

    useEffect(() => {
        getFeatureMovie();
    },[]);

    const moviesId = [
        {id: 18, name: 'Drama'},
        {id: 10751, name: 'Familia'},   
        {id: 35, name: 'Comedia'},
        {id: 10749, name: 'Romance'},
        {id: 99, name: 'Documentario'}
    ]


    const [loading, setLoading] = useState<boolean>(false);
    const [feature, setFeature] = useState<MovieItem>();
    const [dateRelease, setDateRelease] = useState<number>();

    const axiosInstance = axios.create({
        baseURL:'https://api.themoviedb.org/3'
    });

     const generatingRandonNumber = (number: number) => {
        return Math.floor(Math.random() * number);
     }

    const getFeatureMovie = async () =>{
         
        setLoading(true);
        let numberRandomMovie = generatingRandonNumber(19);
        let getMovie = await axiosInstance.get(`/discover/tv?api_key=7b69b682bb4c48c790bd83224ef7520c&language=pt-BR&page=1&with_networks=213`);
        let lower = getMovie.data.results[numberRandomMovie];

        let movie = await axiosInstance.get(`/tv/${lower.id}?api_key=7b69b682bb4c48c790bd83224ef7520c&language=pt-BR`);
        setFeature(movie.data);

        setLoading(false);

        let dataReleaseNow = new Date(movie.data.first_air_date);
        let dataNow = dataReleaseNow.getFullYear();
        setDateRelease(dataNow);
    }

    return (
        <div>
            {loading&&
                <Spinner 
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'/>
            }
        
            <Image
                boxSize={'100vh'}
                w='100%'
                h='100vh'
                pos='absolute'
                src={`https://image.tmdb.org/t/p/original//${feature?.backdrop_path}`} />
                <Box 
                    pos='absolute' 
                    zIndex='99' 
                    bgGradient='linear(to-t, #111 30%, transparent 70%)'
                    w='100%' 
                    h='100vh'
                    mt='0'></Box>

                    <Box
                        pos='absolute' 
                        zIndex='99' 
                        bgGradient='linear(to-r, #111 40%, transparent 60%)'
                        w='100%' 
                        h='100vh'
                        mt='0'
                        >
                            <Box
                                mt='200px'
                                ml='100px'>
                                <Text
                                    fontSize='6xl'
                                    as='b'
                                    mb='20'
                                    maxW={'400px'}
                                >{feature?.name}</Text>

                                <Flex>
                                    <Text as='b' css={{color: '#42ce9b'}}>
                                        Nota: {feature?.vote_average.toFixed(2)}
                                    </Text>
                                    <Text ml='20px' css={{color:'#ddd'}} as='b'>
                                        {dateRelease} 
                                    </Text>

                                    <Text ml='20px' css={{color:'#ddd'}} as='b'>
                                        {feature?.number_of_seasons} Temporadas
                                    </Text>
                                </Flex>
                                
                                <Box 
                                w='700px'
                                mt='30px'>
                                    <Text css={{color: '#c1c1c1'}}>
                                        {feature?.overview}
                                    </Text>
                                </Box>
                                
                                <Box>
                                    <Flex mt='20px' as='i' css={{color: '#c1c1c1'}} fontSize='sm'>
                                        <Text >Generos:</Text>
                                        {feature?.genres.map((item, index) => (
                                            <Text key={index} ml='10px'>{item?.name},</Text>
                                        ))}
                                    </Flex>
                                </Box>

                                <Box>
                                    <Flex mt='20px'>
                                        <Link to={`/video/${feature?.id}`}>
                                            <Button 
                                                as='b'
                                                bgColor='#f4f4f4'
                                                cursor='pointer'
                                                css={{width: '150px',
                                                    color: '#333',}}
                                            >Play <GiPlayButton /></Button>
                                        </Link>
                                    </Flex>
                                </Box>

                            </Box>

                            <Box>

                            </Box>
                    </Box>
            

        </div>
    )
}