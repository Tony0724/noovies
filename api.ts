const API_KEY = '8001745014d67322d3711a9e484dbd40';
const BASE_URL = "https://api.themoviedb.org/3";

const Trending = () => fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then(res => res.json());

const UpComing = () => fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`).then(res => res.json());

const nowPlaying = () => fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`).then(res => res.json());

export const moviesApi = { Trending, UpComing, nowPlaying };