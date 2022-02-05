import React from 'react';
import { Link } from 'react-router-dom';
import LoadingIndicator from '../../helpers/LoadingIndicator';
import styles from './Cast.module.css';

const Cast = ({ data, isFetching, isError }) => {
  // ⚠️最初のデータによく違うデータが入るからなぜか調べる！
  // console.log(data);

  const renderCast = () => {
    if (isFetching || !data) {
      return <LoadingIndicator />;
    }

    if (isError?.status) {
      return <p>{isError.errorMessage}</p>;
    }

    if (data) {
      if (data.length === 0) {
        return <p>No cast registered.</p>;
      } else {
        return data.map((person) => {
          return (
            <li key={person.id} className={styles.card}>
              <div className={styles.img}>
                <img
                  src={
                    !person.profile_path
                      ? 'https://cdn.dribbble.com/users/1090020/screenshots/15509551/media/fe29a709b7a89315c1673d143c23c2c1.png?compress=1&resize=1200x900&vertical=top'
                      : `https://image.tmdb.org/t/p/original${person.profile_path}`
                  }
                  alt={person.original_name}
                  className={styles.poster}
                  loading="lazy"
                />
                <Link
                  to={`../../person/${person.id}`}
                  className={styles.cover}
                ></Link>
              </div>
              <div className={styles.name}>
                <Link
                  to={`../../person/${person.id}`}
                  className={styles['name-text']}
                >
                  {person.original_name}
                </Link>
              </div>
            </li>
          );
        });
      }
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
