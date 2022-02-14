import React from 'react';
import styles from './Category.module.css';

const Category = ({ category }) => {
  return (
    <div className={styles.category}>
      <div className={styles['category-title']}>{category}</div>
      <div className={styles['category-btn']}>
        {/* 後でカルーセルに前ページ、次ページボタンを加えたい！！ */}
        {/* <button className={styles['btn-left']}>left</button>
        <button className={styles['btn-right']}>right</button> */}
      </div>
    </div>
  );
};

export default Category;
