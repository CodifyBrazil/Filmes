import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'https://api.themoviedb.org/3'
})
const key = '7b69b682bb4c48c790bd83224ef7520c';

export const getMovieVideoInfo = async (id: string) => {
    try{
        let movie = {};
        const data = await axiosInstance.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=7b69b682bb4c48c790bd83224ef7520c&language=pt-BR`);
        const result = await data.data.results[0];
        movie = {
            key: result.key
        }
        return movie;
    }
    catch(e){
        return `Erro: ${e}`;
    }
    

    
}