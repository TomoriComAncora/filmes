import axios from "axios";

// base url = https://api.themoviedb.org/3/
//url = https://api.themoviedb.org/3 /movie/now_playing?api_key=0d0050b740e6965ebe0a42fd3c463578&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;