import React from 'react';
import styles from './Category.module.css';

const Category = ({ category }) => {
  return (
    <div className={styles.category}>
      <div className={styles['category-title']}>{category}</div>
    </div>
  );
};

export default Category;
