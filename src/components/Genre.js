import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';
import {
  LazyLoadImage,
  trackWindowScroll,
} from 'react-lazy-load-image-component';
import styles from './Genre.module.css';

const Genre = (props) => {
  // const getResultsPerPage = (page = 1) => {
  //   state.search.page = page;

  //   const start = (page - 1) * 20;
  //   const end = page * 20;

  //   return state.search.businesses.slice(start, end);
  // };

  // const getAllPage = () => {
  //   const rest = props.shows.length % 20;

  //   if (rest === 0) allPage = props.shows.length / 20;
  //   else allPage = Math.floor(props.shows.length / 20) + 1;
  // };

  // const renderMovie = () => {

  // };

  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  const renderShows = () => {
    if (!props.shows) {
      return (
        <ReactLoading type="spin" color="f7f7f7" height="20%" width="20%" />
      );
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

// to="/action/page=2"

const mapStateToProps = (state, ownProps) => {
  return { shows: state.genre[ownProps.genre] };
};

// export default connect(mapStateToProps)(Genre);

export default connect(mapStateToProps)(trackWindowScroll(Genre));
