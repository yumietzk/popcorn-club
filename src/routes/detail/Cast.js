import React from 'react';
import CastCard from './CastCard';
import styles from './Cast.module.css';

const Cast = ({ data }) => {
  // ⚠️最初のデータによく違うデータが入るからなぜか調べる！
  // console.log(data);

  const renderCast = () => {
    if (data.length === 0) {
      return <p className={styles['no-casts']}>Sorry, no casts registered.</p>;
    } else {
      return (
        <ul className={styles.cards}>
          {data.map((person, i) => {
            return (
              <li key={i} className={styles.card}>
                <CastCard data={person} />
              </li>
            );
          })}
        </ul>
      );
    }
  };

  return (
    <div className={styles.cast}>
      <h4 className={styles.title}>Cast</h4>
      <div className={styles.content}>{renderCast()}</div>
    </div>
  );
};

export default Cast;
