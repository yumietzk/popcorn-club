import React from 'react';
import Contents from '../../components/UI/CardRow/Contents';
import styles from './Seasons.module.css';

const Seasons = ({ data, isFetching, isError }) => {
  return (
    <div className={styles.seasons}>
      <h4 className={styles.title}>Seasons</h4>
      <Contents
        group="tv detail"
        data={data}
        isFetching={isFetching}
        isError={isError}
      />
    </div>
  );
};

export default Seasons;
