import React, { useState } from "react";
import { Spinner } from "./components/spinner.jsx";
import Serach from "./components/Serach.jsx";
import { useEffect } from "react";
import { MovieCard } from "./components/MovieCard.jsx";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite.js";
//import Spinner from "./components/spinner.jsx";


const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
const [searchTerm, setSearchTerm] = useState('')
const [errorMessage, setErrorMessage] = useState('');
const[movieList, setMovieList] =  useState([]);
const [trendingMovies, setTrendingMovies] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [debouncedSearchTerm, setdebouncedSearchTerm] = useState('');

// used Debounce search term to prevent making too many API requests
// it works in real life as waiting for user to stop typing for 800ms
useDebounce(
  () => {
    setdebouncedSearchTerm(searchTerm);
  },
  800,
  [searchTerm]
);



const fetchMovies = async (query = '') => {

  setIsLoading(true);
  setErrorMessage('');

  try {
const endpoint = query
  ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
  : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    
    
if (data.Response === 'False') {
  setErrorMessage(data.Error || 'Failed to fetch movies');
  setMovieList([]);
  return;
}

setMovieList(data.results || []);

if (query && data.results?.length) {
  await updateSearchCount(query, data.results[0]); 
}


} catch (error) {
  console.error(`Error fetching movies: ${error}`);
  setErrorMessage(error.message || 'Something went wrong while fetching movies');
  setMovieList([]);
} finally{
    setIsLoading(false);
  }
};

const loadTrendingMovies = async () => {
  try{

    const movies = await getTrendingMovies();

    setTrendingMovies(movies);
  } catch(error){
    console.error(`Error fetching trending movies: ${error}`);
  }
}



    useEffect( () =>{
    fetchMovies(debouncedSearchTerm);

    }, [debouncedSearchTerm]);

    useEffect( () => {
      loadTrendingMovies();
    }, []);

  return (
    <main>
      <div className="pattern" />
      
      <div className="wrapper">   
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy Without The Hassle
          </h1>

          <Serach searchTerm = {searchTerm} setSearchTerm={setSearchTerm} />
        </header>

   {trendingMovies.length > 0 && (
  <section className="trending">
    <h2>Trending Movies</h2>

    <ul>
{trendingMovies.slice(0, 10).map((movie, index) => (
  <li key={movie.$id}>
    <p>{index + 1}</p>
              <img src={movie.poster_url} alt={movie.title} />

  </li>
))}

    </ul>
  </section>
)}


          <section className="all-movies">
            <h2>All Movies</h2>
              {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}


          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </section>
        
        <h1 className="text-white">{searchTerm}</h1>
      </div>
    </main>
  );
};
export default App;
