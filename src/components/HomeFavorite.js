import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './HomeFavorite.module.css';

const HomeFavorite = (props) => {
  const renderFavorite = () => {
    // if (!props.shows || !props.tvshows) {
    //   return <div>Loading...</div>;
    // }

    const shows = props.type === 'Movies' ? props.shows : props.tvshows;
    const toPage = props.type === 'Movies' ? 'detail' : 'detailtv';

    if (!shows) {
      return <div>Loading...</div>;
    }

    if (shows && shows.length === 0) {
      return (
        <p>No favorite yet. Click heart button to save your favorite show :)</p>
      );
    }

    return (
      <React.Fragment>
        {shows.slice(0, 3).map((show, index) => {
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
              <p className={styles.title}>{show.original_title}</p>
              {/* <p className={styles.date}>{calcYear(show.release_date)}</p> */}
            </Link>
          );
        })}
        <div className={styles.subcontainer}>
          <div className={styles.subcontent}>
            {shows?.slice(3, 7).map((sub, index) => {
              return (
                <Link
                  to={`/${toPage}/${sub.id}`}
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
    tvshows: state.shows.favorite,
  };
};

export default connect(mapStateToProps)(HomeFavorite);
