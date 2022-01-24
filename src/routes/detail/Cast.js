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

    // もしそのキャストの顔写真がなかったら名前のイニシャルを表示させる
    return data?.map((person) => {
      return (
        <li key={person.id} className={styles.card}>
          <div className={styles.img}>
            <img
              src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
              alt={person.original_name}
              className={styles.poster}
            />
          </div>
          <p className={styles.name}>{person.original_name}</p>
        </li>
      );
    });
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
