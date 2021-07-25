import React, { useState, useEffect, useCallback } from "react";

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [originalMoviesList, setOriginalMoviesList] = useState(movies);
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [selectedFilterOption, setSelectedFilterOption] = useState("");

  const sortOptions = [
    "Movie name",
    "Episode",
  ];

  const filters = {
    titles: [],
    directors: []
  };

  const [filterOptions, setFilterOptions] = useState(filters);
  const updateFilters = (movies) => {
    filters.titles = movies.map(movie => movie.title);
    filters.directors = [...new Set(movies.map(movie => movie.director))];
    setFilterOptions(filters);
  }
  
  const fetchMoviesHandler = useCallback(async () => {
    setSelectedSortOption("");
    setSelectedFilterOption("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if(!response.ok) {
        throw new Error('Something went wrong!');
      } 

      const data = await response.json();
      
      setOriginalMoviesList(data.results);
      setMovies(data.results);
      updateFilters(data.results);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);


  let content = <p>Found no movies.</p>

  if(movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if(error) {
    content = <p>{error}</p>;
  }

  if(isLoading) {
    content = <p>Loading...</p>;
  }

  
  const sortMovies = (ev) => {
    setSelectedSortOption(ev);
    if(ev === "Episode") movies.sort((a,b) => a.episode_id - b.episode_id);
    if(ev === "Movie name") {
      movies.sort((a,b) => {
        let nameA = a.title.toUpperCase(); // ignore upper and lowercase
        let nameB = b.title.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    }
  }

  const filterMovies = (ev) => {
    setSelectedFilterOption(ev);
    setMovies(originalMoviesList.filter((movie) => movie.director === ev));
  }


  return (
      <div>
        <section>
          <button onClick={fetchMoviesHandler}>Clear filters</button>
          <select value={selectedFilterOption} onChange={(e) => filterMovies(e.target.value)}>
            <optgroup label="Directores">
              <option value="" disabled hidden>Filter By</option>
              {filterOptions.directors.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </optgroup>
          </select>
          <select
            value={selectedSortOption}
            onChange={(e) => sortMovies(e.target.value)}>
            <option value="" disabled hidden>Sort By</option>
            {sortOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </section>
        <section>{content}</section>
      </div>
  );
}

export default App;
