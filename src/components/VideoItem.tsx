import { Text, Flex, Image, Spinner, Box, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { getMovieVideoInfo } from '../utils/Movie';
import './style.css';
import { ModalVideo } from './ModalVideo';

import LeftArrow from '../assets/left-arrow.png';
import RightArrow from '../assets/right-arrow.png';

type movieVideoProps = {
    typeGeners: string;
    name?: string;
}

type MovieItem = {
    title: string;
    poster_path: string;
    id: number;
}

type GenresType = {
    id: number;
    name: string;
}

export const VideoItem = ({typeGeners, name} :movieVideoProps) =>{

    useEffect(()=>{
        getMovies(typeGeners);
    },[])

    let keyMovie = '';
    const keyAPI = '7b69b682bb4c48c790bd83224ef7520c';

    const [left, setLeft] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [banners, setBanners] = useState<MovieItem[]>([]);
    const [genres, setGenres] = useState<GenresType[]>([]);
    const [genresName, setGenresName] = useState<string>('');

    const axiosInstance = axios.create({
        baseURL:'https://api.themoviedb.org/3'
    });


    const getMovies = async (tipo: string) => {
        setLoading(true);

        const type = tipo;

        switch(type){
            case 'originals':
                let data = await axiosInstance.get(`/discover/tv?api_key=${keyAPI}&language=pt-BR&page=1&with_networks=213`);
                setBanners(data.data.results);
                break;
            case 'trending':
                let data2 = await axiosInstance.get(`/trending/all/week?api_key=${keyAPI}&language=pt-BR`);
                setBanners(data2.data.results);
                break;
            case 'topreated':
                let data3 = await axiosInstance.get(`/movie/top_rated?api_key=${keyAPI}&language=pt-BR`);
                setBanners(data3.data.results);
                break;
            case 'acao':
                let data4 = await axiosInstance.get(`/discover/movie?api_key=${keyAPI}&language=pt-BR&page=1&with_genres=28`);
                setBanners(data4.data.results);
                break;
            case 'comedia':
                let data5 = await axiosInstance.get(`/discover/movie?api_key=${keyAPI}&language=pt-BR&page=1&with_genres=35`);
                setBanners(data5.data.results);
                break;
            case 'terror':
                let data6 = await axiosInstance.get(`/discover/movie?api_key=${keyAPI}&language=pt-BR&page=1&with_genres=27`);
                setBanners(data6.data.results);
                break;
            case 'romance':
                let data7 = await axiosInstance.get(`/discover/tv?api_key=${keyAPI}&language=pt-BR&page=1&with_genres=10749`);
                setBanners(data7.data.results);
                break;
            default:
                console.log('erro ... ');
        }
        setLoading(false);
    }

    const handleLeft = () => {
        // -1600
        if(left === -1500){
            setLeft(left - 100);
        }
        else{
            left > -1000?setLeft(left-1000):setLeft(left-500);
        }
    }

    const handleRight = () => {
        // 0
        if(left <= 0){
            
        }
        else{
            setLeft(left + 1000);
        }
        
    }

    return (
        <div>
            <Flex direction='column' p='3'>
                {loading&&
                <Spinner 
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'/>
                }

                <Text fontSize='2xl' as='b'>
                    {(name)?name:genresName} 
                </Text>
                
                <Button 
                onClick={handleLeft}
                className='button' 
                borderRadius='1px' 
                pos='absolute' 
                bg='blackAlpha.100' 
                mt='35px'
                _hover={{backgroundColor:'blackAlpha.900'}} 
                zIndex={'1'} w='50px' h='220px' color={'#fff'}> 
                <Image src={LeftArrow} w='50px'></Image>
                </Button>
                <Flex overflow={'hidden'} ml={left} transition='all 0.3s ease'>
                    
                    {banners.map((item, index)=>(
                    <Flex key={index}>
                        
                            <Box 
                                w='145px'
                                >
                                <ModalVideo data={item}>
                                        <Image 
                                            // onMouseOver={(e) => {getMovieVideoInfo(item.id)}}
                                            className='img' 
                                            boxSize='100%'
                                            cursor='pointer'
                                            src={`https://image.tmdb.org/t/p/original/${item.poster_path}
                                        `} alt={item.title}/>
                                   
                                    
                                </ModalVideo> 
                            </Box>
                    </Flex>
                
                ))}
                <Button 
                onClick={handleRight}
                className='button' 
                left={'95.5%'} 
                borderRadius='1px' 
                pos='absolute' 
                zIndex={'1'} 
                bg='blackAlpha.100' 
                _hover={{backgroundColor:'blackAlpha.900'}} 
                w='50px' h='220px' 
                color={'#fff'}> 
                <Image src={RightArrow} w='50px'></Image>
                </Button>

            </Flex>

            </Flex>
        </div>
    )
}