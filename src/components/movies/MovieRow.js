import React, { useState, useEffect } from 'react';
import MovieCategory from './MovieCategory';
import MovieContents from './MovieContents';
import styles from './MovieRow.module.css';

const MovieRow = (props) => {
  // const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // try to fetch only english movies
  //     const response = await tmdb.get(props.url);

  //     console.log(response.data.results);
  //     setMovies(response.data.results);
  //   };

  //   fetchData();
  // }, []);

  // Make a condition: if it's a wide row, put a classname for wide container, wide contents.

  return (
    <div className={`${styles.container} ${styles[props.cname]}`}>
      <MovieCategory category={props.category} />
      <MovieContents type={props.type} cname={props.cname} />
    </div>
  );
};

export default MovieRow;
