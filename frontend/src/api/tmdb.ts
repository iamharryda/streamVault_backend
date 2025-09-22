import axios from 'axios'

const TMDB_API_KEY = "2f6531a3d1376fd31f2ca77f9e45c724";

const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
    },
});

export const getTrendingMovies = async () => {
    const response = await tmdb.get('/trending/movie/week');
    return response.data.results;
};

export const getNowPlayingMovies = async () => {
  const response = await tmdb.get('/movie/now_playing');
  return response.data.results;
};

export const searchMovies = async (query: string) => {
    if (!query) return [];
    const response = await tmdb.get('/search/movie', {
        params: { query },
    });
    return response.data.results;
};
