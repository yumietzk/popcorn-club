import React from 'react';
import { truncate } from '../helpers/Truncate';
import styles from './DetailSeasonsMain.module.css';

const DetailSeasonsMain = ({ name, data }) => {
  return (
    <div className={styles['seasons-main']}>
      <div className={styles.img}>
        <img
          src={
            !data.poster_path
              ? 'https://cdn.dribbble.com/users/2549306/screenshots/14306992/media/0be875c520dcf6b4b7176738ec346334.png?compress=1&resize=1000x750&vertical=top'
              : `https://image.tmdb.org/t/p/original${data.poster_path}`
          }
          alt={name}
          className={styles.poster}
          loading="lazy"
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
