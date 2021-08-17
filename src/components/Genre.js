import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  LazyLoadImage,
  trackWindowScroll,
} from 'react-lazy-load-image-component';
import styles from './Genre.module.css';

const Genre = (props) => {
  // LATER!!! render 15~20 results per page

  // export const getResultsPerPage = function (page = 1) {
  //   state.search.page = page;

  //   const start = (page - 1) * state.search.resultsPerPage;
  //   const end = page * state.search.resultsPerPage;

  //   return state.search.businesses.slice(start, end);
  // };

  // export const getAllPage = function () {
  //   const rest = state.search.businesses.length % state.search.resultsPerPage;

  //   if (rest === 0)
  //     state.search.allPage =
  //       state.search.businesses.length / state.search.resultsPerPage;
  //   else
  //     state.search.allPage =
  //       Math.floor(
  //         state.search.businesses.length / state.search.resultsPerPage
  //       ) + 1;
  // };

  // const renderMovie = () => {

  // };

  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  const renderShows = () => {
    if (!props.shows) {
      return <div>Loading...</div>;
    }

    return props.shows.map((show) => {
      return (
        <Link
          to={
            props.title === 'Movies'
              ? `/detail/${show.id}`
              : `/detailtv/${show.id}`
          }
          key={show.id}
          className={styles.content}
        >
          <div className={styles.img}>
            <LazyLoadImage
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
              alt={
                show.original_title ? show.original_title : show.original_name
              }
              scrollPosition={props.scrollPosition}
            />
            {/* <img
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
              alt={
                show.original_title ? show.original_title : show.original_name
              }
            /> */}
          </div>
          <div className={styles.description}>
            <p className={styles.movietitle}>
              {show.original_title ? show.original_title : show.original_name}
            </p>
            <p className={styles.date}>
              {show.release_date
                ? calcYear(show.release_date)
                : calcYear(show.first_air_date)}
            </p>
          </div>
        </Link>
      );
    });
  };

  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <span>{props.title} &gt; </span>
        <h3 className={styles.genre}>{props.type}</h3>
      </div>

      <div className={styles.container}>{renderShows()}</div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { shows: state.genre[ownProps.genre] };
};

// export default connect(mapStateToProps)(Genre);

export default connect(mapStateToProps)(trackWindowScroll(Genre));
