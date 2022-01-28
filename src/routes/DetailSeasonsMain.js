import React from 'react';
import { truncate } from '../helpers/Truncate';
import styles from './DetailSeasonsMain.module.css';

const DetailSeasonsMain = ({ name, data, isFetching, isError }) => {
  // if (isFetching || !data) {
  //   return <div>Now loading...</div>;
  // }

  // if (isError?.status) {
  //   return <p>{isError.errorMessage}</p>;
  // }

  return (
    <div className={styles['seasons-main']}>
      <div className={styles.img}>
        <img
          src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
          alt={name}
          className={styles.poster}
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.title}>{name}</h2>
        <p className={styles.season}>{data.name}</p>
        <div className={styles.overview}>{truncate(data.overview, 1200)}</div>
      </div>
    </div>
  );
};

export default DetailSeasonsMain;
