import React from 'react';
import styles from './Category.module.css';

const Category = ({ category }) => {
  return <p className={styles.category}>{category}</p>;
};

export default Category;
