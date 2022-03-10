import React from 'react';
import Contents from '../UI/CardUI/Contents';
import styles from './Seasons.module.css';

const Seasons = ({ data, width }) => {
  return (
    <div className={styles.seasons}>
      <h4 className={styles.title}>Seasons</h4>
      <Contents group="tvdetail" data={data} />
    </div>
  );
};

export default Seasons;
