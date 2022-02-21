import React from 'react';
import styles from './AltTitle.module.css';

const AltTitle = ({
  title,
  term,
  search,
  selectedLibrary,
  setSelectedLibrary,
}) => {
  const selectMovies = () => {
    setSelectedLibrary('movies');
  };

  const selectTVShows = () => {
    setSelectedLibrary('tvshows');
  };

  return (
    <div className={styles.title}>
      <div className={styles['title-left']}>
        <div className={styles['title-name']}>{title}</div>
        {search && <div className={styles.term}>Results for "{term}"</div>}
      </div>
      <div className={styles['title-right']}>
        <button
          className={`${styles['title-btn']} ${
            selectedLibrary === 'movies' && styles.selected
          }`}
          onClick={selectMovies}
        >
          Movies
        </button>
        <button
          className={`${styles['title-btn']} ${
            selectedLibrary === 'tvshows' && styles.selected
          }`}
          onClick={selectTVShows}
        >
          TV Shows
        </button>
      </div>
    </div>
  );
};

export default AltTitle;
