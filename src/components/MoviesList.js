import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.episode_id}
          title={movie.title}
          episode_id={movie.episode_id}
          opening_crawl={movie.opening_crawl}
          director={movie.director}
          producer={movie.producer}
          release_date={movie.release_date}
          charactersUrls={movie.characters}
          planetsUrls={movie.planets}
          starshipsUrls={movie.starships}
          vehiclesUrls={movie.vehicles}
          speciesUrls={movie.species}
          created={movie.created}
          edited={movie.edited}
        />
      ))}
    </ul>
  );
};

export default MovieList;
