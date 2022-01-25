import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  fetchMoviePopular,
  fetchMovieUpcoming,
  fetchTVPopular,
  fetchTVTopRated,
} from '../actions';
import Row from '../components/UI/CardRow/Row';
import styles from './Home.module.css';

const Home = ({
  setSelectedSidebar,
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

  // useEffect(() => {
  //   popularShows.map((item) => fetchTVDetail(item.id));
  // }, [popularShows]);

  // useEffect(() => {
  //   topratedShows.map((item) => fetchTVDetail(item.id));
  // }, [topratedShows]);

  // useEffect(() => {
  //   if (isSignedIn) {
  //     fetchFavoriteMovies();
  //     fetchFavoriteTVs();
  //   }
  // }, [isSignedIn]);

  // const renderFavorite = () => {
  //   if (isSignedIn) {
  //     return (
  //       <div className={styles.contents}>
  //         <HomeFavorite
  //           type="Movies"
  //           data={moviefavorite}
  //           isFetching={isFetching}
  //           isError={isError}
  //         />
  //         <HomeFavorite
  //           type="TV Shows"
  //           data={tvfavorite}
  //           isFetching={isFetchingTV}
  //           isError={isError}
  //         />
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <p className={styles['signin-message']}>
  //         Please sign in to save your favorite movies or TV shows in favorite
  //         section!
  //       </p>
  //     );
  //   }
  // };

  return (
    <React.Fragment>
      <div className={styles.title}>Home</div>
      <div className={styles.rows}>
        <Row
          category="Popular in Movies"
          group="Movie"
          data={popularMovies}
          isFetching={isFetching}
          isError={isError}
        />
        <Row
          category="Upcoming in Movies"
          group="Movie"
          data={upcomingMovies}
          isFetching={isFetching}
          isError={isError}
        />
        <Row
          category="Popular in TV Shows"
          group="TV Show"
          data={popularShows}
          isFetching={isFetchingTV}
          isError={isError}
        />
        <Row
          category="Top Rated in TV Shows"
          group="TV Show"
          data={topratedShows}
          isFetching={isFetchingTV}
          isError={isError}
        />
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
    // isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {
  fetchMoviePopular,
  fetchMovieUpcoming,
  fetchTVPopular,
  fetchTVTopRated,
})(Home);
