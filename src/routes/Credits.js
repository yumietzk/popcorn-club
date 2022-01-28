import React from 'react';
import Contents from '../components/UI/CardRow/Contents';
import styles from './Credits.module.css';

const Credits = ({ group, data, isFetching, isError }) => {
  return (
    <div className={styles.credits}>
      <h4 className={styles.title}>
        {group === 'movies' ? 'Movies' : 'TV Shows'}
      </h4>
      <Contents
        group={group}
        data={data}
        isFetching={isFetching}
        isError={isError}
      />
    </div>
  );
};

export default Credits;
