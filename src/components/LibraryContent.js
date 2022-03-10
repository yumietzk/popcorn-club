import React from 'react';
import LoadingIndicator from '../helpers/LoadingIndicator';
import CardGrid from './UI/CardUI/CardGrid';
import styles from './LibraryContent.module.css';

const LibraryContent = ({
  selectedLibrary,
  type,
  data,
  isFetching,
  isFetchingTV,
  isError,
}) => {
  const { movies, tvshows } = data;

  const renderContent = () => {
    if (selectedLibrary === 'movies') {
      if (isFetching || !movies) {
        return <LoadingIndicator />;
      }
    } else if (selectedLibrary === 'tvshows') {
      if (isFetchingTV || !tvshows) {
        return <LoadingIndicator />;
      }
    }

    if (isError?.status) {
      return <p className={styles.error}>{isError.errorMessage}</p>;
    }

    if (selectedLibrary === 'movies') {
      if (movies) {
        if (movies.length === 0) {
          if (type === 'favorite') {
            return <p className={styles['no-data']}>No favorite movies yet.</p>;
          } else {
            return <p className={styles['no-data']}>Sorry, no data.</p>;
          }
        } else {
          return <CardGrid group={type} data={movies} />;
        }
      }
    } else if (selectedLibrary === 'tvshows') {
      if (tvshows) {
        if (tvshows.length === 0) {
          if (type === 'favorite') {
            return (
              <p className={styles['no-data']}>No favorite tv shows yet.</p>
            );
          } else {
            return <p className={styles['no-data']}>Sorry, no data.</p>;
          }
        } else {
          return <CardGrid group={`${type}TV`} data={tvshows} />;
        }
      }
    }
  };

  return renderContent();
};

export default LibraryContent;
