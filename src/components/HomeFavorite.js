import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './HomeFavorite.module.css';

const HomeFavorite = (props) => {
  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  const renderFavorite = () => {
    if (!props.shows) {
      return <div>Loading...</div>;
    }

    if (props.shows && props.shows.length === 0) {
      return (
        <p>No favorite yet. Click heart button to save your favorite show :)</p>
      );
    }

    return (
      <React.Fragment>
        {props.shows?.slice(0, 3).map((show, index) => {
          return (
            <Link
              to={`/detail/${show.id}`}
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
              <p className={styles.title}>{show.original_title}</p>
              <p className={styles.date}>{calcYear(show.release_date)}</p>
            </Link>
          );
        })}
        <div className={styles.subcontainer}>
          <div className={styles.subcontent}>
            {props.shows?.slice(3, 7).map((sub, index) => {
              return (
                <Link
                  to={`/detail/${sub.id}`}
                  className={`styles[subcontent${index}]`}
                  key={index}
                >
                  <img
                    className={styles.subposter}
                    src={`https://image.tmdb.org/t/p/original${sub.poster_path}`}
                    alt={sub.original_title}
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
      <p className={styles.type}>{props.type}</p>
      <div className={styles.content}>{renderFavorite()}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    shows: state.movies.favorite,
  };
};

export default connect(mapStateToProps, {
  // fetchFavoriteMovies,
  // fetchFavoriteTVs,
})(HomeFavorite);
