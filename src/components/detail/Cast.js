import React from 'react';
import styles from './Cast.module.css';

const Cast = ({ data, isFetching, isError }) => {
  const renderCast = () => {
    if (isFetching || !data) {
      return <div>Now loading...</div>;
    }

    if (isError?.status) {
      return <p>{isError.errorMessage}</p>;
    }

    if (data && data.length === 0) {
      return <p>No cast registered.</p>;
    }

    if (data && data.length !== 0) {
      return data.map((person) => {
        return (
          <li key={person.id} className={styles.list}>
            <div className={styles.fig}>
              <img
                src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
                alt={person.original_name}
                className={styles.img}
              />
            </div>
            <p className={styles.name}>{person.original_name}</p>
          </li>
        );
      });
    }
  };

  return (
    <React.Fragment>
      <p className={styles.title}>Cast</p>
      <ul className={styles.wrap}>{renderCast()}</ul>
    </React.Fragment>
  );
};

export default Cast;
