import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './HomeFavorite.module.css';

const HomeFavorite = (props) => {
  const calcYear = (date) => {
    const year = date?.split('-')[0];
    return year;
  };

  return (
    <div className={styles.content}>
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
      <div className={styles.subcontent}>
        <div className={styles.subcontent1}>movie4</div>
        <div className={styles.subcontent2}>movie5</div>
        <div className={styles.subcontent3}>movie6</div>
        <div className={styles.subcontent4}>movie7</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    shows: state.movies.favorite,
  };
};

export default connect(mapStateToProps)(HomeFavorite);
