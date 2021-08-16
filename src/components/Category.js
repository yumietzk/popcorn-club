import React from 'react';
import styles from './Category.module.css';

const Category = (props) => {
  return <p className={styles.category}>{props.category}</p>;
};

export default Category;
