import { FeatureVideo } from '../components/FeatureVideo';

import { Flex, Box } from '@chakra-ui/react'
import { VideoItem } from '../components/VideoItem';
import { Header } from '../components/Header';

export const Home = () => {
    return (
        <div>
            <Flex direction='column' bg='blackAlpha.900' h='100%' textColor='whiteAlpha.900'>
                <Header />
                <FeatureVideo />
                <Box mt='40%' zIndex={'999'}>
                    <VideoItem typeGeners='originals' name='Originais Netflix' />
                    <VideoItem typeGeners='trending' name='Os melhores'/>
                    <VideoItem typeGeners='topreated' name='Mais bem votados'/>
                    <VideoItem typeGeners='acao' name='Acao'/>
                    <VideoItem typeGeners='comedia' name='Comedia'/>
                    <VideoItem typeGeners='romance' name='Romance'/>
                </Box>
            </Flex>
        </div>
    )
}