import React from 'react';
import CastCard from './CastCard';
import styles from './Cast.module.css';

const Cast = ({ data }) => {
  // ⚠️最初のデータによく違うデータが入るからなぜか調べる！
  // console.log(data);

  const renderCast = () => {
    if (data.length === 0) {
      return <p>No cast registered.</p>;
    } else {
      return data.map((person, i) => {
        return (
          <li key={i} className={styles.card}>
            <CastCard data={person} />
          </li>
        );
      });
    }
  };

  return (
    <div className={styles.cast}>
      <h4 className={styles.title}>Cast</h4>
      <div className={styles.content}>
        <ul className={styles.cards}>{renderCast()}</ul>
      </div>
    </div>
  );
};

export default Cast;
