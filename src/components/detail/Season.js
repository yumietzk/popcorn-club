import React from 'react';
import styles from './Season.module.css';

const Season = ({ data, isFetching, isError }) => {
  const renderSeasons = () => {
    if (isFetching || !data) {
      return <div>Now loading...</div>;
    }

    if (isError?.status) {
      return <p>{isError.error}</p>;
    }

    if (data && data.length === 0) {
      return <p>No seasons.</p>;
    }

    if (data && data.length !== 0) {
      return data.seasons.map((season, i) => {
        return (
          <li className={styles.item} key={i}>
            <div className={styles.fig}>
              <img
                src={`https://image.tmdb.org/t/p/original${season.poster_path}`}
                alt={season.name}
                className={styles.img}
              />
            </div>
            <p className={styles.name}>{season.name}</p>
          </li>
        );
      });
    }
  };

  return (
    <React.Fragment>
      <p className={styles.title}>Seasons</p>
      <ul className={styles.seasons}>{renderSeasons()}</ul>
    </React.Fragment>
  );
};

export default Season;
