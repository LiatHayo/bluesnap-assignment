import React from 'react';
import classes from './Movie.module.css';
import Relation from './Relation';

const Movie = (props) => {

  return (
    <li className={classes.movie}>
      <div className={classes.title}>
        <h2>{props.title}</h2>
        <h1>Episode: {props.episode_id}</h1>
      </div>
      <div>
        <h1>Director: {props.director}</h1>
        <h1>Producer: {props.producer}</h1>
      </div>
      <h1 className={classes.releaseDate}>release Date: {props.release_date}</h1>
      <p>{props.opening_crawl}</p>
      <Relation relationUrls={props.charactersUrls} relationTitle={"> Characters"}/>
      <Relation relationUrls={props.planetsUrls} relationTitle={"> Planets"}/>
      <Relation relationUrls={props.starshipsUrls} relationTitle={"> Starships"}/>
      <Relation relationUrls={props.vehiclesUrls} relationTitle={"> Vehicles"}/>
      <Relation relationUrls={props.speciesUrls} relationTitle={"> Species"}/>
      <h3>Created: {props.created.slice(0, 10)}</h3>
      <h3>Edited: {props.edited.slice(0, 10)}</h3>
    </li>
  );
};

export default Movie;
