import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  fetchMoviePopular,
  fetchMovieUpcoming,
  fetchTVPopular,
  fetchTVTopRated,
} from '../actions';
import Row from '../components/UI/CardUI/Row';
import LoadingIndicator from '../helpers/LoadingIndicator';
import styles from './Home.module.css';

const Home = ({
  setSelectedSidebar,
  width,
  fetchMoviePopular,
  fetchMovieUpcoming,
  fetchTVPopular,
  fetchTVTopRated,
  popularMovies,
  upcomingMovies,
  popularShows,
  topratedShows,
  isFetching,
  isFetchingTV,
  isError,
}) => {
  useEffect(() => {
    setSelectedSidebar('Home');
    fetchMoviePopular();
    fetchMovieUpcoming();
    fetchTVPopular();
    fetchTVTopRated();
  }, []);

  const renderRows = () => {
    if (
      isFetching ||
      isFetchingTV ||
      !popularMovies ||
      !upcomingMovies ||
      !popularShows ||
      !topratedShows
    ) {
      return <LoadingIndicator />;
    }

    if (isError?.status) {
      return <p className={styles.error}>{isError.errorMessage}</p>;
    }

    if (popularMovies && upcomingMovies && popularShows && topratedShows) {
      return (
        <React.Fragment>
          <Row
            width={width}
            category="Popular in Movies"
            group="movies"
            data={popularMovies}
          />
          <Row
            width={width}
            category="Upcoming in Movies"
            group="movies"
            data={upcomingMovies}
          />
          <Row
            width={width}
            category="Popular in TV Shows"
            group="tvshows"
            data={popularShows}
          />
          <Row
            width={width}
            category="Top Rated in TV Shows"
            group="tvshows"
            data={topratedShows}
          />
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      <div className={styles.title}>Home</div>
      <div
        className={`${styles.rows} ${
          isFetching || isFetchingTV ? styles.loading : null
        }`}
      >
        {renderRows()}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    popularMovies: state.movies.popular,
    upcomingMovies: state.movies.upcoming,
    popularShows: state.shows.popular,
    topratedShows: state.shows.toprated,
    isFetching: state.movies.isFetching,
    isFetchingTV: state.shows.isFetching,
    isError: state.error.isError,
  };
};

export default connect(mapStateToProps, {
  fetchMoviePopular,
  fetchMovieUpcoming,
  fetchTVPopular,
  fetchTVTopRated,
})(Home);
