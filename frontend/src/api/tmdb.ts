import axios from 'axios';

const tmdbApiKey = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const baseURL = process.env.EXPO_PUBLIC_BASE_URL || 'https://api.themoviedb.org/3';

const tmdb = axios.create({
    baseURL: baseURL,
    params: {
        api_key: tmdbApiKey,
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

export const searchTVShows = async (query: string) => {
    if (!query) return [];
    const response = await tmdb.get('/search/tv', {
        params: { query },
    });
    return response.data.results;
};

export const getMovieDetails = async (id: number) => {
    const response = await tmdb.get(`movie/${id}`, {
        params: { append_to_response: 'credits,videos,reviews' },
    });
    return response.data;
};

export const getTVShowDetails = async (id: number) => {
    const response = await tmdb.get(`tv/${id}`, {
        params: { append_to_response: 'credits,videos,reviews' },
    });
    return response.data;
};

export const getPopularMovies = async () => {
    const response = await tmdb.get('/movie/popular');
    return response.data.results;
};
