import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, AspectRatio, Spinner } from '@chakra-ui/react';

export const Video = () =>{

    type movieType ={
        id: string;
        key: string;
        name: string;
        publishied_at: string;
        site: string;
        size: number;
        type: string;
    }

    useEffect(() =>{
        getMovieInfo()
    },[])

    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState<movieType>();

    const getMovieInfo = async () =>{
        window.scroll(0, 100)
        setLoading(true);
        let data = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=7b69b682bb4c48c790bd83224ef7520c&language=pt-BR`);
        console.log(data.data.results);
        setMovie(data.data.results[0]);
        setLoading(false);
    }
    return (
        <div>
            {loading&&
                <Spinner />
            }
            <AspectRatio ratio={16 / 9}>
                <iframe
                    title={movie?.name}
                    src={`https://www.youtube.com/embed/${movie?.key}?autoplay=1`}
                    allowFullScreen
                    
                />
            </AspectRatio>
        </div>
    )
}