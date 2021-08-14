import React from 'react';
import MovieCard from './MovieCard';
import styles from './MovieContents.module.css';

const MovieContents = (props) => {
  return (
    <div className={styles.contents}>
      {/* Can create moviecard component */}
      <ul className={styles.wrapper}>
        <MovieCard type={props.type} cname={props.cname} />
      </ul>
    </div>
  );
};

export default MovieContents;
