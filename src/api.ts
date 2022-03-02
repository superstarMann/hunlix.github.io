import axios from "axios";

const BASE_PATH = "https://api.themoviedb.org/3";
const API_KEY = '1b66264d09f176ef5fbd889602cd9b51'

export interface IMovie {
  backdrop_path: string;
  id: number;
  overview: string;
  poster_path: string;
  title: string;
}

export interface IGetMoviesResult {
  dates: {
    maxium: string;
    minimum: string;
  }
  page: number;
  results:IMovie[];
  total_pages: number;
  total_results: number;
}

export const getMovies = async(): Promise<any> => {
  const {data} = await axios.get(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)
  return data
}