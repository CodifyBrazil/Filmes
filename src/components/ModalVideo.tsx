import { ReactNode, useState } from 'react';
import axios from 'axios';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box,
    AspectRatio
  } from '@chakra-ui/react';

  import './style.css'

  type ModalVideoProps = {
    data: MovieItem;
    children: ReactNode;
  }

  type MovieItem = {
    title: string;
    poster_path: string;
    id: number;
}

    type movieType ={
        id: string;
        key: string;
        name: string;
        publishied_at: string;
        site: string;
        size: number;
        type: string;
    }

export const ModalVideo = ({data, children}:ModalVideoProps)=>{

    const [movie, setMovie] = useState<movieType>();

    const generatingRandonNumber = (number: number) => {
        return Math.floor(Math.random() * number);
     }


    const getMovieInfo = async () =>{
        const numberVideoRandom = generatingRandonNumber(4)

        let movieModal = await axios.get(`https://api.themoviedb.org/3/movie/${data?.id}/videos?api_key=7b69b682bb4c48c790bd83224ef7520c&language=pt-BR`);
        setMovie(movieModal.data.results[numberVideoRandom]);
        console.log(movieModal.data.results[numberVideoRandom]);
    }

    const openModal = () =>{
        onOpen();
        getMovieInfo();
        let modal = document.querySelector('.t') as any;
        modal.scroll(0, 100);
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
        <Box onClick={openModal}>
            {children}
        </Box>
        

        <Modal isOpen={isOpen} onClose={onClose} size='full' >
            <ModalOverlay />
            <ModalContent bg={'blackAlpha.900'} className='t'>
            <ModalHeader></ModalHeader>
            <ModalCloseButton bg={'white'} />
                <ModalBody>
                    <AspectRatio ratio={16 / 9} >
                        <iframe
                            title={data?.title}
                            //www.youtube.com/embed/1c_W_4cNLn0?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=pt&modestbranding=1&fs=1&autohide=1
                            //src={`https://www.youtube.com/embed/${movie?.key}?&showinfo=0`}
                            src={`https://www.youtube.com/embed/${movie?.key}?autoplay=1&modestbranding=1&fs=1&autohide=1`}
                            allowFullScreen
                        />
                    </AspectRatio>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
    )
}