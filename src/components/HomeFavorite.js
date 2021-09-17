import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomeFavorite.module.css';

const HomeFavorite = ({ type, data, isFetching, isError }) => {
  const renderFavorite = () => {
    const toPage = type === 'Movies' ? 'detail' : 'detailtv';

    if (isFetching || !data) {
      return <div>Now loading...</div>;
    }

    if (isError?.status) {
      return <p>{isError.errorMessage}</p>;
    }

    if (data && data.length === 0) {
      return (
        <p className={styles.message}>
          Haven't saved to favorite yet. Click a heart button on detail page to
          save your favorites!
        </p>
      );
    }

    return (
      <React.Fragment>
        {data &&
          data.slice(0, 3).map((show, index) => {
            return (
              <Link
                to={`/${toPage}/${show.id}`}
                key={show.id}
                className={`styles[content${index}]`}
              >
                <div className={styles.img}>
                  <img
                    className={styles.poster}
                    src={`https://image.tmdb.org/t/p/original${show.poster_path}`}
                    alt={show.original_title}
                  />
                </div>
                <p className={styles.title}>
                  {show.original_title
                    ? show.original_title
                    : show.original_name}
                </p>
              </Link>
            );
          })}
        <div className={styles.subcontainer}>
          <div className={styles.subcontent}>
            {data?.slice(3, 7).map((sub, index) => {
              return (
                <Link
                  to={`/${toPage}/${sub.id}`}
                  className={`styles[subcontent${index}]`}
                  key={index}
                >
                  <img
                    className={styles.subposter}
                    src={`https://image.tmdb.org/t/p/original${sub.poster_path}`}
                    alt={
                      sub.original_title
                        ? sub.original_title
                        : sub.original_name
                    }
                  />
                </Link>
              );
            })}
          </div>
          <Link to="/favorite" className={styles.button}>
            more &rarr;
          </Link>
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className={styles.container}>
      <p className={styles.type}>{type}</p>
      <div className={styles.content}>{renderFavorite()}</div>
    </div>
  );
};

export default HomeFavorite;
