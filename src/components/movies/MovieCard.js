import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFavoriteMovies } from '../../actions';
import tmdb from '../../apis/tmdb';
import styles from './MovieCard.module.css';

const MovieCard = (props) => {
  // const handleSearchDetail = () => {
  //   const searchDetail = async () => {
  //     const response = await tmdb.get(
  //       '/movie/550?api_key=8a45061d820fb7b5b5f574766f028ff6'
  //     );

  //     console.log(response.data);
  //   };

  //   searchDetail();
  // };

  useEffect(() => {
    props.fetchFavoriteMovies();
  }, []);

  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  const renderMovies = () => {
    // This is very importantn when you fetch data because otherwise props.movies would be undefined until data is fetched, and it creates a whole confuses...
    if (!props.movies) {
      return <div>Loading...</div>;
    }

    return props.movies?.map((movie) => {
      return (
        <Link
          to={`/detail/${movie.id}`}
          key={movie.id}
          className={`${styles.card} ${styles[props.cname]}`}
        >
          <div className={styles.img}>
            <img
              className={styles.poster}
              src={
                props.cname
                  ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                  : `https://image.tmdb.org/t/p/original${movie.poster_path}`
              }
              alt={movie.original_title}
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
  };

  return <React.Fragment>{renderMovies()}</React.Fragment>;
};

const mapStateToProps = (state, ownProps) => {
  // console.log(state.movies.favorite);
  return {
    movies: state.movies[ownProps.type],
  };
};

export default connect(mapStateToProps, {
  fetchFavoriteMovies,
})(MovieCard);
