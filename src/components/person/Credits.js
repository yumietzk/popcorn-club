import React from 'react';
import Contents from '../UI/CardUI/Contents';
import styles from './Credits.module.css';

const Credits = ({ group, data }) => {
  return (
    <div className={styles.credits}>
      <h4 className={styles.title}>
        {group === 'movies' ? 'Movies' : 'TV Shows'}
      </h4>
      <Contents group={group} data={data} />
    </div>
  );
};

export default Credits;
