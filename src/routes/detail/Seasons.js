import React from 'react';
import Contents from '../../components/UI/CardRow/Contents';
import styles from './Seasons.module.css';

const Seasons = ({ data }) => {
  return (
    <div className={styles.seasons}>
      <h4 className={styles.title}>Seasons</h4>
      <Contents group="tvdetail" data={data} />
    </div>
  );
};

export default Seasons;
