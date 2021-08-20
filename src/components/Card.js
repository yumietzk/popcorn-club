import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import { ActivityIndicator } from 'antd-mobile';
import styles from './Card.module.css';

const Card = ({ group, cname, data, isFetching, isError }) => {
  const [loaded, setLoaded] = useState(false);

  // const { status, error } = isError;

  useEffect(() => {
    setLoaded(false);
  }, []);

  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  const onLoad = () => {
    setLoaded(true);
  };

  const renderItems = () => {
    // if (!data) {
    //   return (
    //     <div className={styles.loading}>
    //       <ActivityIndicator size="large" />
    //     </div>
    //   );
    // }

    if (isFetching || !data) {
      return <div>Now loading...</div>;
    }

    if (isError?.status) {
      return <p>{isError.error}</p>;
    }

    return data.map((show) => {
      return (
        <Link
          to={group === 'Movie' ? `/detail/${show.id}` : `/detailtv/${show.id}`}
          key={show.id}
          className={`${styles.card} ${styles[cname]}`}
        >
          <div className={styles.img}>
            <img
              className={`${styles.poster} ${loaded && styles['poster-open']}`}
              src={
                cname
                  ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
                  : `https://image.tmdb.org/t/p/original${show.poster_path}`
              }
              alt={
                show.original_title ? show.original_title : show.original_name
              }
              onLoad={onLoad}
            />
          </div>
          {cname ? (
            ''
          ) : (
            <p className={styles.title}>
              {show.original_title ? show.original_title : show.original_name}
            </p>
          )}
          {cname ? (
            ''
          ) : (
            <p className={styles.date}>
              {calcYear(
                show.release_date ? show.release_date : show.first_air_date
              )}
            </p>
          )}
        </Link>
      );
    });
  };

  return <React.Fragment>{renderItems()}</React.Fragment>;
};

export default Card;
