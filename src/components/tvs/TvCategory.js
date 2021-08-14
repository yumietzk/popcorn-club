import React from 'react';
import styles from './TvCategory.module.css';

const TvCategory = (props) => {
  return <p className={styles.category}>{props.category}</p>;
};

export default TvCategory;
