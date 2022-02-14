import React from 'react';
import Category from './Category';
import Contents from './Contents';
import styles from './Row.module.css';

const Row = ({ width, category, group, data }) => {
  return (
    <div className={styles.container}>
      <Category category={category} />
      <Contents width={width} group={group} data={data} />
    </div>
  );
};

export default Row;
