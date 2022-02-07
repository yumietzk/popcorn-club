import React from 'react';
import Category from './Category';
import Contents from './Contents';
import styles from './Row.module.css';

const Row = ({ category, group, data }) => {
  return (
    <div className={styles.container}>
      <Category category={category} />
      <Contents group={group} data={data} />
    </div>
  );
};

export default Row;
