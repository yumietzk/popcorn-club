import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import styles from './Card.module.css';

const Card = (props) => {
  const [loaded, setLoaded] = useState(false);
  // useEffect(() => {
  //   props.fetchMovieNowPlaying();
  //   props.fetchTvOnAir();
  // }, []);

  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  const onLoad = () => {
    setLoaded(true);
  };

  const renderItems = () => {
    if (props.group === 'Movie') {
      if (!props.movies) {
        return (
          <ReactLoading type="spin" color="f7f7f7" height="20%" width="20%" />
        );
      }

      return props.movies.map((movie) => {
        return (
          <Link
            to={`/detail/${movie.id}`}
            key={movie.id}
            className={`${styles.card} ${styles[props.cname]}`}
          >
            <div className={styles.img}>
              <img
                className={`${styles.poster} ${
                  loaded && styles['poster-open']
                }`}
                src={
                  props.cname
                    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                    : `https://image.tmdb.org/t/p/original${movie.poster_path}`
                }
                alt={movie.original_title}
                onLoad={onLoad}
              />
            </div>
            {props.cname ? (
              ''
            ) : (
              <p className={styles.title}>{movie.original_title}</p>
            )}
            {props.cname ? (
              ''
            ) : (
              <p className={styles.date}>{calcYear(movie.release_date)}</p>
            )}
          </Link>
        );
      });
    }

    if (props.group === 'TV Show') {
      if (!props.shows) {
        return (
          <ReactLoading type="spin" color="f7f7f7" height="10" width="10" />
        );
      }

      return props.shows.map((show) => {
        return (
          <Link
            to={`/detailtv/${show.id}`}
            key={show.id}
            className={`${styles.card} ${styles[props.cname]}`}
          >
            <div className={styles.img}>
              <img
                className={`${styles.poster} ${
                  loaded && styles['poster-open']
                }`}
                src={
                  props.cname
                    ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
                    : `https://image.tmdb.org/t/p/original${show.poster_path}`
                }
                alt={show.original_name}
                onLoad={onLoad}
              />
            </div>
            {props.cname ? (
              ''
            ) : (
              <p className={styles.title}>{show.original_name}</p>
            )}
            {props.cname ? (
              ''
            ) : (
              <p className={styles.date}>{calcYear(show.first_air_date)}</p>
            )}
          </Link>
        );
      });
    }
  };

  return <React.Fragment>{renderItems()}</React.Fragment>;
};

const mapStateToProps = (state, ownProps) => {
  return {
    movies: state.movies[ownProps.type],
    shows: state.shows[ownProps.type],
  };
};

export default connect(mapStateToProps, {
  // fetchMovieNowPlaying,
  // fetchTvOnAir,
  // fetchMovieUpcoming,
  // fetchMovieTopRated,
})(Card);
