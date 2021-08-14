import React from 'react';
import styles from './MovieCategory.module.css';

const MovieCategory = (props) => {
  return <p className={styles.category}>{props.category}</p>;
};

export default MovieCategory;
